angular.module('RestMaPla.products.controller', ['ngFlash', 'ngDialog', 'RestMaPla.common-services'])
    .controller('ProductCtrl', ['$scope', '$translate', 'Flash', 'ngDialog', 'BreadCrumbService', 'CrudService', 'PaginationService',
        function ($scope, $translate, Flash, ngDialog, BreadCrumbService, CrudService, PaginationService) {
            $scope.pagination = PaginationService.data;
            $scope.values = CrudService.response;

            var dialog = null;

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($translate.instant('views.index.products'));
                getProductsPage(1);
            };

            $scope.changePage = function (newPage, oldPage) {
                getProductsPage(newPage);
            };

            $scope.searchByName = function () {
                $scope.isSearching = $scope.searchKeywords && $scope.searchKeywords.length;
                CrudService.findItemsByName(CrudService.endpoints.PRODUCTS_ENDPOINT, $scope.searchKeywords).success(function (data) {
                    CrudService.response.products = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            };

            $scope.showCreate = function () {
                $scope.product = {};
                if (!CrudService.response.hasOwnProperty("categories")) loadCategories();
                if (!CrudService.response.hasOwnProperty("brands")) loadBrands();
                dialog = ngDialog.open({template: 'view-products/add-form.html', scope: $scope, controller: this});
            };

            $scope.removeProduct = function (product) {
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

            function getProductsPage(page) {
                PaginationService.data.currentPage = page;
                CrudService.getPaginatedItems(CrudService.endpoints.PRODUCTS_ENDPOINT, (page - 1),
                    PaginationService.data.itemsPerPage).success(function (data) {

                    CrudService.response.products = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

            // USED IN ADD PRODUCT DIALOG

            $scope.searchBrand = function () {
                CrudService.findItemsByName(CrudService.endpoints.BRANDS_ENDPOINT, $scope.product.brand).success(function (data) {
                    CrudService.response.brands = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            };

            function loadCategories() {
                CrudService.getItems(CrudService.endpoints.CATEGORIES_ENDPOINT).success(function (data) {
                    CrudService.response.categories = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

            function loadBrands() {
                CrudService.getItems(CrudService.endpoints.BRANDS_ENDPOINT).success(function (data) {
                    CrudService.response.brands = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

        }]);
