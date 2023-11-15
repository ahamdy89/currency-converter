import { NgModule,APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { NavbarComponent } from './layout/components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
import { HomeModule } from './home/home.module';
import { CurrenciesModule } from './currencies/currencies.module';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    CurrenciesModule
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
