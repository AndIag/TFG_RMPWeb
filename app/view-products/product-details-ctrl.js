angular.module('RestMaPla.product.controller', ['ngFlash', 'RestMaPla.common-services'])
    .controller('ProductDetailsCtrl', ['$scope', '$stateParams', '$translate', 'Flash', 'BreadCrumbService', 'CrudService', 'FormValidators',
        function ($scope, $stateParams, $translate, Flash, BreadCrumbService, CrudService, FormValidators) {
            $scope.product = $stateParams.product;
            $scope.values = CrudService.response;
            $scope.hideSearchBox = true;

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($stateParams.product.name);
                findProductDetails();
            };

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

            function findProductDetails() {
                CrudService.findItemDetailsById(CrudService.endpoints.PRODUCTS_ENDPOINT, $scope.product.id).success(function (data) {
                    var json = JSON.parse(JSON.stringify(data));
                    $scope.product = json.product;
                    if ($scope.product.amount || $scope.product.simpleProduct) {
                        $scope.product.isPack = true;
                    }
                    CrudService.response.suppliers = {items: json.suppliers, count: json.suppliers.length};
                    CrudService.response.alerts = {items: json.alerts, count: json.alerts.length};
                    CrudService.response.bills = {items: json.bills, count: json.bills.length};
                    CrudService.response.orders = json.orders;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

            // USED IN MODIFY PRODUCT FORM
            $scope.searchBrand = function () {
                CrudService.findItemsByName(CrudService.endpoints.BRANDS_ENDPOINT, $scope.product.brand).success(function (data) {
                    CrudService.response.brands = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            };

        }]);
