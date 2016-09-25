myApp.service('SupplierService', ['$http', '$q',
    function ($http, $q) {
        return {
            addSupplier2Product: function (productId, supplierId, price) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'POST',
                    url: myApp.endpoint + '/suppliers/' + supplierId + '/products?productId=' + productId + '&price=' + price
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
    }
]);
