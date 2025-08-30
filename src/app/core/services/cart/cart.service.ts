import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WEBSITE_BASE_URL } from '../../constance/WEBSITE_BASE_URL';
import { ICartProducts } from '../../interfaces/cart/ICartProducts';
import { ICartUpdate } from '../../interfaces/cart/ICartUpdate';
import { ICart } from './../../interfaces/cart/ICart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  numOfCartItems: number = 0;
  constructor(private _httpClient: HttpClient) {}

  // ^CRUD Operations
  //! Create
  addToCart(id: string) {
    return this._httpClient.post<ICart>(`${WEBSITE_BASE_URL}/api/v1/cart`, {
      productId: id,
    });
  }

  //! Retrieve
  getCart() {
    return this._httpClient.get<ICartProducts>(
      `${WEBSITE_BASE_URL}/api/v1/cart`,
      {}
    );
  }

  //! Update
  updateCart(id: string, count: number) {
    return this._httpClient.put<ICartUpdate>(
      `${WEBSITE_BASE_URL}/api/v1/cart/${id}`,
      {
        count: count,
      }
    );
  }

  //! Delete
  //* Product
  removeFromCart(id: string): Observable<any> {
    return this._httpClient.delete(`${WEBSITE_BASE_URL}/api/v1/cart/${id}`, {});
  }

  //* Cart
  clearCart(id: string): Observable<any> {
    return this._httpClient.delete(`${WEBSITE_BASE_URL}/api/v1/cart`, {});
  }

  // ^CRUD Operations
}
