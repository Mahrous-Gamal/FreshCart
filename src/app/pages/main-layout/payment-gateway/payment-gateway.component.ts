import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IOnlinePayment } from '../../../core/interfaces/payment/IOnlinePayment';
import { OrderService } from '../../../core/services/orders/order.service';

@Component({
  selector: 'app-payment-gateway',
  imports: [ReactiveFormsModule],
  templateUrl: './payment-gateway.component.html',
  styleUrl: './payment-gateway.component.scss',
})
export class PaymentGatewayComponent {
  method: string = '';
  payForm!: FormGroup;
  currentCartId!: string;
  id = localStorage.getItem('userId')!;

  _formGroup = inject(FormBuilder);
  _orderService = inject(OrderService);
  _activatedRoute = inject(ActivatedRoute);
  _router = inject(Router);

  ngOnInit() {
    this.checkoutForm();
    this.getCurrentId();
  }
  // !validation
  checkoutForm(): void {
    this.payForm = this._formGroup.group({
      city: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      details: [null, [Validators.required]],
    });
  }
  // !Payment
  onlinePayment(): void {
    this._orderService.onlinePayment(this.currentCartId,this.payForm.value).subscribe({
        next: (res:IOnlinePayment) => {
          console.log("Cart ID:", this.currentCartId);
          console.log(res.session.url);
          window.location.assign(res.session.url)
        
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  // !Cash
  cashOnDelivery(id:string): void {
    this._orderService.cashOnDelivery(this.currentCartId,this.payForm.value).subscribe({
      next: (res:IOnlinePayment) => {
        this._router.navigate([`/allorders/${id}`]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // !Submit
  onSubmit(method: string): void {
    this.handleSubmit();

    if (this.payForm.valid) {
      console.log(this.payForm.value);
      console.log(method);
      if (method === 'online') {
        this.onlinePayment();
      } else {
        this.cashOnDelivery(this.id);
      }
    }
  }

  // !handle functions
  handleSubmit() {
    this.payForm.markAllAsTouched();
  }
  getCurrentId() {
    return this._activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.currentCartId = params.get('id')!;
        console.log(this.currentCartId);
      },
    });
  }
}
