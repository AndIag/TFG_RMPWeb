angular.module('RestMaPla.bills.controller', ['ngFlash', 'RestMaPla.common-services'])
    .controller('BillCtrl', ['$scope', '$translate', 'Flash', 'BreadCrumbService', 'CrudService', 'PaginationService',
        function ($scope, $translate, Flash, BreadCrumbService, CrudService, PaginationService) {
            $scope.pagination = PaginationService.data;
            $scope.values = CrudService.response;

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($translate.instant('views.index.bills'));
                getBillsPage(1);
            };

            $scope.changePage = function (newPage, oldPage) {
                getBillsPage(newPage);
            };

            $scope.searchByName = function () {
                CrudService.findItemsByName(CrudService.endpoints.BILLS_ENDPOINT, $scope.searchKeywords).success(function (data) {
                    CrudService.response.bills = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            };

            $scope.showCreate = function () {

            };

            $scope.removeBill = function (bill) {
                //TODO
            };

            function getBillsPage(page) {
                PaginationService.data.currentPage = page;
                CrudService.getPaginatedItems(CrudService.endpoints.BILLS_ENDPOINT, (page - 1),
                    PaginationService.data.itemsPerPage).success(function (data) {

                    CrudService.response.bills = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            }
            
        }]);
