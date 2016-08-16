myApp.service('CategoryService', ['$http', '$q', CategoryService]);

function CategoryService($http, $q) {
    return {
        getCategories: function(){
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http({
                method: 'GET',
                url: myApp.endpoint + '/categories'
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
        }, getCategoriesByName: function(keywords){
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http({
                method: 'GET',
                url: myApp.endpoint + '/categories/search?keywords=' + keywords
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
        }, removeCategory: function(categoryId){
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http({
                method: 'DELETE',
                url: myApp.endpoint + '/categories/' + categoryId
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
        }, createCategory: function(n, u){
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http({
                method: 'POST',
                url: myApp.endpoint + '/categories',
                data: {
                    name: n,
                    url: u
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
        }, updateCategory: function(cid, n, u){
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http({
                method: 'PUT',
                url: myApp.endpoint + '/categories/' + cid,
                data: {
                    id: cid,
                    name: n,
                    url: u
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
    }
}
