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
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  registerform: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      username: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('', Validators.required),
      gender: new FormControl('male', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      ]),
      rePassword: new FormControl('', Validators.required),
    },
    { validators: [this.confirmPassword] },
  );

  confirmPassword(group: AbstractControl) {
    let password = group.get('password')?.value;
    let rePassword = group.get('rePassword')?.value;

    if (password !== rePassword && rePassword !== '') {
      group.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }
  loading: boolean = false;
  msgErr: string = '';
  register: Subscription = new Subscription();
  registeration(): void {
    if (this.registerform.valid) {
      this.loading = true;
      this.register.unsubscribe();
      this.register = this.authService.signup(this.registerform.value).subscribe({
        next: (res) => {
          console.log(res);
          this.loading = false;
          this.msgErr = '';
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
          this.msgErr = err.error.message;
          this.loading = false;
        },
      });
    } else {
      this.registerform.markAllAsTouched();
    }
  }
  showpass(pass: HTMLInputElement): void {
    if (pass.type === 'password') {
      pass.type = 'text';
    } else {
      pass.type = 'password';
    }
  }
  showrepass(rePass: HTMLInputElement) {
    if (rePass.type === 'password') {
      rePass.type = 'text';
    } else {
      rePass.type = 'password';
    }
  }
}
