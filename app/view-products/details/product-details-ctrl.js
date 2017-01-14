angular.module('RestMaPla.product.controller', ['ngFlash', 'RestMaPla.common'])
    .controller('ProductDetailsCtrl', ['$scope', '$state', '$auth', '$stateParams', '$translate', 'Flash', 'BreadCrumbService', 'CrudService', 'FormValidators',
        /**
         *
         * @param $scope @link(https://docs.angularjs.org/guide/scope)
         * @param $state
         * @param $auth
         * @param $stateParams @link(https://github.com/angular-ui/ui-router/wiki)
         * @param $translate @link(https://github.com/angular-translate/angular-translate)
         * @param Flash -- Used for error feedback @link(https://github.com/sachinchoolur/angular-flash)
         * @param BreadCrumbService -- Handles page Breadcrumbs @link(common/breadcrumb-service.js)
         * @param CrudService -- Handles basic CRUD operations @link(common/crud-service.js)
         * @param FormValidators -- Contains validation logic @link(common/form-validator.js)
         */
            function ($scope, $state, $auth, $stateParams, $translate, Flash, BreadCrumbService, CrudService, FormValidators) {
            $scope.product = $stateParams.product;
            $scope.values = CrudService.response;
            $scope.legend = $translate.instant("action.modify") + ' ' + $translate.instant("word.product");
            $scope.hideSearchBox = true;

            /**
             * First data load
             */
            $scope.init = function () {
                if (!$auth.isAuthenticated()) {
                    $state.go('login');
                    return;
                }
                BreadCrumbService.setBreadCrumb($stateParams.product.name);
                findProductDetails();
                if (!CrudService.response.hasOwnProperty("categories")) loadCategories();
                if (!CrudService.response.hasOwnProperty("brands")) loadBrands();
            };

            /**
             * Try to post new product($scope.product) after validation
             * @param form TODO use for validation
             */
            $scope.saveItem = function (form) {
                if (($scope.errors = FormValidators.isValidProduct($scope.product, form)) === {}) {
                    CrudService.createItem(CrudService.endpoints.PRODUCTS_ENDPOINT, $scope.product).success(function (data) {
                        $scope.values.products.items.push(data);
                        $scope.values.products.count = $scope.values.products.count + 1;
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.adding'), 3000);
                    });
                }
            };

            /**
             * We need to request product data and, as workaround, fix data types to our templates to avoid
             * unnecessary re-writing
             */
            function findProductDetails() {
                CrudService.findItemDetailsById(CrudService.endpoints.PRODUCTS_ENDPOINT, $scope.product.id).success(function (data) {
                    var json = JSON.parse(JSON.stringify(data));
                    $scope.product = json.product;
                    if ($scope.product.amount || $scope.product.simpleProduct) {
                        $scope.product.isPack = true;
                    }
                    //Addapting data
                    CrudService.response.suppliers = {items: json.suppliers, count: json.suppliers.length};
                    CrudService.response.pAlerts = {items: json.alerts, count: json.alerts.length};
                    CrudService.response.bills = {items: json.bills, count: json.bills.length};
                    CrudService.response.orders = json.orders;
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
