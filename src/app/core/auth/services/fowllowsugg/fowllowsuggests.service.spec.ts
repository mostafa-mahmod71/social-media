import { TestBed } from '@angular/core/testing';

import { FowllowsuggestsService } from './fowllowsuggests.service';

describe('FowllowsuggestsService', () => {
  let service: FowllowsuggestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FowllowsuggestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
