angular.module('RestMaPla.product.service', [])
    .service('ProductService', ['CrudService', '$http', '$q', function (CrudService, $http, $q) {
        var ENDPOINT = 'http://localhost:9090/restmapla';
        return {
            searchProduct: function (keywords, categoryId, brandId, pageNumber, count) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                var searchParams = '';

                if(keywords){
                    searchParams += 'keywords=' + keywords;
                }
                if(categoryId){
                    if(searchParams!==''){
                        searchParams += '&';
                    }
                    searchParams +=  'category=' + categoryId;
                }
                if(brandId){
                    if(searchParams!==''){
                        searchParams += '&';
                    }
                    searchParams +=  'brand=' + brandId;
                }
                if (searchParams === ''){
                    return CrudService.getPaginatedItems(CrudService.endpoints.PRODUCTS_ENDPOINT, pageNumber, count);
                }

                $http({
                    method: 'GET',
                    url: ENDPOINT + CrudService.endpoints.PRODUCTS_ENDPOINT + '/search?' + searchParams
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
            }
        }
    }]);
