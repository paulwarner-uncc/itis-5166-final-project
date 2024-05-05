import { TestBed } from '@angular/core/testing';

import { BudgetCategoryService } from './budget-category.service';

describe('BudgetCategoryService', () => {
  let service: BudgetCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
