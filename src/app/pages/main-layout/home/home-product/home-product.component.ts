import { IProducts } from '../../../../core/interfaces/products/IProducts';


import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProuductsService } from '../../../../core/services/Products/prouducts.service';
import { SearchProductsPipe } from '../../../../shared/pipes/search-products.pipe';
import { ProductCartComponent } from "./product-cart/product-cart.component";
import { WishListService } from '../../../../core/services/wishList/wish-list.service';

@Component({
  selector: 'app-home-product',
  imports:[ ProductCartComponent,SearchProductsPipe,FormsModule],
  templateUrl: './home-product.component.html',
  styleUrl: './home-product.component.scss'
})
export class HomeProductComponent implements OnInit{
  allProducts!:IProducts;
  searchValue:string="";
  allWishListId!: Array<string>;
  
 _prouductsService=inject(ProuductsService)
 _wishListService=inject(WishListService)
 id = localStorage.getItem('userId')!;

 ngOnInit(): void {
     this.getProducts()
     this.getWishList(this.id)
 }

getProducts():void {
  this._prouductsService.getAllProducts().subscribe({
    next:(res:any)=>{
      // console.log(res);
      this.allProducts=res;
    }
  })
}
  // ! get wish list products
  getWishList(id: string): void {
    this._prouductsService.getWishListProducts(id).subscribe({
      next: (res) => {
        console.log(res.data.wishlist);
        this.allWishListId = res.data.wishlist;
        this._wishListService.numOfWishItems = res.data.wishlist.length
        this._wishListService.getWishList()
      },
      error: (err) => {
        console.log(err);
      },
    });

}
}
