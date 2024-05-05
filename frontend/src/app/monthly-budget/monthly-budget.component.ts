import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../appsettings';
import { BudgetCategoryService } from '../budget-category.service';
import { BudgetComponent } from '../budget/budget.component';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-monthly-budget',
  standalone: true,
  imports: [],
  templateUrl: './monthly-budget.component.html',
  styleUrl: './monthly-budget.component.scss'
})
export class MonthlyBudgetComponent implements OnInit, OnDestroy {
  public chart: Chart<"pie", number[], string>|null = null;
  public categories: Category[]|null = null;

  constructor(
    private parent: BudgetComponent
  ) { }

  ngOnInit(): void {
    this.parent.categories.subscribe((cats) => {
      // Ensure consistent category order
      this.categories = cats.sort((cat1, cat2) => {
        return cat1.id - cat2.id;
      });

      // Actually create the chart with the data
      this.createChart();
    });

    this.parent.getCategories(true);
  }

  ngOnDestroy(): void {
    this.parent.categories.unsubscribe();
    this.chart = null;
  }

  private createChart() {
    if (this.categories === null) {
      return;
    }

    const labels = this.categories.map((cat) => {
      return cat.name;
    });

    const values = this.categories.map((cat) => {
      return cat.value;
    });

    this.chart = new Chart<"pie", number[], string>("monthly-budget", {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            data: values
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
}
