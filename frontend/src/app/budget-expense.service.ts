import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { ApiResponse, AppSettings, Expense, convertErrorCodes } from './appsettings';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetExpenseService {
  public expenses: Subject<Expense[]> = new Subject<Expense[]>();
  public errorMsg: Subject<string|null> = new Subject<string|null>();

  constructor(
    private authService: AuthenticationService
  ) { }

  getExpenses(year?: number) {
    if (year === undefined) {
      this.authService.sendAuthorizedRequest(
        "get",
        AppSettings.API_ENDPOINT + "/budget/expense/all"
      ).subscribe((data) => {
        this.pushExpenses(data);
      });
      return;
    }

    this.authService.sendAuthorizedRequest(
      "get",
      AppSettings.API_ENDPOINT + `/budget/expense/date/${year}/all`
    ).subscribe((data) => {
      this.pushExpenses(data);
    });
  }

  updateExpense(category: number, year: number, month: number, value: number) {
    this.authService.sendAuthorizedRequest(
      "post",
      AppSettings.API_ENDPOINT + `/budget/expense/new`,
      {
        category: category,
        year: year,
        month: month,
        value: value
      }
    ).subscribe((data) => {
      this.updateExpenses(data);
    });
  }

  private pushExpenses(data: ApiResponse) {
    if (data.success) {
      this.errorMsg.next(null);
      this.expenses.next((data.data as any).expenses);
    } else {
      this.errorMsg.next(convertErrorCodes(data.error as string));
    }
  }

  private updateExpenses(data: ApiResponse) {
    if (data.success) {
      this.getExpenses();
    } else {
      this.errorMsg.next(convertErrorCodes(data.error as string));
    }
  }
}
