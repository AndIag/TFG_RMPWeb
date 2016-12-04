angular.module('RestMaPla.table.service', [])
    .service('TableService', ['CrudService', '$http', '$q', function (CrudService, $http, $q) {
        var ENDPOINT = CrudService.ENDPOINT;

        return {
            getTableOrders: function (tableId) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'GET',
                    url: ENDPOINT + CrudService.endpoints.TABLES_ENDPOINT + '/' + tableId + '/orders'
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
