import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CurrencyDetailsPageComponent } from './currencies/currency-details-page/currency-details-page.component';

const routes: Routes = [
  { path: 'details', component: CurrencyDetailsPageComponent },
  { path: '', component: HomeComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
