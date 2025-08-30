import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-first-banner',
  imports: [CarouselModule],
  templateUrl: './first-banner.component.html',
  styleUrl: './first-banner.component.scss',
})
export class FirstBannerComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 1000,
    navText: ['', ''],
    items: 1,
    nav: true,
  };
}
