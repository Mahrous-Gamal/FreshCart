import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../core/interfaces/products/IProducts';

@Pipe({
  name: 'searchProducts',
})
export class SearchProductsPipe implements PipeTransform {
  transform(value: IProduct[], searchValue: string): IProduct[] {
  
    return value.filter((product) => { return product.category.name.toLowerCase().includes(searchValue.toLowerCase())});
  }
}
