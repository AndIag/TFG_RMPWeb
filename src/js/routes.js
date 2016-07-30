
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
                templateUrl: 'resources/templates/dashboard.html'
            })
            .state('brands', {
                url: '/brands',
                templateUrl: 'resources/templates/brands.html',
                controller: 'BrandCtrl'
            })
            .state('categories', {
                url: '/categories',
                templateUrl: 'resources/templates/categories.html',
                controller: 'CategoryCtrl'
            })
            .state('brand-details', {
                url: '/brands/:brandId',
                templateUrl: 'resources/templates/brand-details.html',
                controller: 'BrandCtrl'
            })
    }
]);
