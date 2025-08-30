import {
  CartItem,
  IAllOrders,
} from './../../../core/interfaces/allorders/IAllOrders';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { OrderService } from '../../../core/services/orders/order.service';
import { CurrencyPipe, isPlatformBrowser, JsonPipe,DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [JsonPipe, CurrencyPipe,DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent {
  allOrders!: IAllOrders[];
  CartProducts!: CartItem[];

  _orderService = inject(OrderService);
  _PLATFORM_ID = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      const id = localStorage.getItem('userId')!;
      this._orderService.getAllOrders(id).subscribe({
        next: (res) => {
          console.log(res);
          this.allOrders = res;
          this._orderService.numOfOrders = res.length;
          console.log(res);
          console.log(id);
        },
      });
    }
  }
}
