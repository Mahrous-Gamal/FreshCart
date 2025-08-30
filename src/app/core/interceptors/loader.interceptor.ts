import { Spinner } from './../../../../node_modules/ngx-spinner/lib/ngx-spinner.enum.d';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner=inject(NgxSpinnerService);
  spinner.show();
  
 
  return next(req).pipe(
    finalize(() => {
      spinner.hide();
}
  ));
};
