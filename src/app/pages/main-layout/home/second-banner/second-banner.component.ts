import { Component, inject, OnInit } from '@angular/core';
import { ICategories } from '../../../../core/interfaces/categories/ICategories';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-second-banner',
  imports: [CarouselModule,],
  templateUrl: './second-banner.component.html',
  styleUrl: './second-banner.component.scss'
})
export class SecondBannerComponent implements OnInit{
    categoriesService=inject(CategoriesService);
    categories!:ICategories
  
    ngOnInit():void{
      this.allCategories()
  
    }
  
    allCategories():void{
      this.categoriesService.getAllCategories().subscribe({
        next:(res)=>{
          // console.log(res);
          this.categories=res;
        }
      })
  
    }
    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      autoplay:true,
      autoplaySpeed:900,
      autoplayTimeout:1000,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 8
        }
      },
      nav: true
    }

}
