'use strict';

angular.module('RestMaPla.employees', ['ngRoute', 'RestMaPla.employees.controller'])

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
        });
    }]);