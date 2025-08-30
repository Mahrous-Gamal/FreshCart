import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  step: number = 1;

  // !service
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  // ^validation
  // !step1
  confirmEmail: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    // password:[null,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)]],
  });

  // !step2
  confirmCode: FormGroup = this.formBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });

  // !step3
  resetPassword: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [
      null,
      [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)],
    ],
  });

  //! btn 1
  sendConfirmEmail(): void {
    let emailValue=this.confirmEmail.get('email')?.value;
    this.resetPassword.get('email')?.patchValue(emailValue);
    this.handleSubmit();
    this.isLoading = false;
    if (this.confirmEmail.valid) {
      this.isLoading = true;
      this.authService.confirmEmail(this.confirmEmail.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.statusMsg === 'success') {
            this.nextStep();
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        },
      });
    }
  }
  //! btn 2
  sendConfirmCode(): void {
    this.isLoading = false;
    this.handleSubmit();
    if (this.confirmCode.valid) {
      this.isLoading = true;
      this.authService.confirmCode(this.confirmCode.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 'Success') {
            this.isLoading = false;
            this.nextStep();
            
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        },
      });
    }
  }
  //! btn 3
  sendResetPassword(): void {
    this.handleSubmit();
    this.isLoading = false;
    if (this.resetPassword.valid){
      this.isLoading = true;
      this.authService.resetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          localStorage.setItem('token', res.token);
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1500);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  
  }

  handleSubmit() {
    this.confirmEmail.markAllAsTouched();
    this.successMessage = '';
    this.errorMessage = '';
  }

  nextStep() {
    console.log(this.step);
    this.step++;
  }
}
