angular.module('RestMaPla.brand.controller', ['ngFlash', 'RestMaPla.common-services'])
    .controller('BrandDetailsCtrl', ['$scope', '$stateParams', '$translate', 'Flash', 'BreadCrumbService', 'CrudService', 'ProductService', 'PaginationService',
        function ($scope, $stateParams, $translate, Flash, BreadCrumbService, CrudService, ProductService, PaginationService) {
            $scope.pagination = PaginationService.data;

            $scope.brand = $stateParams.brand;
            $scope.values = CrudService.response;

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($stateParams.brand.name);
                findBrandDetails(1);
            };

            $scope.changePage = function (newPage, oldPage) {
                findBrandDetails(newPage);
            };

            $scope.searchByName = function () {
                $scope.isSearching = $scope.searchKeywords && $scope.searchKeywords.length;
                ProductService.searchProduct($scope.searchKeywords, null, $scope.brand.id, null, null,
                    (PaginationService.data.currentPage - 1), PaginationService.data.itemsPerPage).success(function (data) {

                    CrudService.response.products = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            };

            $scope.saveItem = function (form) {
                if (!form.$error.hasOwnProperty("required")) {
                    CrudService.updateItem(CrudService.endpoints.BRANDS_ENDPOINT, $scope.brand.id, $scope.brand).success(function (data) {

                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.updating'), 3000);
                    });
                }
            };

            $scope.removeProduct = function (product) {
                //TODO fix supplier dependency
                CrudService.removeItem(CrudService.endpoints.PRODUCTS_ENDPOINT, product.id).success(function (data) {
                    CrudService.response.products.items = CrudService.response.products.items.filter(function (e) {
                        return e.id !== product.id;
                    });
                    CrudService.response.products.count = CrudService.response.products.count - 1;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.removing'), 3000);
                });
            };

            function findBrandDetails(page) {
                PaginationService.data.currentPage = page;
                CrudService.findItemDetailsById(CrudService.endpoints.BRANDS_ENDPOINT, $scope.brand.id,
                    (page - 1), PaginationService.data.itemsPerPage).success(function (data) {

                    var json = JSON.parse(JSON.stringify(data));
                    $scope.brand = json.item;
                    CrudService.response.products = json.products;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

        }]);
