import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { BudgetComponent } from '../budget/budget.component';
import { shortMonthLookup } from '../appsettings';

@Component({
  selector: 'app-annual-spent',
  standalone: true,
  imports: [],
  templateUrl: './annual-spent.component.html',
  styleUrl: './annual-spent.component.scss'
})
export class AnnualSpentComponent implements OnInit {
  public chart: Chart<"line", number[], string>|null = null;
  public costs: number[]|null = null;

  private labels = shortMonthLookup;

  constructor(
    public parent: BudgetComponent
  ) { }

  ngOnInit(): void {
    this.parent.annualExpenses.subscribe((exps) => {
      // Create array for costs
      this.costs = new Array<number>(shortMonthLookup.length).fill(0);

      // For each exp, add value to corresponding month
      for (let exp of exps) {
        this.costs[exp.month - 1] += exp.value;
      }

      this.updateChart();
    });
  }

  private createChart() {
    if (this.costs === null) {
      return;
    }

    this.chart = new Chart("annual-spent", {
      type: "line",
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.costs
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  private updateChart() {
    if (this.chart === null) {
      this.createChart();
      return;
    }

    if (this.costs === null) {
      return;
    }

    this.chart.data.datasets[0].data = this.costs;
    this.chart.update();
  }
}
