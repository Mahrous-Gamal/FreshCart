import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WEBSITE_BASE_URL } from '../../constance/WEBSITE_BASE_URL';
import { Observable } from 'rxjs';
import { IBrands } from '../../interfaces/brands/IBrands';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

    constructor(private _httpClient:HttpClient) { }
  
    getAllBrands():Observable<IBrands>{
      return this._httpClient.get<IBrands>(`${WEBSITE_BASE_URL}/api/v1/brands`)
    }
}
