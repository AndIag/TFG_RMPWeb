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
                    templateUrl: 'view-suppliers/details/header.html',
                    controller: 'SupplierDetailsCtrl'
                }, 'mainContent': {
                    templateUrl: 'view-suppliers/details/main.html',
                    controller: 'SupplierDetailsCtrl'
                }
            }
        });
    }]).service('SupplierService', ['CrudService', '$http', '$q',
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
            }
        }
    }]);