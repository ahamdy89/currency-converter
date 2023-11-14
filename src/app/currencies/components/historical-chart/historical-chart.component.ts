import { Component, Input , SimpleChanges, ChangeDetectorRef  } from '@angular/core';
import { CurrenciesService } from '../../services/currencies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historical-chart',
  templateUrl: './historical-chart.component.html',
  styleUrl: './historical-chart.component.css'
})
export class HistoricalChartComponent {
  lineChartData:{name:string, series:Array<{name:string, value: number}>}[] = [{name:"Historical Data", series:[]}]
  isrender = false;
  constructor(private cdr: ChangeDetectorRef, private currenciesService: CurrenciesService, private route:ActivatedRoute){}

  ngOnInit(){
    let fromCurrency = ""
    let toCurrency = ""
    this.route.queryParams.subscribe(({from, to}) => {
      fromCurrency = from;
      toCurrency = to
    });

    const last12MonthsDates:string[] = []
    const last12MonthNames:string[] = []

    const currentDate = new Date();
    for (let i = 1; i < 13; i++) {
      const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0);
      const formattedDate = this.formatDate(lastDayOfMonth);
      const monthName = this.getMonthName(lastDayOfMonth.getMonth()); // Function to get month name
      const year = lastDayOfMonth.getFullYear();
      const formattedMonthName = `${monthName}-${year}`;

      last12MonthsDates.push(formattedDate);
      last12MonthNames.push(formattedMonthName);
    }
    this.currenciesService.getHistoricalRates(last12MonthsDates, fromCurrency, toCurrency).subscribe((data)=> {
      const formattedChartData = data.map(item => {
        const index = last12MonthsDates.indexOf(item.date);
        const month = index !== -1 ? last12MonthNames[index] : "";
      
        return {
          name:month,
          value: item.rates.USD
        };
      });
      this.isrender = true;
      this.lineChartData[0].series = formattedChartData
    })
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getMonthName(monthIndex: number): string {
    const monthNames = [
      'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
      'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ];
    return monthNames[monthIndex];
  }
}
