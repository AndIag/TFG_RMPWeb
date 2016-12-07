'use strict';

angular.module('RestMaPla.products', ['ngRoute', 'RestMaPla.products.controller', 'RestMaPla.product.controller'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('products', {
            url: '/products',
            views: {
                'headerContent': {
                    templateUrl: 'view-products/header.html',
                    controller: 'ProductCtrl'
                },
                'mainContent': {
                    templateUrl: 'view-products/main.html',
                    controller: 'ProductCtrl'
                }
            }
        }).state('product-details', {
            url: '/products/:productId',
            params: {product: null},
            views: {
                'headerContent': {
                    templateUrl: 'view-products/details/header.html',
                    controller: 'ProductDetailsCtrl'
                }, 'mainContent': {
                    templateUrl: 'view-products/details/main.html',
                    controller: 'ProductDetailsCtrl'
                }
            }
        });
    }]).service('ProductService', ['CrudService', '$http', '$q',
    function (CrudService, $http, $q) {
        var ENDPOINT = CrudService.ENDPOINT;

        return {
            searchProduct: function (keywords, categoryId, brandId, supplierId, billId, pageNumber, count) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                var searchParams = '';

                if (keywords) {
                    searchParams += 'keywords=' + keywords;
                }
                if (categoryId) {
                    if (searchParams !== '') {
                        searchParams += '&';
                    }
                    searchParams += 'category=' + categoryId;
                }
                if (brandId) {
                    if (searchParams !== '') {
                        searchParams += '&';
                    }
                    searchParams += 'brand=' + brandId;
                }
                if (supplierId) {
                    if (searchParams !== '') {
                        searchParams += '&';
                    }
                    searchParams += 'supplier=' + supplierId;
                }
                if (billId) {
                    if (searchParams !== '') {
                        searchParams += '&';
                    }
                    searchParams += 'bill=' + billId;
                }
                if (searchParams === '') {
                    return CrudService.getPaginatedItems(CrudService.endpoints.PRODUCTS_ENDPOINT, pageNumber, count);
                }

                $http({
                    method: 'GET',
                    url: ENDPOINT + CrudService.endpoints.PRODUCTS_ENDPOINT + '/search?' + searchParams
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
            }, searchPacks: function (keywords) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                var searchParams = 'isSimple=' + false;

                if (keywords != null) {
                    searchParams += '&keywords=' + keywords;
                }

                $http({
                    method: 'GET',
                    url: ENDPOINT + CrudService.endpoints.PRODUCTS_ENDPOINT + '/search?' + searchParams
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