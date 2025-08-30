import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IProductDet } from '../../../core/interfaces/product-det/IProductDet';
import { ProuductsService } from '../../../core/services/Products/prouducts.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { WishListService } from '../../../core/services/wishList/wish-list.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  activeRoute = inject(ActivatedRoute);

  _prouductsService = inject(ProuductsService);
  _cartService: CartService = inject(CartService);
  _wishListService: WishListService = inject(WishListService);
  _toastrService = inject(ToastrService);

  title = inject(Title);
  meta = inject(Meta);

  productHere!: IProductDet;
  allWishListId!: Array<string>
  id = localStorage.getItem('userId')!;

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe({
      next: (res) => {
        console.log(res);
        let id = res.get('id') as string;
        this.currentProduct(id);
        console.log(id);
      },
    });
    this.getWishList(this.id)
  }

  currentProduct(id: string): void {
    console.log(id);
    this._prouductsService.getProductDet(id).subscribe({
      next: (res) => {
        console.log(res);
        console.log(id);
        this.productHere = res;
        this.title.setTitle(this.productHere.data.title);
        this.meta.addTag({
          name: 'description',
          content: res.data.description,
        });
      },
    });
  }

  // *add to cart
  addToCart(id: string) {
    this._cartService.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        console.log(id);
        this._cartService.numOfCartItems = res.numOfCartItems;
        this._toastrService.success(res.message, '');
      },
    });
  }
  

    // *add to wishlist
    addToWishList(id: string) {
      if (this.allWishListId.includes(id)) {
        this._wishListService.removeFromWishList(id).subscribe({
          next: (res : any) => {
            console.log(res);
            this._wishListService.numOfWishItems = res.data.length;
            this.allWishListId = res.data
          },
        });
      } else {
        this._wishListService.addToWishList(id).subscribe({
          next: (res) => {
            console.log(res);
            console.log(id);
            this.allWishListId = res.data
            this._wishListService.numOfWishItems = res.data.length;
            this._toastrService.success(res.message, '');
          },
        });
      }
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
