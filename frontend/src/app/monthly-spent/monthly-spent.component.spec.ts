import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySpentComponent } from './monthly-spent.component';

describe('MonthlySpentComponent', () => {
  let component: MonthlySpentComponent;
  let fixture: ComponentFixture<MonthlySpentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlySpentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthlySpentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
