import { Component, inject } from '@angular/core';
import { ThemesettingService } from '../../../core/auth/services/themesetting/themesetting.service';

@Component({
  selector: 'app-setting',
  imports: [],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css',
})
export class SettingComponent {
  private readonly themesettingService = inject(ThemesettingService);

  changeTheme(data: string) {
    this.themesettingService.changetheme(data);
  }
}
