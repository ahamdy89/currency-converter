import { Component } from '@angular/core';
import { CurrenciesService } from './currencies/services/currencies.service';
import { CurrenciesList, RatesList } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currenciesList: CurrenciesList = {success:false, symbols:null};
  ratesList: RatesList = {success:false, rates:null};
  last12MonthsDates:string[] = []
  constructor(private currencyService: CurrenciesService) {}

  ngOnInit() {
    this.currencyService.getCurrenciesList().subscribe(data => {
      this.currenciesList.symbols = data['symbols'];
    });

    this.currencyService.getRatesList().subscribe(data => {
      this.ratesList = data['rates'];
    });

  }
   
}
