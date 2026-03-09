import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortspageComponent } from './shortspage.component';

describe('ShortspageComponent', () => {
  let component: ShortspageComponent;
  let fixture: ComponentFixture<ShortspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortspageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
