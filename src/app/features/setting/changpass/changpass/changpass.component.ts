import { Userinfo } from './../../../../userinfo.interface';
import { Component, inject } from '@angular/core';
import { ChangepassService } from '../../../../core/auth/services/changepass/changepass.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-changpass',
  imports: [ReactiveFormsModule],
  templateUrl: './changpass.component.html',
  styleUrl: './changpass.component.css',
})
export class ChangpassComponent {
  private readonly changepassService = inject(ChangepassService);

  changePass: FormGroup = new FormGroup({
    password: new FormControl('', Validators.required),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    ]),
  });
  pass: Subscription = new Subscription();
  errpass: string = '';
  changpass() {
    this.pass.unsubscribe();
    if (this.changePass.valid) {
      this.pass = this.changepassService.changepass(this.changePass.value).subscribe({
        next: (res) => {
          if (res.success) {
            this.errpass = '';
            console.log(res);
            localStorage.setItem('socialToken', res.data.token);
            this.errpass = res.message;
            this.changePass.reset();
          }
        },
        error: (err) => {
          this.errpass = err.error.message;
        },
      });
    }
  }
}
