import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripSuggestionsComponent } from './trip-suggestions.component';

describe('TripSuggestionsComponent', () => {
  let component: TripSuggestionsComponent;
  let fixture: ComponentFixture<TripSuggestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripSuggestionsComponent]
    });
    fixture = TestBed.createComponent(TripSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
