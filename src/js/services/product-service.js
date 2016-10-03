myApp.service('ProductService', ['$http', '$q',
    function ($http, $q) {
        return {
            searchProducts: function (keywords, brandId, categoryId, isSimple, pageNumber, count) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                var append = '';

                append = append + ((categoryId != null) ? ('&category=' + categoryId) : '');
                append = append + ((brandId != null) ? ('&brand=' + brandId) : '');
                append = append + ((isSimple != null) ? ('&isSimple=' + isSimple) : '');

                $http({
                    method: 'GET',
                    url: myApp.endpoint + '/products/search?keywords=' + keywords + append
                }).then(function successCallback(response) {
                    deferred.resolve(response.data); //Send response data (token) to controller
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
            }, findProductsByBrand: function (brandId, pageNumber, count) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'GET',
                    url: myApp.endpoint + '/brands/' + brandId + '/products?pageNumber=' + pageNumber + '&count=' + count
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
            }, findProductsBySupplier: function (supplierId) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'GET',
                    url: myApp.endpoint + '/products/search?supplier=' + supplierId
                }).then(function successCallback(response) {
                    deferred.resolve(response.data); //Send response data (token) to controller
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
        };
    }
]);
