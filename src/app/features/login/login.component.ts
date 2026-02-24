import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  loginform: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    ]),
  });

  loading: boolean = false;
  msgErr: string = '';
  loginapi: Subscription = new Subscription();
  logination(): void {
    if (this.loginform.valid) {
      this.loading = true;
      this.loginapi.unsubscribe();
      this.loginapi = this.authService.signin(this.loginform.value).subscribe({
        next: (res) => {
          console.log(res);
          this.loading = false;
          this.msgErr = '';
          localStorage.setItem('socialToken', res.data.token);
          localStorage.setItem('socialUser', JSON.stringify(res.data.user));
          this.router.navigate(['/feed']);
        },
        error: (err) => {
          console.log(err);
          this.msgErr = err.error.message;
          this.loading = false;
        },
      });
    } else {
      this.loginform.markAllAsTouched();
    }
  }

  showpass(pass: HTMLInputElement) {
    if (pass.type === 'password') {
      pass.type = 'text';
    } else {
      pass.type = 'password';
    }
  }
}
