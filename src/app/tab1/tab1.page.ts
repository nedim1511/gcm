import { AfterViewInit, Component } from "@angular/core";
import Chart from "../../../node_modules/chart.js";
import { Tab1Service } from "../services/tab1.service.js";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements AfterViewInit {
  currency: string;
  totalCash: number;
  totalCards: number;
  constructor(private service: Tab1Service) {}

  ngAfterViewInit() {
    this.service.getDashboardData().subscribe((res) => {
      this.currency = res.currency;
      this.totalCards = res.issuedGiftCards.total;
      this.totalCash = res.issuedCash.total;
      this.populateBarChart("cardsBarchart", res.issuedGiftCards.range.map((item) => item.amount));
      this.populateBarChart("cashBarchart", res.issuedCash.range.map((item) => item.amount));
      this.populatePiechart("cardsPiechart", [res.redeemedGiftCards.total, res.openGiftCards.total]);
      this.populatePiechart("cashPiechart", [res.redeemedCash.total, res.openCash.total]);
    });
  }

  private populateBarChart(name: string, data: number[]) {
    const canvas = <HTMLCanvasElement>document.getElementById(name);
    const ctx = canvas.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: this.getLastSixmonthNames(),
        datasets: [
          {
            label:
              "Total Issued " +
              (name === "cashBarchart" ? "Cash in " + this.currency : "Cards"),
            data: data,
            backgroundColor: this.getBarchartBackgroundColors(),
            borderColor: this.getBarchartBorderColors(),
            borderWidth: 1,
          },
        ],
      },
      options: this.getBarChartOptions(),
    });
  }

  private populatePiechart(name: string, data: number[]) {
    const canvas = <HTMLCanvasElement>document.getElementById(name);
    const ctx = canvas.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "pie",
      data: {
        datasets: [
          {
            data: data,
            backgroundColor: this.getBarchartBackgroundColors(),
          },
        ],
        labels: ["Redeemed", "Opened"],
      },
    });
  }

  private getLastSixmonthNames(): string[] {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const today = new Date();
    let date: Date;
    const months: string[] = [];

    for (let i = 5; i > -1; i -= 1) {
      date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push(monthNames[date.getMonth()]);
    }

    return months;
  }

  private getBarChartOptions(): Object {
    return {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
  }

  private getBarchartBackgroundColors(): string[] {
    return [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(255, 159, 64, 0.2)",
    ];
  }

  private getBarchartBorderColors(): string[] {
    return [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
    ];
  }
}
