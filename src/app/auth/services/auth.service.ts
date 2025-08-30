import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WEBSITE_BASE_URL } from '../../core/constance/WEBSITE_BASE_URL';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClint: HttpClient) {}

  // !signup
  sendSignUp(data: object): Observable<any> {
    return this.httpClint.post(`${WEBSITE_BASE_URL}/api/v1/auth/signup`, data);
  }

  // !signin
  sendSignIn(data: object): Observable<any> {
    return this.httpClint.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, data);
  }


  // !forget pass
  // *confirm email
  confirmEmail(data: object): Observable<any> {
    return this.httpClint.post(`${WEBSITE_BASE_URL}/api/v1/auth/forgotPasswords`, data);
  }

  // *confirm code
  confirmCode(data: object): Observable<any> {
    return this.httpClint.post(`${WEBSITE_BASE_URL}/api/v1/auth/verifyResetCode`, data);
  }

  // *reset pass
  resetPassword(data: object): Observable<any> {
    return this.httpClint.put(`${WEBSITE_BASE_URL}/api/v1/auth/resetPassword`, data);
  }
}
