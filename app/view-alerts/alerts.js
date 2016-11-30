'use strict';

angular.module('RestMaPla.alerts', ['ngRoute', 'RestMaPla.alerts.controller'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('alerts', {
            url: '/alerts',
            views: {
                'headerContent': {
                    templateUrl: 'view-alerts/header.html',
                    controller: 'AlertCtrl'
                },
                'mainContent': {
                    templateUrl: 'view-alerts/main.html',
                    controller: 'AlertCtrl'
                }
            }
        });
    }]);