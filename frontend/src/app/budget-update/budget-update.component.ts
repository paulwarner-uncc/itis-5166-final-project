import { Component, OnInit } from '@angular/core';
import { AppSettings, Category, Expense, monthLookup } from '../appsettings';
import { BudgetExpenseService } from '../budget-expense.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { BudgetCategoryService } from '../budget-category.service';

@Component({
  selector: 'app-budget-update',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './budget-update.component.html',
  styleUrl: './budget-update.component.scss'
})
export class BudgetUpdateComponent implements OnInit {
  public categories: Category[] = [];
  public expenses: Expense[] = [];
  public errorMsg: string|null = null;
  public successMsg: string|null = null;
  public curDate: Date = new Date();
  public year: number = this.curDate.getFullYear();
  public monthLookup = monthLookup;

  constructor(
    private expenseService: BudgetExpenseService,
    private categoryService: BudgetCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryService.categories.subscribe((cat) => {
      this.categories = cat;
    });

    this.expenseService.expenses.subscribe((exp) => {
      this.expenses = exp;
    });

    this.expenseService.errorMsg.subscribe((msg) => {
      this.errorMsg = msg;
    });

    this.route.queryParamMap.subscribe(params => {
      if (!params.has("year")) {
        this.year = this.curDate.getFullYear();
        return;
      }

      let year = parseInt(params.get("year") as string);

      // Prevent invalid years
      if (isNaN(year) || year > this.curDate.getFullYear() || year < 0) {
        this.router.navigate(["/update"]);
        return;
      }

      this.year = year;
    });

    this.categoryService.getCategories();
    this.expenseService.getExpenses(this.year);
  }

  getExpenseValue(category: number, month: number): number {
    let expense = this.getExpense(category, month, this.year);
    if (expense === null) {
      return 0;
    }
    return expense.value;
  }

  /* updateExpenseValue(category: number, month: number) {
    this.errorMsg = null;
    this.successMsg = null;

    const elem = document.getElementById(`value${month}.${category}`) as HTMLInputElement;
    const value = parseFloat(elem.value);
    if (isNaN(value)) {
      this.errorMsg = "Please provide a valid value.";
      return;
    }

    this.successMsg = "Successfully updated the expense.";

    this.expenseService.updateExpense(category, this.year, month + 1, value);
  } */

  updateMonth(month: number) {
    for (let category of this.categories) {
      const elem = document.getElementById(`value${month}.${category.id}`) as HTMLInputElement;
      const value = parseFloat(elem.value);
      if (isNaN(value)) {
        this.errorMsg = "Please provide a valid value.";
        return;
      }

      this.expenseService.updateExpense(category.id, this.year, month + 1, value);
    }
    this.successMsg = `Successfully updated ${monthLookup[month]}.`;
    this.expenseService.getExpenses();
  }

  getNextYear() {
    this.errorMsg = null;
    this.successMsg = null;

    if (this.year < this.curDate.getFullYear()) {
      this.year++;
      this.expenseService.getExpenses(this.year);
    }
  }

  getPrevYear() {
    this.errorMsg = null;
    this.successMsg = null;

    if (this.year > 0) {
      this.year--;
      this.expenseService.getExpenses(this.year);
    }
  }

  private getExpense(category: number, month: number, year: number): Expense|null {
    let expense = this.expenses.filter((exp) => {
      return exp.category === category && exp.month === month + 1 && exp.year === year
    });

    if (expense.length === 0) {
      return null;
    }

    return expense[0];
  }
}
