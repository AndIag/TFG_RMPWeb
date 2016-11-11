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
                CrudService.findPaginatedItemsByName(CrudService.endpoints.BILLS_ENDPOINT, $scope.searchKeywords).success(function (data) {
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
                if (bill.numProducts == 0) {
                    CrudService.removeItem(CrudService.endpoints.BILLS_ENDPOINT, bill.id).success(function (data) {
                        CrudService.response.bills.items = CrudService.response.bills.items.filter(function (e) {
                            return e.id !== bill.id;
                        });
                        CrudService.response.bills.count = CrudService.response.bills.count -1;
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.removing'), 3000);
                    }).finally(function () {
                        $scope.isLoading = false;
                    });
                }
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
