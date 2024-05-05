import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Category, Expense, monthLookup, shortMonthLookup } from '../appsettings';
import { NgIf } from '@angular/common';
import { BudgetComponent } from '../budget/budget.component';

// Via https://www.freecodecamp.org/news/how-to-make-bar-and-line-charts-using-chartjs-in-angular/
@Component({
  selector: 'app-monthly-spent',
  standalone: true,
  imports: [NgIf],
  templateUrl: './monthly-spent.component.html',
  styleUrl: './monthly-spent.component.scss'
})
export class MonthlySpentComponent implements OnInit {
  public chart: Chart<"bar", number[], string>|null = null;
  public categories: Category[]|null = null;
  public expenses: Expense[]|null = null;
  public monthLookup = monthLookup;
  public errorMsg: string|null = null;

  constructor(
    public parent: BudgetComponent
  ) { }

  ngOnInit(): void {
    this.parent.categories.subscribe((cats) => {
      // Ensure consistent category order
      this.categories = cats.sort((cat1, cat2) => {
        return cat1.id - cat2.id;
      });

      // If expenses have been acquired, update the chart
      if (this.expenses !== null) {
        this.updateChart();
      }
    });

    this.parent.monthlyExpenses.subscribe((exps) => {
      // Sort expenses by their category
      this.expenses = exps.sort((exp1, exp2) => {
        return exp1.category - exp2.category;
      });

      // If categories have been acquired, update the chart
      if (this.categories !== null) {
        this.updateChart();
      }
    });
  }

  createChart() {
    if (this.categories === null || this.expenses === null) {
      return;
    }

    const labels = this.categories.map((cat) => {
      return cat.name;
    });

    const budgetValues = this.categories.map((cat) => {
      return cat.value;
    });

    const expenseValues = this.expenses.map((exp) => {
      return exp.value;
    });

    this.chart = new Chart<"bar", number[], string>("monthly-spent", {
      type: "bar",

      data: {
        labels: labels,
        datasets: [
          {
            label: "Budgeted",
            data: budgetValues,
            backgroundColor: '#1E2749'
          },
          {
            label: "Spent",
            data: expenseValues,
            backgroundColor: '#1F7A8C'
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
            text: `Expenses for ${this.monthLookup[this.parent.month - 1]} ${this.parent.year}`,
            display: true
          }
        }
      }
    });
  }

  updateChart() {
    // If the chart hasn't been created yet, create it
    if (this.chart === null) {
      this.createChart();
      return;
    }

    if (this.categories === null || this.expenses === null) {
      return;
    }

    const cats = this.categories.sort((cat1, cat2) => {
      return cat1.id - cat2.id;
    });

    // Reset labels and first dataset
    this.chart.data.labels = [];
    this.chart.data.datasets[0].data = [];
    for (let category of this.categories) {
      this.chart.data.labels.push(category.name);
      this.chart.data.datasets[0].data.push(category.value);
    }

    // Reset the second dataset
    this.chart.data.datasets[1].data = [];
    for (let expense of this.expenses) {
      this.chart.data.datasets[1].data.push(expense.value);
    }

    // Update the title
    if (this.chart.options.plugins !== undefined && this.chart.options.plugins.title !== undefined) {
      this.chart.options.plugins.title.text = "Expenses for " +
        `${this.monthLookup[this.parent.month - 1]} ${this.parent.year}`;
    }

    //Update the chart to display the new data
    this.chart.update();
  }
}
