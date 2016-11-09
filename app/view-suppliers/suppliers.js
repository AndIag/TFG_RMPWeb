'use strict';

angular.module('RestMaPla.suppliers', ['ngRoute', 'RestMaPla.suppliers.controller'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('suppliers', {
            url: '/suppliers',
            views: {
                'headerContent': {
                    templateUrl: 'view-suppliers/header.html',
                    controller: 'SupplierCtrl'
                },
                'mainContent': {
                    templateUrl: 'view-suppliers/main.html',
                    controller: 'SupplierCtrl'
                }
            }
        }).state('supplier-details', {
            url: '/suppliers/:supplierId',
            params: {supplier: null},
            views: {
                // 'headerContent': {
                //     templateUrl: 'view-categories/details-header.html',
                //     controller: 'CategoryDetailsCtrl'
                // }, 'mainContent': {
                //     templateUrl: 'view-categories/details-main.html',
                //     controller: 'CategoryDetailsCtrl'
                // }
            }
        });
    }]);