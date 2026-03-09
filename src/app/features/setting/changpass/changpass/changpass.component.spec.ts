import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangpassComponent } from './changpass.component';

describe('ChangpassComponent', () => {
  let component: ChangpassComponent;
  let fixture: ComponentFixture<ChangpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangpassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
