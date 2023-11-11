import { Component } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';
import { filter } from 'rxjs/operators';


interface NavLink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMobileView: boolean = false;
  isNavVisible: boolean = false;


  navLinks: NavLink[] = [
    { path: '/eur-usd', label: 'EUR-USD Details' },
    { path: '/eur-gbp', label: 'EUR-GBP Details' }
  ];

  currentUrl: string = '/';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkMobileView();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentUrl = this.router.url;
      console.log(this.currentUrl)
    });
  }

  checkMobileView() {
    this.isMobileView = window.innerWidth <= 768;
  }

  onResize(event: any) {
    this.isMobileView = event.target.innerWidth <= 768;
    this.isNavVisible = !this.isMobileView;
  }

  toggleNav() {
    this.isNavVisible = !this.isNavVisible;
  }
}