'use strict';

angular.module('RestMaPla.tables', ['ngRoute', 'RestMaPla.tables.controller' , 'RestMaPla.table.controller'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('tables', {
            url: '/tables',
            views: {
                'headerContent': {
                    templateUrl: 'view-tables/header.html',
                    controller: 'TableCtrl'
                },
                'mainContent': {
                    templateUrl: 'view-tables/main.html',
                    controller: 'TableCtrl'
                }
            }
        }).state('table-details', {
            url: '/tables/:tableId',
            params: {table: null},
            views: {
                'headerContent': {
                    templateUrl: 'view-tables/details-header.html',
                    controller: 'TableDetailsCtrl'
                }, 'mainContent': {
                    templateUrl: 'view-tables/details-main.html',
                    controller: 'TableDetailsCtrl'
                }
            }
        });
    }]);
