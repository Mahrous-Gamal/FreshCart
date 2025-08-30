import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Input, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbitefixService } from '../../../shared/services/flowbitefix.service';
import { CartService } from '../../services/cart/cart.service';
import { FlowbiteService } from '../../services/flowbite/flowbite.service';
import { OrderService } from '../../services/orders/order.service';
import { WishListService } from '../../services/wishList/wish-list.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {

  _PLATFORM_ID = inject(PLATFORM_ID);
  
  id:string = ''

  _cartService: CartService = inject(CartService);
  _orderservice: OrderService= inject(OrderService);
  _wishListService: WishListService= inject(WishListService);

  isNavbarOpen = false;
  flowbitefixService: FlowbitefixService = inject(FlowbitefixService);

  @Input() isLogin: boolean = false;

  constructor(private flowbiteService: FlowbiteService) {}
  router = inject(Router);

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {});
    if (this.isLogin) {
      this.cartItems();
      this.orderNum();
    }

    
     if (isPlatformBrowser(this._PLATFORM_ID)){
      this.id = localStorage.getItem('userId')!;
     }
     
    this.flowbitefixService.navbarOpen$.subscribe(open => {
      this.isNavbarOpen = open;
    });
  }

  toggleNavbar() {
    this.flowbitefixService.toggleNavbar();
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }

  cartItems(): void {
    this._cartService.getCart().subscribe({
      next: (res) => {
        this._cartService.numOfCartItems = res.numOfCartItems;

      },
    });
  }

  orderNum(): void {
    this._orderservice.getAllOrders(this.id).subscribe({
      next: (res) => {
        this._orderservice.numOfOrders = res.length;
        console.log(this._orderservice.numOfOrders)

      },
    });
  }

  wishListNum(){
    this._wishListService.getWishList().subscribe({
      next: (res) => {
        this._wishListService.numOfWishItems = res.data.length;
        console.log(this._wishListService.numOfWishItems)

      },
    });
  }

 

}
