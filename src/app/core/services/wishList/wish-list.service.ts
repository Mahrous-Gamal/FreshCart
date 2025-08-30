import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WEBSITE_BASE_URL } from '../../constance/WEBSITE_BASE_URL';
import { Observable } from 'rxjs';
import { IWishList } from '../../interfaces/wishList/IWishList';
import { IAddToList } from '../../interfaces/wishList/IAddToList';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  numOfWishItems: number = 0;
  constructor(private _httpClient: HttpClient) {}

  // ^CRUD Operations
  //! Create
  addToWishList(id: string):Observable<IAddToList> {
    return this._httpClient.post<IAddToList>(`${WEBSITE_BASE_URL}/api/v1/wishlist`, {
      productId: id,
    });
  }

  //! Retrieve
  getWishList():Observable<IWishList> {
    return this._httpClient.get<IWishList>(`${WEBSITE_BASE_URL}/api/v1/wishlist`);
  }


  //! Delete
  //* Product
  removeFromWishList(id: string){
    return this._httpClient.delete(`${WEBSITE_BASE_URL}/api/v1/wishlist/${id}`);
  }

  // ^CRUD Operations
}
