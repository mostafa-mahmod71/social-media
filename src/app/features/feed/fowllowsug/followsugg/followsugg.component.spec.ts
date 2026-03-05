import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowsuggComponent } from './followsugg.component';

describe('FollowsuggComponent', () => {
  let component: FollowsuggComponent;
  let fixture: ComponentFixture<FollowsuggComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowsuggComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowsuggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
