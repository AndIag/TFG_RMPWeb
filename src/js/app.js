'use strict';

var myApp = angular.module('RestMaPla', [   'ui.bootstrap',
                                'ui.router',
                                'ngCookies',
                                'ngSanitize',
                                'ngFlash',
                                'angular-advanced-searchbox',
                                'angularUtils.directives.dirPagination',
                                'pascalprecht.translate',// angular-translate
                                'tmh.dynamicLocale'// angular-dynamic-locale
                            ])

myApp.endpoint = 'http://52.210.10.240/restmapla';
// myApp.endpoint = 'http://52.210.10.240/restmapla';


myApp.constant('LOCALES', {
    'locales': {
        'en_GB': 'English',
        'es_ES': 'Español'
    },
    'preferredLocale': 'es_ES'
});
