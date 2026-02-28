import { inject, Injectable, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemesettingService {
  private readonly rendererFactory2 = inject(RendererFactory2);
  private readonly renderer = this.rendererFactory2.createRenderer(null, null);

  changetheme(themename: string): void {
    this.renderer.setAttribute(document.body, 'data-theme', themename);
    localStorage.setItem('usertheme', themename);
  }

  loadSaveTheme(): void {
    const savedtheme = localStorage.getItem('usertheme') || 'default';
    this.changetheme(savedtheme);
  }
}
