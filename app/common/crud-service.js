'use strict';

angular.module('RestMaPla.service.crud', [])

    .service('CrudService', ['$http', '$q', function ($http, $q) {
        var ENDPOINT = 'http://localhost:9090/restmapla';
        // var ENDPOINT = 'http://52.210.10.240/restmapla';

        return {
            ENDPOINT: ENDPOINT, //Custom services use this so we need to expose it
            endpoints: { //Expose all implemented endpoints
                ALERTS_ENDPOINT: "/alerts",
                BRANDS_ENDPOINT: "/brands",
                CATEGORIES_ENDPOINT: "/categories",
                DASHBOARD_ENDPOINT: "/dashboard",
                MENUS_ENDPOINT: "/menus",
                PRODUCTS_ENDPOINT: "/products",
                SUPPLIERS_ENDPOINT: "/suppliers",
                EMPLOYEES_ENDPOINT: "/employees",
                BILLS_ENDPOINT: "/bills",
                TABLES_ENDPOINT: "/tables",
                ORDERS_ENDPOINT: "/orders"
            },
            response: {}, //Saved data
            /**
             * Load non-paginated objects by given endpoint
             * @param path given endpoint
             */
            getItems: function (path) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'GET',
                    url: ENDPOINT + path
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
            },
            /**
             * Load paginated objects by given endpoint
             * @param path given endpoint
             * @param pageNumber page to load
             * @param count number of elements to load
             */
            getPaginatedItems: function (path, pageNumber, count) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'GET',
                    url: ENDPOINT + path + '?pageNumber=' + pageNumber + '&count=' + count
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
            },
            /**
             * Find objects by keywords
             * @param path given endpoint
             * @param keywords to search
             */
            findItemsByName: function (path, keywords) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'GET',
                    url: ENDPOINT + path + '/search?keywords=' + keywords
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
            },
            /**
             * Load non paginated object details by given id
             * @param path given endpoint
             * @param itemId given id
             */
            findItemDetailsById: function (path, itemId) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'GET',
                    url: ENDPOINT + path + '/' + itemId
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
            },
            /**
             * Load object details with paged inner objects by given id
             * @param path given endpoint
             * @param itemId given id
             * @param pageNumber page to load
             * @param count number of elements to load
             */
            findPaginatedItemDetailsById: function (path, itemId, pageNumber, count) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'GET',
                    url: ENDPOINT + path + '/' + itemId + '?pageNumber=' + pageNumber + '&count=' + count
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
            },
            /**
             * Delete object by given id
             * @param path given endpoint
             * @param itemId given id
             */
            removeItem: function (path, itemId) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'DELETE',
                    url: ENDPOINT + path + '/' + itemId
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
            },
            /**
             * Post given data to create new object
             * @param path given endpoint
             * @param data given object to create
             */
            createItem: function (path, data) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                $http({
                    method: 'POST',
                    url: ENDPOINT + path,
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
            },
            /**
             * Try to update object data by given id
             * @param path given endpoint
             * @param itemId given id
             * @param data new object data
             */
            updateItem: function (path, itemId, data) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http({
                    method: 'PUT',
                    url: ENDPOINT + path + '/' + itemId,
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
