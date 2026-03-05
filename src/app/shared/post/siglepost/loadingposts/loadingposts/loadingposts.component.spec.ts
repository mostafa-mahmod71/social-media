import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingpostsComponent } from './loadingposts.component';

describe('LoadingpostsComponent', () => {
  let component: LoadingpostsComponent;
  let fixture: ComponentFixture<LoadingpostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingpostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
