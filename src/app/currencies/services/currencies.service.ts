import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../../environments/environment';
import {  RatesList } from '../../models';
import ConvertedCurrency from '../../models/convertedCurrency';
import { catchError, finalize, map, shareReplay } from 'rxjs/operators';

interface CurrenciesList {
  success?: boolean;
  symbols: {
    [currencyCode: string]: string;
  } | null;
}

interface FetchConvertedCurrencyArgs {
  from:string;
  to:string;
  amount:number
}

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  private currenciesApiUrl = `${environment.apiUrl}/symbols`;
  private ratesApiUrl = `${environment.apiUrl}/latest`;
  private apiKey = environment.apiKey;
  private currenciesList$!: Observable<CurrenciesList>
  private ratesList$!: Observable<RatesList>
  private historicalRatesApi = `${environment.apiUrl}`

  constructor(private http: HttpClient) {

  }

  getCurrenciesList(): Observable<CurrenciesList> {
    if (!this.currenciesList$) {
      this.currenciesList$ = this.http.get(`${this.currenciesApiUrl}?access_key=${this.apiKey}`).pipe(
        map((data: any) => ({
          symbols: data.symbols,
          success: data.success
        } as CurrenciesList)),
        shareReplay(1)
      );
    }

    return this.currenciesList$;
  }

  getRatesList(): Observable<any> {
    if (!this.ratesList$) {
      this.ratesList$ = this.http.get(`${this.ratesApiUrl}?access_key=${this.apiKey}`).pipe(
        map((data: any) => ({
          rates: data.rates,
          success: data.success
        } as RatesList)),
        shareReplay(1)
      );
    }
    return this.ratesList$;
  }

  getHistoricalRates(dates: string[], fromCurrency:string, toCurrency:string): Observable<any[]> {
    const requests: Observable<any>[] = [];
    dates.forEach(date => {
      const request = this.http.get<any>(`${this.historicalRatesApi}/${date}?access_key=${this.apiKey}&base=${fromCurrency}&symbols=${toCurrency}`);
      requests.push(request);
    });

    return forkJoin(requests);
  }
}
