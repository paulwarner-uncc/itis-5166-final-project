import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetConfigureComponent } from './budget-configure.component';

describe('BudgetConfigureComponent', () => {
  let component: BudgetConfigureComponent;
  let fixture: ComponentFixture<BudgetConfigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetConfigureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
