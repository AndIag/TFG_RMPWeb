angular.module('RestMaPla.supplier.controller', ['ngFlash', 'ngDialog', 'RestMaPla.common'])
    .controller('SupplierDetailsCtrl', ['$scope', '$stateParams', '$translate', 'Flash', 'ngDialog',
        'BreadCrumbService', 'CrudService', 'ProductService', 'PaginationService', 'SupplierService',
        'FormValidators',
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
         * @param SupplierService
         * @param FormValidators
         */
            function ($scope, $stateParams, $translate, Flash, ngDialog, BreadCrumbService, CrudService,
                      ProductService, PaginationService, SupplierService, FormValidators) {

            var dialog = null;
            $scope.pagination = PaginationService.data;
            $scope.supplier = $stateParams.supplier;
            $scope.values = CrudService.response;
            $scope.legend = $translate.instant("action.modify") + ' ' + $translate.instant("word.supplier");
            $scope.isDetailsForm = true;

            /**
             * First data load on page selected. Loading page 1
             */
            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($stateParams.supplier.name);
                findSupplierDetails(1);
            };

            /**
             * Load a new products page
             * @param newPage given by dir-pagination-controls directive
             * @param oldPage given by dir-pagination-controls directive
             */
            $scope.changePage = function (newPage, oldPage) {
                findSupplierDetails(newPage);
            };

            /**
             * Use $scope.searchKeywords and $scope.supplier.id to find products
             */
            $scope.searchByName = function () {
                $scope.isSearching = $scope.searchKeywords && $scope.searchKeywords.length;
                ProductService.searchProduct($scope.searchKeywords, null, null, $scope.supplier.id, null,
                    (PaginationService.data.currentPage - 1), PaginationService.data.itemsPerPage).success(function (data) {

                    CrudService.response.products = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            };

            $scope.showCreate = function () {
                $scope.product = {};
                loadProducts(null);
                dialog = ngDialog.open({
                    template: 'view-suppliers/details/add/dialog.html',
                    scope: $scope,
                    controller: this
                });
            };

            $scope.searchProducts = function () {
                loadProducts($scope.product.newProduct);
            };

            /**
             * Try to post new product($scope.product) after validation
             * @param form TODO use for validation
             */
            $scope.saveItem = function (form) {
                $scope.errors = FormValidators.isValidProductForSupplier($scope.product, form);
                if (Object.keys($scope.errors).length === 0) {
                    SupplierService.addProduct($scope.supplier.id, $scope.product.newProduct.id, $scope.product.price).success(function (data) {
                        CrudService.response.products = JSON.parse(JSON.stringify(data)).products;
                        dialog.close();
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.adding'), 3000);
                    });
                }
            };

            $scope.addMore = function (form) {
                $scope.errors = FormValidators.isValidProductForSupplier($scope.product, form);
                if (Object.keys($scope.errors).length === 0) {
                    SupplierService.addProduct($scope.supplier.id, $scope.product.newProduct.id, $scope.product.price).success(function (data) {
                        CrudService.response.products = JSON.parse(JSON.stringify(data)).products;
                        dialog.close();
                        $scope.product = {};
                        loadProducts(null);
                        dialog = ngDialog.open({
                            template: 'view-suppliers/details/add/dialog.html',
                            scope: $scope,
                            controller: this
                        });
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.adding'), 3000);
                    });
                }
            };

            /**
             * Load new products page for given supplier
             * @param page page to load
             */
            function findSupplierDetails(page) {
                PaginationService.data.currentPage = page;
                CrudService.findPaginatedItemDetailsById(CrudService.endpoints.SUPPLIERS_ENDPOINT, $scope.supplier.id,
                    (page - 1), PaginationService.data.itemsPerPage).success(function (data) {

                    CrudService.response.products = JSON.parse(JSON.stringify(data)).products;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

            /**
             * Load first list of brands for add product dialog
             */
            function loadProducts(keywords) {
                ProductService.searchPacks(keywords).success(function (data) {
                    CrudService.response.searchedProducts = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

        }]);
