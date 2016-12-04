angular.module('RestMaPla.table.controller', ['ngFlash', 'RestMaPla.common-services', 'RestMaPla.table.service'])
    .controller('TableDetailsCtrl', ['$scope', '$state', '$stateParams', '$translate', 'Flash', 'TableService', 'BreadCrumbService', 'CrudService', 'PaginationService',
        function ($scope, $state, $stateParams, $translate, Flash, TableService, BreadCrumbService, CrudService, PaginationService) {
            $scope.pagination = PaginationService.data;

            $scope.table = $stateParams.table;
            $scope.values = CrudService.response;

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($translate.instant('word.table') + ' ' + $stateParams.table.num);
                TableService.getTableOrders($scope.table.id).success(function (data) {
                    console.log(data);
                    CrudService.response.orders = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            };

            $scope.saveItem = function (form) {
                if (!form.$error.hasOwnProperty("required")) {
                    CrudService.updateItem(CrudService.endpoints.TABLES_ENDPOINT, $scope.table.id, $scope.table).success(function (data) {

                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.updating'), 3000);
                    });
                }
            };

            $scope.removeOrder = function (product) {
                CrudService.removeItem(CrudService.endpoints.ORDERS_ENDPOINT, product.id).success(function (data) {
                    CrudService.response.orders.items = CrudService.response.orders.items.filter(function (e) {
                        return e.id !== product.id;
                    });
                    CrudService.response.orders.count = CrudService.response.orders.count - 1;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.removing'), 3000);
                });
            };

        }]);
