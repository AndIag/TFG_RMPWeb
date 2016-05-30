import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { DashboardComponent } from './dashboard.component';
import { BrandsComponent } from './brands.component';

@Component({
  selector: 'my-app',
  templateUrl: 'app/pages/app.component.html',
  styleUrls: ['app/styles/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
  ]
})
@RouteConfig([
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },{
    path: '/brands',
    name: 'Brands',
    component: BrandsComponent,
  },{
    path: '/brands',
    name: 'Brands',
    component: DashboardComponent,
  },
])
export class AppComponent {
  title = 'RestMaPla';
}
