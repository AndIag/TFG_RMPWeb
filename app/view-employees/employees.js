'use strict';

angular.module('RestMaPla.employees', ['ngRoute', 'RestMaPla.employees.controller', 'RestMaPla.product.service'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('employees', {
            url: '/employees',
            views: {
                'headerContent': {
                    templateUrl: 'view-employees/header.html',
                    controller: 'EmployeeCtrl'
                },
                'mainContent': {
                    templateUrl: 'view-employees/main.html',
                    controller: 'EmployeeCtrl'
                }
            }
        }).state('employee-details', {
            url: '/employees/:employeeId',
            params: {employee: null},
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