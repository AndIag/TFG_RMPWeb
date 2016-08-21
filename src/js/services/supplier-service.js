myApp.service('SupplierService', ['$http', '$q',
    function BrandService($http, $q) {
        return{
            getSuppliers: function(pageNumber, count){
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'GET',
                    url: myApp.endpoint + '/suppliers?pageNumber='+pageNumber+'&count='+count
                }).then(function successCallback(response) {
                    deferred.resolve(response.data); //Send response data (token) to controller
                  }, function errorCallback(response) {
                    deferred.reject(response);
                  });

                promise.success = function(fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function(fn) {
                    promise.then(null, fn);
                    return promise;
                };

                return promise;
            }, removeSupplier: function(supplierId){
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'DELETE',
                    url: myApp.endpoint + '/suppliers/' + supplierId
                }).then(function successCallback(response) {
                    deferred.resolve(response.data); //Send response data (token) to controller
                  }, function errorCallback(response) {
                    deferred.reject(response);
                  });

                promise.success = function(fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function(fn) {
                    promise.then(null, fn);
                    return promise;
                };

                return promise;
            }, createSupplier: function(n, u, v){
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'POST',
                    url: myApp.endpoint + '/suppliers',
                    data: {
                        name: n,
                        url: u,
                        vat: v
                    }
                }).then(function successCallback(response) {
                    deferred.resolve(response.data); //Send response data (token) to controller
                  }, function errorCallback(response) {
                    deferred.reject(response);
                  });

                promise.success = function(fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function(fn) {
                    promise.then(null, fn);
                    return promise;
                };

                return promise;
            }, updateSupplier: function(cid, n, u, v){
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'PUT',
                    url: myApp.endpoint + '/suppliers/' + cid,
                    data: {
                        id: cid,
                        name: n,
                        url: u,
                        vat: v
                    }
                }).then(function successCallback(response) {
                    deferred.resolve(response.data); //Send response data (token) to controller
                  }, function errorCallback(response) {
                    deferred.reject(response);
                  });

                promise.success = function(fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function(fn) {
                    promise.then(null, fn);
                    return promise;
                };

                return promise;
            }
        };
    }
]);
