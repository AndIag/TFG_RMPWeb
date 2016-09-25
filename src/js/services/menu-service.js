myApp.service('MenuService', ['$http', '$q',
    function ($http, $q) {
        return {
            getStarters: function (mid) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'GET',
                    url: myApp.endpoint + '/menus/' + mid + '/starters'
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
            }, getDrinks: function (mid) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'GET',
                    url: myApp.endpoint + '/menus/' + mid + '/drinks'
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
            }, getMains: function (mid) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'GET',
                    url: myApp.endpoint + '/menus/' + mid + '/mains'
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
            }, getDesserts: function (mid) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'GET',
                    url: myApp.endpoint + '/menus/' + mid + '/desserts'
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
