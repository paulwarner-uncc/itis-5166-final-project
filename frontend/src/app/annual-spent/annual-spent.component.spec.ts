import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualSpentComponent } from './annual-spent.component';

describe('AnnualSpentComponent', () => {
  let component: AnnualSpentComponent;
  let fixture: ComponentFixture<AnnualSpentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnualSpentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnualSpentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
