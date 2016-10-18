myApp.service('AlertService', ['$http', '$q',
    function ($http, $q) {
        return {
            markAsRead: function (alert) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                console.log(alert);

                $http({
                    method: 'PUT',
                    url: myApp.endpoint + myApp.ALERTS_ENDPOINT + '/' + alert.id
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
