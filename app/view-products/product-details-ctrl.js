angular.module('RestMaPla.product.controller', ['ngFlash', 'RestMaPla.common-services'])
    .controller('ProductDetailsCtrl', ['$scope', '$stateParams', '$translate', 'Flash', 'BreadCrumbService', 'CrudService',
        function ($scope, $stateParams, $translate, Flash, BreadCrumbService, CrudService) {
            $scope.product = $stateParams.product;
            $scope.values = CrudService.response;
            $scope.hideSearchBox = true;

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($stateParams.product.name);
                findProductDetails();
            };


            function findProductDetails() {
                CrudService.findItemDetailsById(CrudService.endpoints.PRODUCTS_ENDPOINT, $scope.product.id).success(function (data) {
                    var json = JSON.parse(JSON.stringify(data));
                    $scope.product = json.product;
                    CrudService.response.suppliers = {items: json.suppliers, count: json.suppliers.length};
                    CrudService.response.alerts = json.alerts;
                    CrudService.response.bills = {items: json.bills, count: json.bills.length};
                    CrudService.response.orders = json.orders;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

        }]);
