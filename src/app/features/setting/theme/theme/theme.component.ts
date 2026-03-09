import { Component, inject } from '@angular/core';
import { ThemesettingService } from '../../../../core/auth/services/themesetting/themesetting.service';

@Component({
  selector: 'app-theme',
  imports: [],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.css',
})
export class ThemeComponent {
  private readonly themesettingService = inject(ThemesettingService);

  changeTheme(data: string) {
    this.themesettingService.changetheme(data);
  }
}
