angular.module('RestMaPla')
    .service('BrandService', ['$http', '$q', BrandService]);

function BrandService($http, $q) {
    return {
        getBrands: function(startIndex, count){
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http({
                method: 'GET',
                url: 'http://localhost:9090/restmapla/brands?startIndex='+startIndex+'&count='+count
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
