angular.module('RestMaPla.bill.controller', ['ngFlash', 'RestMaPla.common-services'])
    .controller('BillDetailsCtrl', ['$scope', '$stateParams', '$translate', 'Flash', 'BreadCrumbService', 'CrudService', 'ProductService', 'PaginationService',
        function ($scope, $stateParams, $translate, Flash, BreadCrumbService, CrudService, ProductService, PaginationService) {
            $scope.pagination = PaginationService.data;

            $scope.bill = $stateParams.bill;
            $scope.values = CrudService.response;

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($translate.instant('word.bill') + ' ' + $stateParams.bill.id);
                findBillDetails(1);
            };

            $scope.changePage = function (newPage, oldPage) {
                findBillDetails(newPage);
            };

            $scope.searchByName = function () {
                
            };

            $scope.removeProduct = function (product) {

            };

            function findBillDetails(page) {
                PaginationService.data.currentPage = page;
                CrudService.findItemDetailsById(CrudService.endpoints.BILLS_ENDPOINT, $scope.bill.id,
                    (page - 1), PaginationService.data.itemsPerPage).success(function (data) {

                    CrudService.response.products = JSON.parse(JSON.stringify(data)).products;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            }

        }]);
