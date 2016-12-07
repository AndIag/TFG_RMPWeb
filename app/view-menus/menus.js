'use strict';

angular.module('RestMaPla.menus', ['ngRoute', 'RestMaPla.menus.controller', 'RestMaPla.menu.controller'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('menus', {
            url: '/menus',
            views: {
                'headerContent': {
                    templateUrl: 'view-menus/header.html',
                    controller: 'MenuCtrl'
                },
                'mainContent': {
                    templateUrl: 'view-menus/main.html',
                    controller: 'MenuCtrl'
                }
            }
        }).state('menu-details', {
            url: '/menus/:menuId',
            params: {menu: null},
            views: {
                'headerContent': {
                    templateUrl: 'view-menus/details/header.html',
                    controller: 'MenuDetailsCtrl'
                }, 'mainContent': {
                    templateUrl: 'view-menus/details/main.html',
                    controller: 'MenuDetailsCtrl'
                }
            }
        });
    }]);