import { TestBed } from '@angular/core/testing';

import { BudgetExpenseService } from './budget-expense.service';

describe('BudgetExpenseService', () => {
  let service: BudgetExpenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
