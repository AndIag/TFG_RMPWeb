'use strict';

var myApp = angular.module('RestMaPla', ['ui.bootstrap',
    'ui.router', 'ngCookies', 'ngSanitize', 'ngFlash',
    'angularUtils.directives.dirPagination',
    'pascalprecht.translate',// angular-translate
    'tmh.dynamicLocale'// angular-dynamic-locale
]);

// myApp.endpoint = 'http://52.210.10.240/restmapla';
myApp.endpoint = 'http://localhost:9090/restmapla';

myApp.ALERTS_ENDPOINT = "/alerts";
myApp.BRANDS_ENDPOINT = "/brands";
myApp.CATEGORIES_ENDPOINT = "/categories";
myApp.DASHBOARD_ENDPOINT = "/dashboard";
myApp.MENUS_ENDPOINT = "/menus";
myApp.PRODUCTS_ENDPOINT = "/products";
myApp.SUPPLIERS_ENDPOINT = "/suppliers";
myApp.EMPLOYEES_ENDPOINT = "/employees";


myApp.constant('LOCALES', {
    'locales': {
        'en_GB': 'English',
        'es_ES': 'Español'
    },
    'preferredLocale': 'en_GB'
});
