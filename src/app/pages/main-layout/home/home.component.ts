import { Component } from '@angular/core';
import { HomeProductComponent } from "./home-product/home-product.component";
import { FirstBannerComponent } from "./first-banner/first-banner.component";
import { SecondBannerComponent } from "./second-banner/second-banner.component";
import { FeaturesComponent } from "../../../core/components/features/features.component";
import { ShopByCategoryComponent } from "../../../core/components/shop-by-category/shop-by-category.component";


@Component({
  selector: 'app-home',
  imports: [HomeProductComponent, FirstBannerComponent, SecondBannerComponent, FeaturesComponent, ShopByCategoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

