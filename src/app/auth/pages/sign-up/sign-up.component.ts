import { Component, inject, Input, input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ISuccess } from '../../interfaces/ISuccess';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  // !service
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  //!! Signup form , validation
  signUpForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z]\w{7,}$/),
      ]),
      rePassword: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: this.confirmPassword }
  );

  onSubmit(): void {
    this.handleSubmit();
    if (this.signUpForm.valid) {
      this.isLoading = true;
      console.log(this.signUpForm.value);
      this.authService.sendSignUp(this.signUpForm.value).subscribe({
        next: (res: ISuccess) => {
          console.log(res);
          console.log(res.message);
          this.successMessage = res.message;
          this.signUpForm.reset();
          this.isLoading = false;
          setTimeout(() => {
            this.router.navigate(['/signin']);
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
    // this.signUpForm.markAllAsTouched();
  }

  handleSubmit() {
    this.signUpForm.markAllAsTouched();
    this.successMessage = '';
    this.errorMessage = '';
  }

  confirmPassword(match: AbstractControl) {
    return match.get('password')?.value === match.get('rePassword')?.value
      ? null
      : { mismatch: true };
  }
  form: FormGroup;
 showPassword = false;
showRePassword = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      password: ['', Validators.required],
    });
  }



togglePassword() {
  this.showPassword = !this.showPassword;
}

toggleRePassword() {
  this.showRePassword = !this.showRePassword;
}
}
