import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularCurrenciesComponent } from './components/popular-currencies/popular-currencies.component';
import { HomeCurrencyPanelComponent } from './components/home-currency-panel/home-currency-panel.component';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    PopularCurrenciesComponent,
    HomeCurrencyPanelComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
