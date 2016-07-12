
/**
 * Route configuration for the RestMaPla module.
 */
angular.module('RestMaPla').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

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
