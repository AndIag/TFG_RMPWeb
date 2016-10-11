myApp.service('AlertService', ['$http', '$q',
    function ($http, $q) {
        return {
            markAsRead: function (alert) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                console.log(alert);

                $http({
                    method: 'POST',
                    url: myApp.endpoint + myApp.ALERTS_ENDPOINT + '/view',
                    data: {alert: alert}
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
