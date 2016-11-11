'use strict';

angular.module('RestMaPla.bills', ['ngRoute', 'RestMaPla.bills.controller'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('bills', {
            url: '/bills',
            views: {
                'headerContent': {
                    templateUrl: 'view-bills/header.html',
                    controller: 'BillCtrl'
                },
                'mainContent': {
                    templateUrl: 'view-bills/main.html',
                    controller: 'BillCtrl'
                }
            }
        }).state('bill-details', {
            url: '/bills/:billId',
            params: {bill: null},
            views: {
                // 'headerContent': {
                //     templateUrl: 'view-brands/details-header.html',
                //     controller: 'BrandDetailsCtrl'
                // }, 'mainContent': {
                //     templateUrl: 'view-brands/details-main.html',
                //     controller: 'BrandDetailsCtrl'
                // }
            }
        });
    }]);