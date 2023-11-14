import { NgModule,APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { NavbarComponent } from './layout/components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyPanelComponent } from './currencies/components/currency-panel/currency-panel.component';
import { CurrencyDetailsPageComponent } from './currencies/currency-details-page/currency-details-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppService } from './app.service';
import { PopularCurrenciesComponent } from './home/components/popular-currencies/popular-currencies.component';
import { HomeCurrencyPanelComponent } from './home/components/home-currency-panel/home-currency-panel.component';
import { HistoricalChartComponent } from './currencies/components/historical-chart/historical-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    FooterComponent,
    NavbarComponent,
    CurrencyPanelComponent,
    CurrencyDetailsPageComponent,
    PopularCurrenciesComponent,
    HomeCurrencyPanelComponent,
    HistoricalChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AppService,
    AppService,
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitializer: AppService) => () => appInitializer.initializeApp().subscribe(),
      multi: true,
      deps: [AppService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
