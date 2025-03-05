import { TestBed } from '@angular/core/testing';

import { GroupServiceTsService } from './group.service';

describe('GroupServiceTsService', () => {
  let service: GroupServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
