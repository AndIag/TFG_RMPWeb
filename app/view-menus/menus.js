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
    }]).service('MenuService', ['CrudService', '$http', '$q',
    function (CrudService, $http, $q) {
        var ENDPOINT = CrudService.ENDPOINT;
        return {
            addProduct: function (supplierId, productId, price) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                var queryParams = 'productId=' + productId + '&price=' + price;

                $http({
                    method: 'POST',
                    url: ENDPOINT + CrudService.endpoints.SUPPLIERS_ENDPOINT + '/' + supplierId + '/products?' + queryParams
                }).then(function successCallback(response) {
                    deferred.resolve(response.data);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });

                promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function (fn) {
                    promise.then(null, fn);
                    return promise;
                };

                return promise;
            }, removeProduct: function (menuId, productId) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'DELETE',
                    url: ENDPOINT + CrudService.endpoints.MENUS_ENDPOINT + '/' + menuId + '/products/' + productId
                }).then(function successCallback(response) {
                    deferred.resolve(response.data);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });

                promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function (fn) {
                    promise.then(null, fn);
                    return promise;
                };

                return promise;
            }
        }
    }]);