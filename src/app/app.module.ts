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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    FooterComponent,
    NavbarComponent,
    CurrencyPanelComponent,
    CurrencyDetailsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
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
