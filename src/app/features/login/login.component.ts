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
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  loginform: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    ]),
  });

  loading: boolean = false;
  msgErr: string = '';
  login: Subscription = new Subscription();
  logination(): void {
    if (this.loginform.valid) {
      this.loading = true;
      this.login.unsubscribe();
      this.login = this.authService.signin(this.loginform.value).subscribe({
        next: (res) => {
          console.log(res);
          this.loading = false;
          this.msgErr = '';
          if (res.success === true) {
            this.router.navigate(['/feed']);
          }
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

  directionR(data: string): void {
    this.router.navigate([data]);
  }
}
