
/**
 * Route configuration for the RestMaPla module.
 */
myApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
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
                controller: 'BrandDetailsCtrl'
            })
            .state('products', {
                url: '/products',
                templateUrl: 'resources/templates/products.html',
                controller: 'ProductCtrl'
            })
            .state('product-details', {
                url: '/products/:productId',
                templateUrl: 'resources/templates/product-details.html',
                controller: 'ProductDetailsCtrl'
            })
            .state('suppliers', {
                url: '/suppliers',
                templateUrl: 'resources/templates/suppliers.html',
                controller: 'SupplierCtrl'
            })
            .state('menus', {
                url: '/menus',
                templateUrl: 'resources/templates/menus.html',
                controller: 'MenuCtrl'
            })
    }
]);
