'use strict';

angular.module('RestMaPla.brands', ['ngRoute', 'RestMaPla.brands.controller', 'RestMaPla.brand.controller'])

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
                'headerContent': {
                    templateUrl: 'view-brands/details-header.html',
                    controller: 'BrandDetailsCtrl'
                }, 'mainContent': {
                    templateUrl: 'view-brands/details-main.html',
                    controller: 'BrandDetailsCtrl'
                }, 'footerContent': {
                    templateUrl: 'view-brands/details-footer.html',
                    controller: 'BrandDetailsCtrl'
                }
            }
        });
    }]);