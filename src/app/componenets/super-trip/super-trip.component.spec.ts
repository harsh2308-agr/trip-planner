import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperTripComponent } from './super-trip.component';

describe('SuperTripComponent', () => {
  let component: SuperTripComponent;
  let fixture: ComponentFixture<SuperTripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperTripComponent]
    });
    fixture = TestBed.createComponent(SuperTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
