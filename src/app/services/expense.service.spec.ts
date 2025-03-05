import { TestBed } from '@angular/core/testing';

import { ExpenseServiceTsService } from './expense.service';

describe('ExpenseServiceTsService', () => {
  let service: ExpenseServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
