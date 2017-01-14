angular.module('RestMaPla.products.controller', ['ngFlash', 'ngDialog', 'RestMaPla.common'])
    .controller('ProductCtrl', ['$scope', '$state', '$auth', '$translate', 'Flash', 'ngDialog', 'BreadCrumbService', 'CrudService', 'PaginationService', 'FormValidators',
        /**
         *
         * @param $scope @link(https://docs.angularjs.org/guide/scope)
         * @param $state
         * @param $auth
         * @param $translate @link(https://github.com/angular-translate/angular-translate)
         * @param Flash -- Used for error feedback @link(https://github.com/sachinchoolur/angular-flash)
         * @param ngDialog -- Used in add forms @link(https://github.com/likeastore/ngDialog)
         * @param BreadCrumbService -- Handles page Breadcrumbs @link(components/breadcrumb-service.js)
         * @param CrudService -- Handles basic CRUD operations @link(common/crud-service.js)
         * @param PaginationService -- Used to store data about page server side pagination
         * @param FormValidators -- Contains validation logic @link(components/form-validator.js)
         */
            function ($scope, $state, $auth, $translate, Flash, ngDialog, BreadCrumbService, CrudService, PaginationService, FormValidators) {

            var dialog = null;
            $scope.pagination = PaginationService.data;
            $scope.values = CrudService.response;

            /**
             * Fist page request
             */
            $scope.init = function () {
                if (!$auth.isAuthenticated()) {
                    $state.go('login');
                    return;
                }
                BreadCrumbService.setBreadCrumb($translate.instant('views.index.products'));
                getProductsPage(1);
            };

            /**
             * Load a new brands page
             * @param {number} newPage given by dir-pagination-controls directive
             * @param {number} oldPage given by dir-pagination-controls directive
             */
            $scope.changePage = function (newPage, oldPage) {
                getProductsPage(newPage);
            };

            /**
             * Use $scope.searchKeywords to find product
             */
            $scope.searchByName = function () {
                $scope.isSearching = $scope.searchKeywords && $scope.searchKeywords.length;
                CrudService.findItemsByName(CrudService.endpoints.PRODUCTS_ENDPOINT, $scope.searchKeywords).success(function (data) {
                    CrudService.response.products = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            };

            /**
             * Open new add dialog using the provided template and @this as controller
             */
            $scope.showCreate = function () {
                $scope.product = {};
                if (!CrudService.response.hasOwnProperty("categories")) loadCategories();
                if (!CrudService.response.hasOwnProperty("brands")) loadBrands();
                dialog = ngDialog.open({template: 'view-products/add/dialog.html', scope: $scope, controller: this});
            };

            /**
             * Try to post new product($scope.product) after validation
             * @param form TODO use for validation
             */
            $scope.saveProduct = function (form) {
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

            /**
             * Request a page of products from service
             * @param page requested page
             */
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

            // USED IN ADD PRODUCT DIALOG TODO move to ... common?¿
            /**
             * Required by add product dialog for brand type-ahead
             */
            $scope.searchBrand = function () {
                CrudService.findItemsByName(CrudService.endpoints.BRANDS_ENDPOINT, $scope.product.brand).success(function (data) {
                    CrudService.response.brands = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            };

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

            /**
             * Load first list of brands for add product dialog
             */
            function loadBrands() {
                CrudService.getItems(CrudService.endpoints.BRANDS_ENDPOINT).success(function (data) {
                    CrudService.response.brands = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

        }]);
