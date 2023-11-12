import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-currency-details-page',
  templateUrl: './currency-details-page.component.html',
  styleUrl: './currency-details-page.component.css'
})
export class CurrencyDetailsPageComponent {
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Access the passed data from the queryParams
      console.log(params)
    });
  }
}
