import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  btnScroll: boolean = false;

  @HostListener('window:scroll', [])
  whenScroll() {
    this.btnScroll = window.scrollY > 200;
  }
  toTopScreen(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
