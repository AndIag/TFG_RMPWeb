angular.module('RestMaPla.bill.controller', ['ngFlash', 'ngDialog', 'RestMaPla.common'])
    .controller('BillDetailsCtrl', ['$scope', '$state', '$auth', '$stateParams', '$translate', 'Flash', 'ngDialog',
        'BreadCrumbService', 'CrudService', 'BillService', 'ProductService', 'PaginationService', 'FormValidators',
        /**
         *
         * @param $scope @link(https://docs.angularjs.org/guide/scope)
         * @param $state
         * @param $auth
         * @param $stateParams @link(https://github.com/angular-ui/ui-router/wiki)
         * @param $translate @link(https://github.com/angular-translate/angular-translate)
         * @param Flash -- Used for error feedback @link(https://github.com/sachinchoolur/angular-flash)
         * @param ngDialog -- Used in add forms @link(https://github.com/likeastore/ngDialog)
         * @param BreadCrumbService -- Handles page Breadcrumbs @link(common/breadcrumb-service.js)
         * @param CrudService -- Handles basic CRUD operations @link(common/crud-service.js)
         * @param BillService -- Handles add product to bill
         * @param ProductService -- Handles harder queries as product filter @link(view-products/products.js)
         * @param PaginationService -- Contains pagination variables @link(common/pagination.js)
         * @param FormValidators -- Contains validation logic @link(common/form-validator.js)
         */
            function ($scope, $state, $auth, $stateParams, $translate, Flash, ngDialog, BreadCrumbService, CrudService, BillService,
                      ProductService, PaginationService, FormValidators) {


            var dialog = null;
            $scope.pagination = PaginationService.data;
            $scope.bill = $stateParams.bill;
            $scope.values = CrudService.response;
            $scope.legend = $translate.instant("action.modify") + ' ' + $translate.instant("word.bill");
            $scope.isDetailsForm = true;

            /**
             * First data load on page selected. Loading page 1
             */
            $scope.init = function () {
                if (!$auth.isAuthenticated()) {
                    $state.go('login');
                    return;
                }
                BreadCrumbService.setBreadCrumb($translate.instant('word.bill') + ' ' + $stateParams.bill.id);
                findBillDetails(1);
            };

            /**
             * Load a new products page
             * @param {number} newPage given by dir-pagination-controls directive
             * @param {number} oldPage given by dir-pagination-controls directive
             */
            $scope.changePage = function (newPage, oldPage) {
                findBillDetails(newPage);
            };

            /**
             * Use $scope.searchKeywords and $scope.bill.id to find products
             */
            $scope.searchByName = function () {
                $scope.isSearching = $scope.searchKeywords && $scope.searchKeywords.length;
                ProductService.searchProduct($scope.searchKeywords, null, null, null, $scope.bill.id,
                    (PaginationService.data.currentPage - 1), PaginationService.data.itemsPerPage).success(function (data) {

                    CrudService.response.products = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            };

            /**
             * Try to post new brand($scope.brand) after validation
             * @param form TODO use for validation
             */
            $scope.saveItem = function (form) {
                $scope.errors = FormValidators.isValidBill($scope.bill, form);
                if (Object.keys($scope.errors).length === 0) {
                    CrudService.updateItem(CrudService.endpoints.BILLS_ENDPOINT, $scope.bill.id, $scope.bill).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.adding'), 3000);
                    });
                }
            };

            /**
             * Open new add dialog using the provided template and @this as controller
             */
            $scope.showCreate = function () {
                $scope.product = {};
                loadProducts(null);
                dialog = ngDialog.open({
                    template: 'view-bills/details/add/dialog.html',
                    scope: $scope,
                    controller: this
                });
            };

            /**
             * Try to post new product($scope.product) to bill after validation
             * @param form TODO use for validation
             */
            $scope.addMoreProduct = function (form) {
                $scope.errors = FormValidators.isValidProductForBill($scope.product, form);
                if (Object.keys($scope.errors).length === 0) {
                    BillService.addProduct($scope.bill.id, $scope.product.newProduct.id, $scope.product.quantity).success(function (data) {
                        CrudService.response.products = JSON.parse(JSON.stringify(data)).products;
                        dialog.close();
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.adding'), 3000);
                    });
                }
            };

            /**
             * %scope.saveItem + $scope.showCreate again
             */
            $scope.addMore = function () {
                $scope.errors = FormValidators.isValidProductForBill($scope.product, form);
                if (Object.keys($scope.errors).length === 0) {
                    BillService.addProduct($scope.supplier.id, $scope.product.newProduct.id, $scope.product.quantity).success(function (data) {
                        CrudService.response.products = JSON.parse(JSON.stringify(data)).products;
                        dialog.close();
                        $scope.product = {};
                        loadProducts(null);
                        dialog = ngDialog.open({
                            template: 'view-bills/details/add/dialog.html',
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
             * Load new products page for given bill
             * @param page page to load
             */
            function findBillDetails(page) {
                PaginationService.data.currentPage = page;
                CrudService.findPaginatedItemDetailsById(CrudService.endpoints.BILLS_ENDPOINT, $scope.bill.id,
                    (page - 1), PaginationService.data.itemsPerPage).success(function (data) {

                    var json = JSON.parse(JSON.stringify(data));
                    $scope.bill = json.item;
                    CrudService.response.products = json.products;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

            /**
             * Load first list of products for add product dialog
             */
            function loadProducts(keywords) {
                var fun;
                if (!$scope.bill.entry) {
                    fun = ProductService.searchPacks(keywords);
                } else {
                    fun = ProductService.searchSimple(keywords)
                }

                fun.success(function (data) {
                    CrudService.response.searchedProducts = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

        }]);
