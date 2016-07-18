
/**
 * Route configuration for the RestMaPla module.
 */
angular.module('RestMaPla').config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider) {

        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common = 'Content-Type: application/json';
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html'
            })
            .state('brands', {
                url: '/brands',
                templateUrl: 'templates/brands.html',
                controller: 'BrandCtrl'
            })
            // .state('tables', {
            //     url: '/tables',
            //     templateUrl: 'templates/tables.html'
            // });
    }
]);
