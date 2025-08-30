import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IWishList } from '../../../core/interfaces/wishList/IWishList';
import { WishListService } from '../../../core/services/wishList/wish-list.service';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-wish-list',
  imports: [CurrencyPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss',
})
export class WishListComponent {
  _wishListService: WishListService = inject(WishListService);
  _cartService: CartService = inject(CartService);
  _toastrService = inject(ToastrService);

  allWishListProducts!: IWishList;

  ngOnInit(): void {
    this.getWishList();
  }

  // ! get products
  getWishList(): void {
    this._wishListService.getWishList().subscribe({
      next: (res) => {
        console.log(res);
        this.allWishListProducts = res;
        this._wishListService.numOfWishItems = res.count;
      },
    });
  }

  // ! delete product
  removeFromWishList(id: string): void {
    this._wishListService.removeFromWishList(id).subscribe({
      next: (res) => {
        console.log(res);
        // this._toastrService.success(res, '');
        this.getWishList();
      },
    });
  }

  //! Add TO Cart
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
}
