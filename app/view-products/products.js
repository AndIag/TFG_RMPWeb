'use strict';

angular.module('RestMaPla.products', ['ngRoute', 'RestMaPla.products.controller', 'RestMaPla.products.controller'])

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
        });
    }]);