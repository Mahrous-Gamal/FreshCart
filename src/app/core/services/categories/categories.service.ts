import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICategories } from '../../interfaces/categories/ICategories';
import { WEBSITE_BASE_URL } from '../../constance/WEBSITE_BASE_URL';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _httpClient:HttpClient) { }

  getAllCategories():Observable<ICategories>{
    return this._httpClient.get<ICategories>(`${WEBSITE_BASE_URL}/api/v1/categories`)
  }
}
