/**
 * Created by Canalejas on 24/09/2016.
 */


myApp.service('CrudService', ['$http', '$q',

    function ($http, $q) {
        return {
            getItems: function (path) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'GET',
                    url: myApp.endpoint + path
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
            }, getPaginatedItems: function (path, pageNumber, count) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'GET',
                    url: myApp.endpoint + path + '?pageNumber=' + pageNumber + '&count=' + count
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
            }, findItemsByName: function (path, keywords) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'GET',
                    url: myApp.endpoint + path + '/search?keywords=' + keywords
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
            }, findPaginatedItemsByName: function (path, keywords, pageNumber, count) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'GET',
                    url: myApp.endpoint + path + '/search?keywords=' + keywords + '&pageNumber=' + pageNumber + '&count=' + count
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
            }, findItemById: function (path, itemId) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'GET',
                    url: myApp.endpoint + path + '/' + itemId
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
            }, removeItem: function (path, itemId) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'DELETE',
                    url: myApp.endpoint + path + '/' + itemId
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
            }, createItem: function (path, data) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'POST',
                    url: myApp.endpoint + path,
                    data: data
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
            }, updateItem: function (path, itemId, data) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'PUT',
                    url: myApp.endpoint + path + '/' + itemId,
                    data: data
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
        }
    }

]);
