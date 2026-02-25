import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Userinfo } from '../../../userinfo.interface';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly router = inject(Router);
  showdrop: boolean = false;
  showlogoutmodul: boolean = false;
  confirmlogout: boolean = false;
  userinfo: Userinfo = JSON.parse(localStorage.getItem('socialUser') || '{}');
  logout(): void {
    localStorage.setItem('socialUser', '');
    localStorage.setItem('socialToken', '');
    this.router.navigate(['/login']);
  }
  logoutmodul(): void {
    this.showlogoutmodul = !this.showlogoutmodul;
    this.showdrop = false;
  }
}
