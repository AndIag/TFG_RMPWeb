'use strict';

angular.module('RestMaPla.categories', ['ngRoute', 'RestMaPla.category.controller', 'RestMaPla.categories.controller', 'RestMaPla.product.service'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('categories', {
            url: '/categories',
            views: {
                'headerContent': {
                    templateUrl: 'view-categories/header.html',
                    controller: 'CategoryCtrl'
                },
                'mainContent': {
                    templateUrl: 'view-categories/main.html',
                    controller: 'CategoryCtrl'
                }
            }
        }).state('category-details', {
            url: '/categories/:categoryId',
            params: {category: null},
            views: {
                'headerContent': {
                    templateUrl: 'view-categories/details-header.html',
                    controller: 'CategoryDetailsCtrl'
                }, 'mainContent': {
                    templateUrl: 'view-categories/details-main.html',
                    controller: 'CategoryDetailsCtrl'
                }
            }
        });
    }]);