import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [loggedGuard],
    loadComponent: () =>
      import('./core/layouts/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      {
        path: 'signin',
        loadComponent: () =>
          import('./auth/pages/sign-in/sign-in.component').then(
            (m) => m.SignInComponent
          ),
        title: 'FreshCart | SignIn',
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./auth/pages/sign-up/sign-up.component').then(
            (m) => m.SignUpComponent
          ),
        title: 'FreshCart | SignUp',
      },
      {
        path: 'forget',
        loadComponent: () =>
          import('./auth/pages/forget-password/forget-password.component').then(
            (m) => m.ForgetPasswordComponent
          ),
        title: 'FreshCart | Forget',
      },
    ],
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/layouts/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/main-layout/home/home.component').then(
            (m) => m.HomeComponent
          ),
        title: 'FreshCart | Home',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/main-layout/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
        title: 'FreshCart | Category',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./pages/main-layout/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
        title: 'FreshCart | Brands',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/main-layout/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        title: 'FreshCart | Products',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/main-layout/cart/cart.component').then(
            (m) => m.CartComponent
          ),
        title: 'FreshCart | Cart',
      },
      {
        path: 'wishList',
        loadComponent: () =>
          import('./pages/main-layout/wish-list/wish-list.component').then(
            (m) => m.WishListComponent
          ),
        title: 'FreshCart | WishList',
      },
      {
        path: 'allorders/:id',
        loadComponent: () =>
          import('./pages/main-layout/allorders/allorders.component').then(
            (m) => m.AllordersComponent
          ),
        title: 'FreshCart | Orders',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./pages/main-layout/details/details.component').then(
            (m) => m.DetailsComponent
          ),
        title: 'FreshCart | Product',
      },
      {
        path: 'payment/:id',
        loadComponent: () =>
          import(
            './pages/main-layout/payment-gateway/payment-gateway.component'
          ).then((m) => m.PaymentGatewayComponent),
        title: 'FreshCart | Payment',
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/main-layout/notfound/notfound.component').then(
            (m) => m.NotfoundComponent
          ),
        title: 'FreshCart | Not Found',
      },
    ],
  },
];
