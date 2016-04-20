import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { DashboardComponent } from './dashboard.component';

@Component({
  selector: 'my-app',
  templateUrl: 'app/pages/app.component.html',
  styleUrls: ['app/styles/app.component.css',
    '../bower_components/bootstrap/dist/css/bootstrap.min.css',
    '../bower_components/metisMenu/dist/metisMenu.min.css',
    '../bower_components/morrisjs/morris.css',
    '../bower_components/font-awesome/css/font-awesome.min.css',
    '../bower_components/startbootstrap-sb-admin-2/dist/css/timeline.css',
    '../bower_components/startbootstrap-sb-admin-2/dist/css/sb-admin-2.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
  ]
})
@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
])
export class AppComponent {
  title = 'RestMaPla';
}
