import { Component, OnInit } from '@angular/core';
import { Category } from '../appsettings';
import { BudgetCategoryService } from '../budget-category.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-budget-configure',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './budget-configure.component.html',
  styleUrl: './budget-configure.component.scss'
})
export class BudgetConfigureComponent implements OnInit {
  public categories: Category[] = [];
  public errorMsg: string|null = null;
  public successMsg: string|null = null;

  private newName?: HTMLInputElement;
  private newValue?: HTMLInputElement;

  constructor(
    private categoryService: BudgetCategoryService
  ) {}

  ngOnInit(): void {
    this.newName = document.getElementById("newName") as HTMLInputElement;
    this.newValue = document.getElementById("newValue") as HTMLInputElement;

    this.categoryService.categories.subscribe((cats) => {
      this.categories = cats;
    });

    this.categoryService.errorMsg.subscribe((msg) => {
      this.errorMsg = msg;
    });

    this.categoryService.getCategories();
  }

  updateCategory(id: number): void {
    this.clearMessages();

    let value = parseFloat((document.getElementById(`value${id}`) as HTMLInputElement).value);
    if (isNaN(value)) {
      this.errorMsg = "Please provide a valid value.";
      return;
    }

    this.categoryService.updateCategory(id, value);
    this.successMsg = "Successfully updated the budget.";
  }

  deleteCategory(id: number): void {
    this.clearMessages();

    this.categories = this.categories.filter(val => val.id !== id);

    this.categoryService.deleteCategory(id);
  }

  createCategory(): void {
    this.clearMessages();

    /* Make sure the inputs were retrieved properly */
    if (!(this.newName && this.newValue)) {
      this.newName = document.getElementById("newName") as HTMLInputElement;
      this.newValue = document.getElementById("newValue") as HTMLInputElement;
    }

    let value = parseFloat(this.newValue.value);
    if (isNaN(value)) {
      this.errorMsg = "Please provide a valid value.";
      return;
    }

    if (this.newName.value === "") {
      this.errorMsg = "Please provide a valid name.";
      return;
    }

    this.categoryService.createCategory(this.newName.value, value);
    this.newName.value = "";
    this.newValue.value = "0";
  }

  private clearMessages() {
    this.errorMsg = null;
    this.successMsg = null;
  }
}
