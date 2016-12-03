angular.module('RestMaPla.table.controller', ['ngFlash', 'RestMaPla.common-services'])
    .controller('TableDetailsCtrl', ['$scope', '$state', '$stateParams', '$translate', 'Flash', 'BreadCrumbService', 'CrudService', 'PaginationService',
        function ($scope, $state, $stateParams, $translate, Flash, BreadCrumbService, CrudService, PaginationService) {
            $scope.pagination = PaginationService.data;

            $scope.table = $stateParams.table;
            $scope.values = CrudService.response;

            var dialog = null;

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($translate.instant('word.table') + ' ' + $stateParams.table.num);
                findTableDetails(1);
            };

            $scope.changePage = function (newPage, oldPage) {
                findTableDetails(newPage);
            };

            // $scope.searchByName = function () {
            //     $scope.isSearching = $scope.searchKeywords && $scope.searchKeywords.length;
            //     OrderService.searchOrder($scope.searchKeywords, $scope.table.id, null, null, null,
            //         (PaginationService.data.currentPage - 1), PaginationService.data.itemsPerPage).success(function (data) {
            //
            //         CrudService.response.orders = JSON.parse(JSON.stringify(data));
            //     }).error(function (data) {
            //         Flash.clear();
            //         Flash.create('danger', $translate.instant('error.loading'), 3000);
            //     });
            // };

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

            function findTableDetails(page) {
                PaginationService.data.currentPage = page;
                CrudService.findPaginatedItemDetailsById(CrudService.endpoints.TABLES_ENDPOINT, $scope.table.id,
                    (page - 1), PaginationService.data.itemsPerPage).success(function (data) {

                    var json = JSON.parse(JSON.stringify(data));
                    $scope.table = json.item;
                    CrudService.response.orders = json.orders;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

        }]);
