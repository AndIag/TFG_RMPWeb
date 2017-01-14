angular.module('RestMaPla.category.controller', ['ngFlash', 'ngDialog', 'RestMaPla.common'])
    .controller('CategoryDetailsCtrl', ['$scope', '$state', '$auth', '$stateParams', '$translate', 'Flash', 'ngDialog',
        'BreadCrumbService', 'CrudService', 'ProductService', 'PaginationService', 'FormValidators',
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
         * @param ProductService -- Handles harder queries as product filter @link(view-products/products.js)
         * @param PaginationService -- Contains pagination variables @link(common/pagination.js)
         * @param FormValidators -- Contains validation logic @link(common/form-validator.js)
         */
            function ($scope, $state, $auth, $stateParams, $translate, Flash, ngDialog,
                      BreadCrumbService, CrudService, ProductService, PaginationService, FormValidators) {

            var dialog = null;

            $scope.pagination = PaginationService.data;
            //Define legend to redefine add-form default
            $scope.legend = $translate.instant("action.modify") + ' ' + $translate.instant("word.category");
            $scope.category = $stateParams.category;
            $scope.values = CrudService.response;


            /**
             * First data load on page selected. Loading page 1
             */
            $scope.init = function () {
                if (!$auth.isAuthenticated()) {
                    $state.go('login');
                    return;
                }
                BreadCrumbService.setBreadCrumb($stateParams.category.name);
                findCategoryDetails(1);
            };

            /**
             * Load a new products page
             * @param {number} newPage given by dir-pagination-controls directive
             * @param {number} oldPage given by dir-pagination-controls directive
             */
            $scope.changePage = function (newPage, oldPage) {
                findCategoryDetails(newPage);
            };

            /**
             * Use $scope.searchKeywords and $scope.category.id to find categories
             */
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

            /**
             * Called on submit button click to update given object
             * @param form TODO use for validation
             */
            $scope.saveItem = function (form) {
                $scope.errors = FormValidators.isValidCategory($scope.category, form);
                if (Object.keys($scope.errors).length === 0) { //Validation pass successfully
                    CrudService.updateItem(CrudService.endpoints.CATEGORIES_ENDPOINT, $scope.category.id, $scope.category).success(function (data) {

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
                $scope.isCategoryForm = true; //Used for hide category picker in dialog form
                $scope.product = {};
                if (!CrudService.response.hasOwnProperty("brands")) loadBrands(); //Load brands if required
                dialog = ngDialog.open({template: 'view-products/add/dialog.html', scope: $scope, controller: this});
            };

            /**
             * Try to post new product($scope.product) after validation
             * @param form TODO use for validation
             */
            $scope.saveProduct = function (form) {
                $scope.product.category = $scope.category; //Set this category as new product category
                $scope.product.simple = !$scope.product.isPack; //Need this for server-side validation
                $scope.errors = FormValidators.isValidProduct($scope.product, form);
                if (Object.keys($scope.errors).length === 0) { //Validation pass successfully
                    CrudService.createItem(CrudService.endpoints.PRODUCTS_ENDPOINT, $scope.product).success(function (data) {
                        //Push new product to list and increment count by one
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
             * Load new products page for given category
             * @param page page to load
             */
            function findCategoryDetails(page) {
                PaginationService.data.currentPage = page;
                CrudService.findPaginatedItemDetailsById(CrudService.endpoints.CATEGORIES_ENDPOINT, $scope.category.id,
                    (page - 1), PaginationService.data.itemsPerPage).success(function (data) {

                    var json = JSON.parse(JSON.stringify(data));
                    $scope.category = json.item; //Overload required for submit feedback
                    CrudService.response.products = json.products;
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
