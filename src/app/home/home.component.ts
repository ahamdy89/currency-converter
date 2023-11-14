import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CurrenciesService } from '../currencies/services/currencies.service';
import { CurrenciesList, RatesList } from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  pageTitle: string | undefined
  currencies: CurrenciesList["symbols"] = null;
  rates: RatesList["rates"] = null;

  constructor(private router: Router, private currenciesService: CurrenciesService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.pageTitle = this.router.url !== "/" ? undefined : "Currency Exchanger"
    });

    this.currenciesService.getCurrenciesList().subscribe(currencies=> this.currencies = currencies.symbols)
    this.currenciesService.getRatesList().subscribe(rates=> this.rates = rates.rates)
  }
}
