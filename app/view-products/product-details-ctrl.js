angular.module('RestMaPla.product.controller', ['ngFlash', 'RestMaPla.common-services'])
    .controller('ProductDetailsCtrl', ['$scope', '$stateParams', '$translate', 'Flash', 'BreadCrumbService', 'CrudService', 'PaginationService',
        function ($scope, $stateParams, $translate, Flash, BreadCrumbService, CrudService, PaginationService) {
            $scope.pagination = PaginationService.data;

            $scope.product = $stateParams.category;
            $scope.values = CrudService.response;

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($stateParams.product.name);
                findProductDetails(1);
            };

            $scope.changePage = function (newPage, oldPage) {
                findProductDetails(newPage);
            };

            $scope.searchByName = function () {
                //TODO implement with product services
            };

            function findProductDetails(page) {
                PaginationService.data.currentPage = page;
                CrudService.findItemDetailsById(CrudService.endpoints.PRODUCTS_ENDPOINT, $scope.product.id,
                    (page - 1), PaginationService.data.itemsPerPage).success(function (data) {

                    CrudService.response.products = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            }

        }]);
