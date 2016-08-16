myApp.service('ProductService', ['$http', '$q', ProductService]);

function ProductService($http, $q) {
    return {
        removeProduct: function(productId){
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http({
                method: 'DELETE',
                url: myApp.endpoint + '/products/' + productId
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
                url: myApp.endpoint + '/products/search?keywords=' + keywords + append
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
                url: myApp.endpoint + '/products',
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
        }, getProducts: function(pageNumber, count){
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http({
                method: 'GET',
                url: myApp.endpoint + '/products?pageNumber='+pageNumber+'&count='+count
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
