'use strict';

// Declare app level module which depends on views, and components
angular.module('RestMaPla', ['ui.bootstrap', 'ui.router', 'RestMaPla.version', 'RestMaPla.i18n',
    'RestMaPla.frame', 'RestMaPla.dashboard'])

    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider) {

            $httpProvider.defaults.useXDomain = true;
            $httpProvider.defaults.headers.common = 'Content-Type: application/json';
            delete $httpProvider.defaults.headers.common['X-Requested-With'];

            // For unmatched routes
            $urlRouterProvider.otherwise('/');

        }
    ]).constant('LOCALES', {
    'locales': {
        'en_GB': 'English',
        'es_ES': 'Español'
    },
    'preferredLocale': 'en_GB'
});
