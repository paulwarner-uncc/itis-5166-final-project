import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Subject } from 'rxjs';
import { ApiResponse, AppSettings, Category, convertErrorCodes } from './appsettings';

@Injectable({
  providedIn: 'root'
})
export class BudgetCategoryService {
  public categories: Subject<Category[]> = new Subject<Category[]>();
  public errorMsg: Subject<string|null> = new Subject<string|null>();

  constructor(
    private authService: AuthenticationService
  ) { }

  getCategories() {
    this.authService.sendAuthorizedRequest(
      "get",
      AppSettings.API_ENDPOINT + "/budget/category/all"
    ).subscribe((data) => {
      this.pushCategories(data);
    });
  }

  updateCategory(id: number, value: number) {
    this.authService.sendAuthorizedRequest(
      "patch",
      AppSettings.API_ENDPOINT + `/budget/category/${id}/value`,
      {
        value: value
      }
    ).subscribe((data) => {
      this.updateCategories(data);
    });
  }

  deleteCategory(id: number) {
    this.authService.sendAuthorizedRequest(
      "delete",
      AppSettings.API_ENDPOINT + `/budget/category/${id}`
    ).subscribe((data) => {
      this.updateCategories(data);
    });
  }

  createCategory(name: string, value: number) {
    this.authService.sendAuthorizedRequest(
      "post",
      AppSettings.API_ENDPOINT + "/budget/category/new",
      {
        name: name,
        value: value
      }
    ).subscribe((data) => {
      this.updateCategories(data);
    });
  }

  private pushCategories(data: ApiResponse) {
    if (data.success) {
      this.errorMsg.next(null);
      this.categories.next((data.data as any).categories);
    } else {
      this.errorMsg.next(convertErrorCodes(data.error as string));
    }
  }

  private updateCategories(data: ApiResponse) {
    if (data.success) {
      this.getCategories();
    } else {
      this.errorMsg.next(convertErrorCodes(data.error as string));
    }
  }
}
