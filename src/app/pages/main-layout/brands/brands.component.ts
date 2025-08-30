import { Component, inject } from '@angular/core';
import { IBrands } from '../../../core/interfaces/brands/IBrands';
import { BrandsService } from '../../../core/services/brands/brands.service';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  _brandsService = inject(BrandsService);
  brands!:IBrands

  ngOnInit(): void {
    this.allCategories();
  }

  allCategories(): void {
    this._brandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res);
        this.brands=res;
      },
    });
  }
}
