import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shortspage',
  imports: [],
  templateUrl: './shortspage.component.html',
  styleUrl: './shortspage.component.css',
})
export class ShortspageComponent {
  private readonly router = inject(Router);

  feed() {
    this.router.navigate(['/feed']);
  }
  profile() {
    this.router.navigate(['/profile']);
  }
  setting() {
    this.router.navigate(['/setting']);
  }
}
