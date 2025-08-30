import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WEBSITE_BASE_URL } from '../../constance/WEBSITE_BASE_URL';
import { IOnlinePayment } from '../../interfaces/payment/IOnlinePayment';
import { IAllOrders } from '../../interfaces/allorders/IAllOrders';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  numOfOrders: number = 0;


  constructor(private _httpClient: HttpClient) {}


  // !All Orders
  getAllOrders(id: string) {
    return this._httpClient.get<IAllOrders[]>(`${WEBSITE_BASE_URL}/api/v1/orders/user/${id}`);
  }

  // !Payment
  onlinePayment(cartId: string, userDetails: {}) {
    return this._httpClient.post<IOnlinePayment>(
      `${WEBSITE_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress: userDetails,
      }
    );
  }

  // !Cash
  cashOnDelivery(cartId: string, userDetails: {}) {
    return this._httpClient.post<IOnlinePayment>(`${WEBSITE_BASE_URL}/api/v1/orders/${cartId}`, {
      shippingAddress: userDetails,
    });
  }
}
