myApp.service('MenuService', ['$http', '$q',
    function ($http, $q) {
        return {
            menuParts: {
                starters: "/starters",
                drinks: "/drinks",
                mains: "/mains",
                desserts: "/desserts"
            },
            getMenuParts: function (menuId, menuPart) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'GET',
                    url: myApp.endpoint + '/menus/' + menuId + menuPart
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
