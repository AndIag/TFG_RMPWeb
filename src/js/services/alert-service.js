myApp.service('AlertService', ['$http', '$q',
    function AlertService($http, $q) {
        return {
            getAlerts: function(){
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
            }, getDashboardInfo: function () {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'GET',
                    url: myApp.endpoint + '/dashboard'
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
