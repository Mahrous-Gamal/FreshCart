import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICartProducts } from '../../../core/interfaces/cart/ICartProducts';
import { CartService } from '../../../core/services/cart/cart.service';
import { ProuductsService } from '../../../core/services/Products/prouducts.service';
import { WishListService } from '../../../core/services/wishList/wish-list.service';
// import { ICartUpdate } from '../../../core/interfaces/cart/ICartUpdate';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  _cartService: CartService = inject(CartService);
  _toastrService = inject(ToastrService);
  _prouductsService = inject(ProuductsService);

  _wishListService: WishListService = inject(WishListService);

  allCartProducts!: ICartProducts;
  allWishListId!: Array<string>;
  id = localStorage.getItem('userId')!;

  ngOnInit(): void {
    this.getCart();
    this.getWishList(this.id);
  }

  // ! products in cart

  getCart(): void {
    this._cartService.getCart().subscribe({
      next: (res) => {
        console.log(res);
        this.allCartProducts = res;
        this._cartService.numOfCartItems = res.numOfCartItems;
      },
    });
  }
  // ! clear all products in cart button
  clearCart(): void {
    this._cartService.clearCart(this.allCartProducts.data._id).subscribe({
      next: (res) => {
        console.log(res);
        this._toastrService.success(res.message, '');
        this.getCart();
      },
    });
  }

  // ! remove product in cart button

  removeFromCart(id: string): void {
    this._cartService.removeFromCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._toastrService.success(res.status, '');
        this.getCart();
      },
    });
  }

  // ! update product in cart button
  updateCart(id: string, count: number): void {
    this._cartService.updateCart(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.allCartProducts = res as ICartProducts;
        this._toastrService.success(res.status, '');
        this.getCart();
      },
    });
  }

  // *add to wishlist
  addToWishList(id: string) {
    if (this.allWishListId.includes(id)) {
      this._wishListService.removeFromWishList(id).subscribe({
        next: (res: any) => {
          console.log(res);
          this._wishListService.numOfWishItems = res.data.length;
          this.allWishListId = res.data;
        },
      });
    } else {
      this._wishListService.addToWishList(id).subscribe({
        next: (res) => {
          console.log(res);
          console.log(id);
          this.allWishListId = res.data;
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
        this._wishListService.numOfWishItems = res.data.wishlist.length;
        this._wishListService.getWishList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
