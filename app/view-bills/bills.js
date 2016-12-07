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
                    templateUrl: 'view-bills/details/header.html',
                    controller: 'BillDetailsCtrl'
                }, 'mainContent': {
                    templateUrl: 'view-bills/details/main.html',
                    controller: 'BillDetailsCtrl'
                }
            }
        });
    }]).service('BillService', ['CrudService', '$http', '$q',
    function (CrudService, $http, $q) {
        var ENDPOINT = CrudService.ENDPOINT;
        return {
            addProduct: function (billId, productId, quantity) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                var queryParams = 'productId=' + productId + '&quantity=' + quantity;

                console.log(queryParams);

                $http({
                    method: 'POST',
                    url: ENDPOINT + CrudService.endpoints.BILLS_ENDPOINT + '/' + billId + '/products?' + queryParams
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