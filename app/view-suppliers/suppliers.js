'use strict';

angular.module('RestMaPla.suppliers', ['ngRoute', 'RestMaPla.suppliers.controller', 'RestMaPla.supplier.controller'])

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
                'headerContent': {
                    templateUrl: 'view-suppliers/details-header.html',
                    controller: 'SupplierDetailsCtrl'
                }, 'mainContent': {
                    templateUrl: 'view-suppliers/details-main.html',
                    controller: 'SupplierDetailsCtrl'
                }
            }
        });
    }]);