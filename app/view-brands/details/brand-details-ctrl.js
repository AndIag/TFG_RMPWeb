angular.module('RestMaPla.brand.controller', ['ngFlash', 'ngDialog', 'RestMaPla.common'])
    .controller('BrandDetailsCtrl', ['$scope', '$stateParams', '$translate', 'Flash', 'ngDialog',
        'BreadCrumbService', 'CrudService', 'ProductService', 'PaginationService', 'FormValidators',
        /**
         *
         * @param $scope @link(https://docs.angularjs.org/guide/scope)
         * @param $stateParams @link(https://github.com/angular-ui/ui-router/wiki)
         * @param $translate @link(https://github.com/angular-translate/angular-translate)
         * @param Flash -- Used for error feedback @link(https://github.com/sachinchoolur/angular-flash)
         * @param ngDialog -- Used in add forms @link(https://github.com/likeastore/ngDialog)
         * @param BreadCrumbService -- Handles page Breadcrumbs @link(common/breadcrumb-service.js)
         * @param CrudService -- Handles basic CRUD operations @link(common/crud-service.js)
         * @param ProductService -- Handles harder queries as product filter @link(view-products/product-service.js)
         * @param PaginationService -- Contains pagination variables @link(common/pagination.js)
         * @param FormValidators -- Contains validation logic @link(common/form-validator.js)
         */
            function ($scope, $stateParams, $translate, Flash, ngDialog,
                      BreadCrumbService, CrudService, ProductService, PaginationService, FormValidators) {

            var dialog = null;

            $scope.pagination = PaginationService.data;
            //Define legend to redefine add-form default
            $scope.legend = $translate.instant("action.modify") + ' ' + $translate.instant("word.brand");
            $scope.brand = $stateParams.brand;
            $scope.values = CrudService.response;

            /**
             * First data load on page selected. Loading page 1
             */
            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($stateParams.brand.name);
                findBrandDetails(1);
            };

            /**
             * Load a new products page
             * @param newPage given by dir-pagination-controls directive
             * @param oldPage given by dir-pagination-controls directive
             */
            $scope.changePage = function (newPage, oldPage) {
                findBrandDetails(newPage);
            };

            /**
             * Use $scope.searchKeywords and $scope.category.id to find categories
             */
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

            /**
             * Called on submit button click to update given object
             * @param form TODO use for validation
             */
            $scope.saveItem = function (form) {
                if (!form.$error.hasOwnProperty("required")) {
                    CrudService.updateItem(CrudService.endpoints.BRANDS_ENDPOINT, $scope.brand.id, $scope.brand).success(function (data) {

                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.updating'), 3000);
                    });
                }
            };

            /**
             * Open new add dialog using the provided template and @this as controller
             */
            $scope.showCreate = function () {
                $scope.isBrandForm = true;
                $scope.product = {};
                if (!CrudService.response.hasOwnProperty("categories")) loadCategories();
                dialog = ngDialog.open({template: 'view-products/add-form.html', scope: $scope, controller: this});
            };

            /**
             * Try to post new product($scope.product) after validation
             * @param form TODO use for validation
             */
            $scope.saveProduct = function (form) {
                $scope.product.brand = $scope.brand;
                $scope.product.simple = !$scope.product.isPack;
                $scope.errors = FormValidators.isValidProduct($scope.product, form);
                if (Object.keys($scope.errors).length === 0) {
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

            /**
             * Load new products page for given brand
             * @param page page to load
             */
            function findBrandDetails(page) {
                PaginationService.data.currentPage = page;
                CrudService.findPaginatedItemDetailsById(CrudService.endpoints.BRANDS_ENDPOINT, $scope.brand.id,
                    (page - 1), PaginationService.data.itemsPerPage).success(function (data) {

                    var json = JSON.parse(JSON.stringify(data));
                    $scope.brand = json.item;
                    CrudService.response.products = json.products;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

            // USED IN ADD PRODUCT DIALOG TODO move to ... common?¿
            /**
             * Load list of categories for add product dialog
             */
            function loadCategories() {
                CrudService.getItems(CrudService.endpoints.CATEGORIES_ENDPOINT).success(function (data) {
                    CrudService.response.categories = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

        }]);
