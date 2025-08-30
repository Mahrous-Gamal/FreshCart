import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const _PLATFORM_ID = inject(PLATFORM_ID);

  if (isPlatformBrowser(_PLATFORM_ID)) {

    const token:string = localStorage.getItem('token')!;
    
    localStorage.setItem('userId',(jwtDecode(token) as {id:string}).id);
    console.log(localStorage.getItem('userId'));
    if (token) {
      return true;
    } else {
      router.navigate(['/signin']);
      return false;
    }
  }
  return false;
};
