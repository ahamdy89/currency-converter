import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrenciesList, RatesList } from '../../../models';
import { SharedService } from '../../../home/services/shared.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CurrenciesService } from '../../../currencies/services/currencies.service';

@Component({
  selector: 'app-home-currency-panel',
  templateUrl: './home-currency-panel.component.html',
  styleUrl: './home-currency-panel.component.css'
})
export class HomeCurrencyPanelComponent {
  @Input() currencies: CurrenciesList["symbols"] = null;
  @Input() rates: RatesList["rates"] = null;
  
  form: FormGroup;
  result: number = 0;
  detailsFromCurrency: string  = "";
  detailsToCurrency: string  = "";
  isMoreDetailsDisabled: boolean = true;

  constructor(private fb: FormBuilder, private sharedService: SharedService, private router: Router) {
    this.form = this.fb.group({
      from: [{value:this.detailsFromCurrency || "EUR" , disabled: true}, Validators.required],
      to: [{value: this.detailsToCurrency || "USD", disabled: true}, Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
    });
    
    this.form.get('amount')?.valueChanges.subscribe(amount => {
      if (amount !== null) {
        this.form.get('from')?.enable();
        this.form.get('to')?.enable();
        this.isMoreDetailsDisabled = false
      } else {
        this.form.get('from')?.disable();
        this.form.get('to')?.disable();
        this.isMoreDetailsDisabled = true;
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
    this.detailsFromCurrency = this.form.get('from')?.value;
    this.detailsToCurrency = this.form.get('to')?.value;

    const conversionFromRate = this.rates?.[this.detailsFromCurrency!];
    const conversionToRate = this.rates?.[this.detailsToCurrency!];

    if (conversionFromRate !== undefined && conversionToRate !== undefined) {
      const convertedCurrency =  ((conversionToRate / conversionFromRate) * amountValue)
      this.result = parseFloat(convertedCurrency.toFixed(3))
    } 

    this.sharedService.updateFormValues({ amount: amountValue, from: this.detailsFromCurrency, fromCurrencyRate: conversionFromRate!, to:this.detailsToCurrency, toCurrencyRate: conversionToRate! });
  }

  onMoreDetails(){
    if (!this.isMoreDetailsDisabled) {
      this.router.navigate(["/details"],{queryParams:{from: this.detailsFromCurrency, to: this.detailsToCurrency}})
    }
  }
}
