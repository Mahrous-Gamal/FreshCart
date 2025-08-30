import { Component, inject } from '@angular/core';
import { IProducts } from '../../../core/interfaces/products/IProducts';
import { ProuductsService } from '../../../core/services/Products/prouducts.service';
import { FormsModule } from '@angular/forms';
import { SearchProductsPipe } from '../../../shared/pipes/search-products.pipe';
import { ProductCartComponent } from '../home/home-product/product-cart/product-cart.component';

@Component({
  selector: 'app-products',
  imports: [ProductCartComponent, SearchProductsPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  allProducts!: IProducts;
  searchValue: string = '';

  prouductsService = inject(ProuductsService);
  allWishListId!: Array<string>;

 id = localStorage.getItem('userId')!;

  ngOnInit(): void {
    this.getProducts();
    this.getWishList(this.id)
  }

  getProducts(): void {
    this.prouductsService.getAllProducts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allProducts = res;
      },
    });
  }


  getWishList(id: string): void {
    this.prouductsService.getWishListProducts(id).subscribe({
      next: (res) => {
        console.log(res.data.wishlist);
        this.allWishListId = res.data.wishlist;
      },
      error: (err) => {
        console.log(err);
      },
    });
}
}
