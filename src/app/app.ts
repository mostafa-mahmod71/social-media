import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemesettingService } from './core/auth/services/themesetting/themesetting.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('social-app');
  private readonly themesettingService = inject(ThemesettingService);

  ngOnInit(): void {
    this.themesettingService.loadSaveTheme();
  }
}
