import { Component, inject, OnInit } from '@angular/core';
import { ICategories } from '../../../core/interfaces/categories/ICategories';
import { CategoriesService } from '../../../core/services/categories/categories.service';

@Component({
  selector: 'app-shop-by-category',
  imports: [],
  templateUrl: './shop-by-category.component.html',
  styleUrl: './shop-by-category.component.scss',
})
export class ShopByCategoryComponent {

    _categoriesService=inject(CategoriesService);
    categories!:ICategories

    ngOnInit():void{
      this.allCategories()

    }

    allCategories():void{
      this._categoriesService.getAllCategories().subscribe({
        next:(res)=>{
          console.log(res);
          this.categories=res;
        }
      })

    }
}
