import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetVisualsComponent } from './budget-visuals.component';

describe('BudgetVisualsComponent', () => {
  let component: BudgetVisualsComponent;
  let fixture: ComponentFixture<BudgetVisualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetVisualsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
