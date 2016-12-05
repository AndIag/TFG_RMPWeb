'use strict';

angular.module('RestMaPla.products', ['ngRoute', 'RestMaPla.products.controller', 'RestMaPla.product.controller'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('products', {
            url: '/products',
            views: {
                'headerContent': {
                    templateUrl: 'view-products/header.html',
                    controller: 'ProductCtrl'
                },
                'mainContent': {
                    templateUrl: 'view-products/main.html',
                    controller: 'ProductCtrl'
                }
            }
        }).state('product-details', {
            url: '/products/:productId',
            params: {product: null},
            views: {
                'headerContent': {
                    templateUrl: 'view-products/details/header.html',
                    controller: 'ProductDetailsCtrl'
                }, 'mainContent': {
                    templateUrl: 'view-products/details/main.html',
                    controller: 'ProductDetailsCtrl'
                }
            }
        });
    }]);