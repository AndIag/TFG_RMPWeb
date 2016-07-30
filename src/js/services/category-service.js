angular.module('RestMaPla')
    .service('CategoryService', ['$http', '$q', CategoryService]);

var host = 'http://localhost:9090/restmapla'

function CategoryService($http, $q) {
    return {
        getCategories: function(){
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http({
                method: 'GET',
                url: host + '/categories'
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
                url: host + '/categories/' + categoryId
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
                url: host + '/categories',
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
                url: host + '/categories/' + cid,
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
