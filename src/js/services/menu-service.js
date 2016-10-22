myApp.service('MenuService', ['$http', '$q',
    function ($http, $q) {
        return {
            menuParts: {
                starters: "/starters",
                drinks: "/drinks",
                mains: "/mains",
                desserts: "/desserts"
            },
            addParts: {
                0: "/drinks/",
                1: "/starters/",
                2: "/mains/",
                3: "/desserts/"
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
            }, addProductToMenu: function (menuId, productId, menuPart) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'POST',
                    url: myApp.endpoint + '/menus/' + menuId + menuPart + productId
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
