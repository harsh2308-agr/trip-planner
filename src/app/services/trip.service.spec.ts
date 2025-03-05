import { TestBed } from '@angular/core/testing';

import { TripServiceTsService } from './trip.service';

describe('TripServiceTsService', () => {
  let service: TripServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
