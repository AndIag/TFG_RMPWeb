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

            var append = '';

            (categoryId != null) ? append = append + '&category=' + categoryId : null;
            (brandId != null) ? append = append + '&brand=' + brandId : null;
            (isSimple != null) ? append = append + '&isSimple=' + isSimple : null;

            $http({
                method: 'GET',
                url: host + '/products/search?keywords=' + keywords + append
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
        }, createProduct: function(product){
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http({
                method: 'POST',
                url: host + '/products',
                data: product
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
