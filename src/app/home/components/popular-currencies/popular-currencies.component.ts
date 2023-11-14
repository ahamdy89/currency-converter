import { Component} from '@angular/core';
import { RatesList } from '../../../models';
import { CurrenciesService } from '../../../currencies/services/currencies.service';
import { tap } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';

interface RandomRates {
  rate: number;
  currency: string;
  convertedCurrency: string;
  convertedAmount: number;
  fromCurrencyRate: number;
}

@Component({
  selector: 'app-popular-currencies',
  templateUrl: './popular-currencies.component.html',
  styleUrl: './popular-currencies.component.css'
})
export class PopularCurrenciesComponent {
  rates: RatesList["rates"] = null;
  randomRates:  RandomRates[] | null = null;
  converterValues: { amount: number, from: string, fromCurrencyRate: number } = { amount: 0, from: 'EUR', fromCurrencyRate:0 };
  private subscription: Subscription;

  constructor(private currenciesService: CurrenciesService, private sharedService: SharedService){
    this.currenciesService.getRatesList().pipe(
      tap(rates => {
        this.rates = rates.rates;
        if (this.rates) {
          const currencyCodes = Object.entries(this.rates);
          // Shuffle the array of currency codes
          const shuffledCurrencyCodes = currencyCodes.sort(() => Math.random() - 0.5);
          const selectedCurrencyCodes = shuffledCurrencyCodes.slice(0, 9);
          this.randomRates = selectedCurrencyCodes.map(randomCurrency=> {
            const currency = randomCurrency[0];
            const rate = randomCurrency[1];
            const fromCurrencyRate = 0;
            const convertedCurrency = "";
            const convertedAmount = 0;
            return {rate, currency, convertedAmount, convertedCurrency, fromCurrencyRate}
          })
        }
      })
    ).subscribe(rates=> this.rates = rates.rates);

    this.subscription = this.sharedService.formValues$.subscribe((values) => {
      this.converterValues = values;
      this.randomRates?.map(rate=>{
        rate.convertedCurrency = this.converterValues.from;
        rate.convertedAmount = this.converterValues.amount;
        rate.fromCurrencyRate = this.converterValues.fromCurrencyRate;
      })
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
