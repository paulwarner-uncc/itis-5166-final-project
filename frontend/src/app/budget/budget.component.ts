import { Component, OnInit } from '@angular/core';
import { MonthlySpentComponent } from '../monthly-spent/monthly-spent.component';
import { MonthlyBudgetComponent } from '../monthly-budget/monthly-budget.component';
import { AnnualSpentComponent } from '../annual-spent/annual-spent.component';
import { BudgetCategoryService } from '../budget-category.service';
import { BudgetExpenseService } from '../budget-expense.service';
import { Category, Expense } from '../appsettings';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [MonthlySpentComponent, MonthlyBudgetComponent, AnnualSpentComponent],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent implements OnInit {
  public categories: Subject<Category[]> = new Subject<Category[]>();
  public monthlyExpenses: Subject<Expense[]> = new Subject<Expense[]>();
  public annualExpenses: Subject<Expense[]> = new Subject<Expense[]>();

  public curDate = new Date();
  public year = this.curDate.getFullYear();
  public month = this.curDate.getMonth() + 1;

  constructor(
    private categoryService: BudgetCategoryService,
    private expenseService: BudgetExpenseService
  ) { }

  ngOnInit(): void {
    let dateInput = document.getElementById("monthly-spent-date") as HTMLInputElement;
    dateInput.addEventListener("change", () => {
      // Validate the date
      let date = new Date(dateInput.value);
      if (isNaN(date.getTime())) {
        return;
      }

      // Set year and month
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;

      // Request new data
      this.expenseService.getExpenses(this.year);
    });

    this.categoryService.categories.subscribe((cats) => {
      this.categories.next(cats);
    });

    this.expenseService.expenses.subscribe((exps) => {
      // Filter expenses by month
      this.monthlyExpenses.next(exps.filter((exp) => {
        return exp.month === this.month;
      }));

      this.annualExpenses.next(exps);
    });

    this.categoryService.getCategories();
    this.expenseService.getExpenses(this.curDate.getFullYear());
  }

  getCategories() {
    this.categoryService.getCategories();
  }

  getExpenses(year?: number, month?: number) {
    this.expenseService.getExpenses(year, month);
  }
}
