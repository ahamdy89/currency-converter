import { Injectable } from '@angular/core';
import { CurrenciesService } from './currencies/services/currencies.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private currencyService: CurrenciesService) {}

  initializeApp(): Observable<any> {
    return forkJoin([this.currencyService.getCurrenciesList(), this.currencyService.getRatesList()]);
  }
}
