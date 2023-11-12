import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrenciesService } from '../../services/currencies.service';
import { CurrenciesList, RatesList } from '../../../models';
import { SharedService } from '../../../home/services/shared.service';

@Component({
  selector: 'app-currency-panel',
  templateUrl: './currency-panel.component.html',
  styleUrl: './currency-panel.component.css'
})
export class CurrencyPanelComponent {
  form: FormGroup;
  result: number = 0;
  currencies: CurrenciesList["symbols"] = null;
  rates: RatesList["rates"] = null;

  constructor(private fb: FormBuilder, private currenciesService: CurrenciesService, private sharedService: SharedService) {
    this.form = this.fb.group({
      from: [{value:'EUR', disabled: true}, Validators.required],
      to: [{value:'USD', disabled: true}, Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
    });

    this.currenciesService.getCurrenciesList().subscribe(currencies=> this.currencies = currencies.symbols)
    this.currenciesService.getRatesList().subscribe(rates=> this.rates = rates.rates)

    this.form.get('amount')?.valueChanges.subscribe(amount => {
      if (amount !== null) {
        this.form.get('from')?.enable();
        this.form.get('to')?.enable();
      } else {
        this.form.get('from')?.disable();
        this.form.get('to')?.disable();
      }
    });
  }

  swapValues(): void {
    const fromValue = this.form.get('from')?.value;
    const toValue = this.form.get('to')?.value;

    this.form.get('from')?.setValue(toValue);
    this.form.get('to')?.setValue(fromValue);

    this.onSubmit()
  }

  onSubmit() {
    const amountValue = this.form.get('amount')?.value;

    const fromCurrencyValue = this.form.get('from')?.value;
    const toCurrencyValue = this.form.get('to')?.value;

    const conversionFromRate = this.rates?.[fromCurrencyValue];
    const conversionToRate = this.rates?.[toCurrencyValue];

    if (conversionFromRate !== undefined && conversionToRate !== undefined) {
      const convertedCurrency =  ((conversionToRate / conversionFromRate) * amountValue)
      this.result = parseFloat(convertedCurrency.toFixed(3))
    } 

    this.sharedService.updateFormValues({ amount: amountValue, from: fromCurrencyValue, fromCurrencyRate: conversionFromRate! });
  }
}
