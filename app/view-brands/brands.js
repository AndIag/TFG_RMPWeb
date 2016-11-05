'use strict';

angular.module('RestMaPla.brands', ['ngRoute', 'RestMaPla.brands.controller'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('brands', {
            url: '/brands',
            views: {
                'headerContent': {
                    templateUrl: 'view-brands/header.html',
                    controller: 'BrandCtrl'
                },
                'mainContent': {
                    templateUrl: 'view-brands/main.html',
                    controller: 'BrandCtrl'
                }
            }
        }).state('brand-details', {
            url: '/brands/:brandId',
            params: {brand: null},
            views: {
                'headerContent': {},
                'mainContent': {},
                'footerContent': {}
            }
        });
    }]);