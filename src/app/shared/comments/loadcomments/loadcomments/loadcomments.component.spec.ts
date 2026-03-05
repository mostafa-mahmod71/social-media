import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadcommentsComponent } from './loadcomments.component';

describe('LoadcommentsComponent', () => {
  let component: LoadcommentsComponent;
  let fixture: ComponentFixture<LoadcommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadcommentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadcommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
