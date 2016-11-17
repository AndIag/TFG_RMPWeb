angular.module('RestMaPla.suppliers.controller', ['ngFlash', 'RestMaPla.common-services'])
    .controller('SupplierCtrl', ['$scope', '$translate', 'Flash', 'BreadCrumbService', 'CrudService', 'PaginationService',
        function ($scope, $translate, Flash, BreadCrumbService, CrudService, PaginationService) {
            $scope.pagination = PaginationService.data;
            $scope.values = CrudService.response;

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($translate.instant('views.index.suppliers'));
                getSuppliersPage(1);
            };

            $scope.changePage = function (newPage, oldPage) {
                getSuppliersPage(newPage);
            };

            $scope.searchByName = function () {
                $scope.isSearching = $scope.searchKeywords && $scope.searchKeywords.length;
                CrudService.findItemsByName(CrudService.endpoints.SUPPLIERS_ENDPOINT, $scope.searchKeywords).success(function (data) {
                    CrudService.response.suppliers = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            };

            $scope.showCreate = function () {

            };

            $scope.removeSupplier = function (supplier) {
                CrudService.removeItem(CrudService.endpoints.SUPPLIERS_ENDPOINT, supplier.id).success(function (data) {
                    CrudService.response.suppliers.items = CrudService.response.suppliers.items.filter(function (e) {
                        return e.id !== supplier.id;
                    });
                    CrudService.response.suppliers.count = CrudService.response.suppliers.count -1;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.removing'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            };

            function getSuppliersPage(page) {
                PaginationService.data.currentPage = page;
                CrudService.getPaginatedItems(CrudService.endpoints.SUPPLIERS_ENDPOINT, (page - 1),
                    PaginationService.data.itemsPerPage).success(function (data) {

                    CrudService.response.suppliers = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            }

        }]);
