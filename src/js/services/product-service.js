angular.module('RestMaPla')
    .service('ProductService', ['$http', '$q', ProductService]);

var host = 'http://localhost:9090/restmapla'

function ProductService($http, $q) {
    return {
        removeProduct: function(productId){
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http({
                method: 'DELETE',
                url: host + '/products/' + productId
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
        }, searchProducts: function(brandId, categoryId, keywords, isSimple, pageNumber, count){
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http({
                method: 'GET',
                url: host + '/products/search?keywords=' + keywords + '&brand=' + brandId + '&category=' + categoryId + '&isSimple=' + isSimple
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
    }
}
