import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrenciesList, RatesList } from '../../../models';
import { SharedService } from '../../../home/services/shared.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CurrenciesService } from '../../services/currencies.service';
import calculateRate from '../../../lib/rateConversionCalc';

@Component({
  selector: 'app-currency-panel',
  templateUrl: './currency-panel.component.html',
  styleUrl: './currency-panel.component.css'
})
export class CurrencyPanelComponent {
  @Input() currencies: CurrenciesList["symbols"] = null;
  @Input() rates: RatesList["rates"] = null;
  @Input() homeConverterValues:{ amount: number, from: string, fromCurrencyRate: number, to:string, toCurrencyRate: number } | undefined
  @Output() currencyFrom = new EventEmitter<string>();
  
  form: FormGroup;
  result: number = 0;
  detailsFromCurrency: string  = "";
  detailsToCurrency: string  = "";
  isMoreDetailsDisabled: boolean = true;

  constructor(private fb: FormBuilder, private sharedService: SharedService, private route: ActivatedRoute, private router: Router, private currenciesService: CurrenciesService) {
    this.form = this.fb.group({
      from: [{value:this.detailsFromCurrency || "EUR" , disabled: true}, Validators.required],
      to: [{value: this.detailsToCurrency || "USD", disabled: true}, Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
    });
    this.route.queryParams.subscribe(({from, to}) => {
      this.detailsFromCurrency = from ? from : undefined;
      this.detailsToCurrency = to ? to : undefined;

      this.form.get('from')?.setValue(this.detailsFromCurrency || "EUR");
      this.form.get('to')?.setValue(this.detailsToCurrency || "USD");
      this.form.get('amount')?.setValue(this.homeConverterValues?.amount || undefined);
      this.result = 0;
    });

    this.form.get('amount')?.valueChanges.subscribe(amount => {
      if (amount !== null) {
        this.form.get('to')?.enable();
        this.isMoreDetailsDisabled = false
      } else {
        this.form.get('to')?.disable();
      }
    });
  }

  ngOnInit(){
    if(this.homeConverterValues){
      this.form.get("amount")?.setValue(this.homeConverterValues.amount)
      this.result = calculateRate(this.detailsFromCurrency, this.detailsToCurrency, this.rates, this.currencies, this.form.get("amount")?.value)
    }
  }


  

  swapValues(): void {
    const fromValue = this.form.get('from')?.value;
    const toValue = this.form.get('to')?.value;
    const amount = this.form.get('amount')?.value;

    this.form.get('from')?.setValue(toValue);
    this.form.get('to')?.setValue(fromValue);
   
    this.result = calculateRate(fromValue, toValue, this.rates, this.currencies, amount)

  }

  onSubmit() {
    const amountValue = this.form.get('amount')?.value;

    this.detailsFromCurrency = this.form.get('from')?.value;
    this.detailsToCurrency = this.form.get('to')?.value;

    this.result = calculateRate(this.detailsFromCurrency, this.detailsToCurrency, this.rates, this.currencies, amountValue)

    this.currencyFrom.emit(this.detailsFromCurrency);
  }

 
}
