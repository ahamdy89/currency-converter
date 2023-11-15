import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPanelComponent } from './components/currency-panel/currency-panel.component';
import { CurrencyDetailsPageComponent } from './currency-details-page/currency-details-page.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { HistoricalChartComponent } from './components/historical-chart/historical-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    CurrencyPanelComponent,
    CurrencyDetailsPageComponent,
    HistoricalChartComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ]
})
export class CurrenciesModule { }
