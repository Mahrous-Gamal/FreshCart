import { Component } from '@angular/core';
import { HomeProductComponent } from "./home-product/home-product.component";
import { FirstBannerComponent } from "./first-banner/first-banner.component";
import { SecondBannerComponent } from "./second-banner/second-banner.component";


@Component({
  selector: 'app-home',
  imports: [HomeProductComponent, FirstBannerComponent, SecondBannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

// stringTrim(desc:string):string{
//  return desc.split(" ").splice(0,2).join(" ")
// }

