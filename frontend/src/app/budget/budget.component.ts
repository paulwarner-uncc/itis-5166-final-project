import { Component, OnInit } from '@angular/core';
import { MonthlySpentComponent } from '../monthly-spent/monthly-spent.component';
import { MonthlyBudgetComponent } from '../monthly-budget/monthly-budget.component';
import { AnnualSpentComponent } from '../annual-spent/annual-spent.component';
import { BudgetCategoryService } from '../budget-category.service';
import { BudgetExpenseService } from '../budget-expense.service';
import { Category, Expense } from '../appsettings';
import { Subject } from 'rxjs';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [MonthlySpentComponent, MonthlyBudgetComponent, AnnualSpentComponent, NgIf, RouterLink, RouterLinkActive],
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

  private internalCats: Category[]|null = null;
  private internalExps: Expense[]|null = null;

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
      this.internalCats = cats;

      this.categories.next(cats);
    });

    this.expenseService.expenses.subscribe((exps) => {
      this.internalExps = exps;

      // Filter expenses by month
      this.monthlyExpenses.next(exps.filter((exp) => {
        return exp.month === this.month;
      }));

      this.annualExpenses.next(exps);
    });

    this.categoryService.getCategories();
    this.expenseService.getExpenses(this.curDate.getFullYear());
  }

  getCategories(allowCache?: boolean) {
    if (allowCache && this.internalCats !== null) {
      this.categories.next(this.internalCats);
    } else {
      this.categoryService.getCategories();
    }
  }

  getExpenses(year?: number, month?: number, allowCache?: boolean) {
    // If allowCache, allow data stored by this component to be returned to prevent duplicate HTTP
    // requests. Only really used on startup to ensure all child components get the data.
    if (allowCache && this.internalExps !== null) {
      this.annualExpenses.next(this.internalExps);
      this.monthlyExpenses.next(this.internalExps.filter((exp) => {
        return exp.month === this.month;
      }));
    }

    this.expenseService.getExpenses(year);
  }

  hasValidData() {
    // Check if any data is available for the categories and expenses
    return this.internalCats !== null &&
           this.internalCats.length > 0;
  }
}
