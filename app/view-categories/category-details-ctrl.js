angular.module('RestMaPla.category.controller', ['ngFlash', 'ngDialog', 'RestMaPla.common-services'])
    .controller('CategoryDetailsCtrl', ['$scope', '$state', '$stateParams', '$translate', 'Flash', 'ngDialog',
        'BreadCrumbService', 'CrudService', 'ProductService', 'PaginationService', 'FormValidators',
        function ($scope, $state, $stateParams, $translate, Flash, ngDialog,
                  BreadCrumbService, CrudService, ProductService, PaginationService, FormValidators) {

            $scope.pagination = PaginationService.data;

            $scope.category = $stateParams.category;
            $scope.values = CrudService.response;

            var dialog = null;

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($stateParams.category.name);
                findCategoryDetails(1);
            };

            $scope.changePage = function (newPage, oldPage) {
                findCategoryDetails(newPage);
            };

            $scope.searchByName = function () {
                $scope.isSearching = $scope.searchKeywords && $scope.searchKeywords.length;
                ProductService.searchProduct($scope.searchKeywords, $scope.category.id, null, null, null,
                    (PaginationService.data.currentPage - 1), PaginationService.data.itemsPerPage).success(function (data) {

                    CrudService.response.products = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            };

            $scope.saveItem = function (form) {
                if (!form.$error.hasOwnProperty("required")) {
                    CrudService.updateItem(CrudService.endpoints.CATEGORIES_ENDPOINT, $scope.category.id, $scope.category).success(function (data) {

                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.updating'), 3000);
                    });
                }
            };

            $scope.showCreate = function () {
                $scope.isCategoryForm = true;
                $scope.product = {};
                if (!CrudService.response.hasOwnProperty("categories")) loadCategories();
                if (!CrudService.response.hasOwnProperty("brands")) loadBrands();
                dialog = ngDialog.open({template: 'view-products/add-form.html', scope: $scope, controller: this});
            };

            $scope.saveProduct = function (form) {
                $scope.product.category = $scope.category;
                if (($scope.errors = FormValidators.isValidProduct($scope.product, form)) === {}) {
                    CrudService.createItem(CrudService.endpoints.PRODUCTS_ENDPOINT, $scope.product).success(function (data) {
                        $scope.values.products.items.push(data);
                        $scope.values.products.count = $scope.values.products.count + 1;
                        dialog.close();
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.adding'), 3000);
                    });
                }
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

            function findCategoryDetails(page) {
                PaginationService.data.currentPage = page;
                CrudService.findPaginatedItemDetailsById(CrudService.endpoints.CATEGORIES_ENDPOINT, $scope.category.id,
                    (page - 1), PaginationService.data.itemsPerPage).success(function (data) {

                    var json = JSON.parse(JSON.stringify(data));
                    $scope.category = json.item;
                    CrudService.response.products = json.products;
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
