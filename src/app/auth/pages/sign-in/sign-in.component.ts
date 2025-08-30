import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ISuccess } from '../../interfaces/ISuccess';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  // !service
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  //!! Signin form , validation
  signInForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
    ]),
  });

  onSubmit(): void {
    this.handleSubmit();
    this.isLoading = false;

    if (this.signInForm.valid) {
      console.log(this.signInForm.value);
      this.isLoading = true;

      this.authService.sendSignIn(this.signInForm.value).subscribe({
        next: (res: ISuccess) => {
          console.log(res);
          console.log(res.message);
          this.successMessage = res.message;
          this.signInForm.reset();
          this.isLoading = false;
          localStorage.setItem('token', res.token);
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1500);
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          console.log(err.error);
          console.log(err.error.message);
          this.errorMessage = err.error.message;
        },
      });
    }
  }

  handleSubmit() {
    this.signInForm.markAllAsTouched();
    this.successMessage = '';
    this.errorMessage = '';
  }
}
