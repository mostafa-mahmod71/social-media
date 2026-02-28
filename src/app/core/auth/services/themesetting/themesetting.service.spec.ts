import { TestBed } from '@angular/core/testing';

import { ThemesettingService } from './themesetting.service';

describe('ThemesettingService', () => {
  let service: ThemesettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemesettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
