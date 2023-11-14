import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter, from } from 'rxjs';
import { CurrenciesList, RatesList } from '../../models';
import { CurrenciesService } from '../services/currencies.service';
import { SharedService } from '../../home/services/shared.service';

@Component({
  selector: 'app-currency-details-page',
  templateUrl: './currency-details-page.component.html',
  styleUrl: './currency-details-page.component.css'
})
export class CurrencyDetailsPageComponent {
  pageTitle: string | undefined;
  currencyName: string = ""; 
  fromCurrency: string = ""; 
  toCurrency: string = ""; 
  currencies: CurrenciesList["symbols"] = null;
  rates: RatesList["rates"] = null;
  private subscription: Subscription = new Subscription();
  converterValues: { amount: number, from: string, fromCurrencyRate: number, to:string, toCurrencyRate: number } = { amount: 0, from: 'EUR', fromCurrencyRate:0, to: 'EUR', toCurrencyRate:0 };

  constructor(private route: ActivatedRoute, private router: Router, private currenciesService: CurrenciesService, private sharedService: SharedService) {
    this.route.queryParams.subscribe(({from, to}) => {
      this.currencyName = from;
      this.fromCurrency = from;
      this.toCurrency = to
    });
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {this.pageTitle = `${this.currencyName} - ${this.currencies?.[this.currencyName] || "EURO"}`});


    this.currenciesService.getCurrenciesList().subscribe(currencies=> this.currencies = currencies.symbols)
    this.currenciesService.getRatesList().subscribe(rates=> this.rates = rates.rates)
  }

  ngOnInit(){
    this.subscription = this.sharedService.formValues$.subscribe((values) => {
      this.converterValues = values;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeFromCurrency(data: string) {
    this.currencyName = data;
    this.pageTitle = `${this.currencyName} - ${this.currencies?.[this.currencyName]}`;
  }
}
