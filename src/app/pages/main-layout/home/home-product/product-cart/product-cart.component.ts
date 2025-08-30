import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../../../../core/interfaces/products/IProducts';
import { CartService } from '../../../../../core/services/cart/cart.service';
import { ProuductsService } from '../../../../../core/services/Products/prouducts.service';
import { WishListService } from '../../../../../core/services/wishList/wish-list.service';

@Component({
  selector: 'app-product-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.scss',
})
export class ProductCartComponent implements OnInit {

 private readonly pLATFORM_ID = inject(PLATFORM_ID)
  @Input() product!: IProduct;

 @Input() allWishListId!: Array<string>;

  id = localStorage.getItem('userId')!;
  _cartService: CartService = inject(CartService);
  _wishListService: WishListService = inject(WishListService);
  _prouductsService: ProuductsService = inject(ProuductsService);

  _toastrService = inject(ToastrService);

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      
      console.log(this.allWishListId)
    }
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

  // // ! get wish list products
  // getWishList(id: string): void {
  //   this._prouductsService.getWishListProducts(id).subscribe({
  //     next: (res) => {
  //       console.log(res.data.wishlist);
  //       this.allWishListId = res.data.wishlist;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  // getWishList(): void {
  //   this._wishListService.getWishList().subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.allwishList = res;
  //     },
  //   });
  // }
}
