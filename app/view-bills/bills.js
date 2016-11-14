'use strict';

angular.module('RestMaPla.bills', ['ngRoute', 'RestMaPla.bills.controller', 'RestMaPla.bill.controller'])

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
                'headerContent': {
                    templateUrl: 'view-bills/details-header.html',
                    controller: 'BillDetailsCtrl'
                }, 'mainContent': {
                    templateUrl: 'view-bills/details-main.html',
                    controller: 'BillDetailsCtrl'
                }
            }
        });
    }]);