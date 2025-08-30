import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const _PLATFORM_ID = inject(PLATFORM_ID);

  if (isPlatformBrowser(_PLATFORM_ID)) {
    const token = localStorage.getItem('token');
    if (token) {
      router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
  return false;
};
