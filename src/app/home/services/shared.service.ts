import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private formInputsSubject = new BehaviorSubject<{ amount: number, from: string, fromCurrencyRate:number , to: string, toCurrencyRate:number }>({ amount: 0, from: '', fromCurrencyRate: 0, to: '', toCurrencyRate: 0 });
  formValues$ = this.formInputsSubject.asObservable();
  updateFormValues(values: { amount: number, from: string, fromCurrencyRate:number, to: string, toCurrencyRate:number  }) {
    this.formInputsSubject.next(values);
  }
}
