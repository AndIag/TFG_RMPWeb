angular.module('RestMaPla.products.controller', ['ngFlash', 'ngDialog', 'RestMaPla.common-services'])
    .controller('ProductCtrl', ['$scope', '$translate', 'Flash', 'ngDialog', 'BreadCrumbService', 'CrudService', 'PaginationService',
        function ($scope, $translate, Flash, ngDialog, BreadCrumbService, CrudService, PaginationService) {
            $scope.pagination = PaginationService.data;
            $scope.values = CrudService.response;

            var dialog = null;

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($translate.instant('views.index.products'));
                getBrandsPage(1);
            };

            $scope.changePage = function (newPage, oldPage) {
                getBrandsPage(newPage);
            };

            $scope.searchByName = function () {
                $scope.isSearching = $scope.searchKeywords && $scope.searchKeywords.length;
                CrudService.findItemsByName(CrudService.endpoints.PRODUCTS_ENDPOINT, $scope.searchKeywords).success(function (data) {
                    CrudService.response.products = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            };

            $scope.showCreate = function () {
                $scope.product = {};
                dialog = ngDialog.open({template: 'view-products/add-form.html', scope: $scope, controller: this});
            };

            $scope.removeBrand = function (product) {
                CrudService.removeItem(CrudService.endpoints.PRODUCTS_ENDPOINT, product.id).success(function (data) {
                    CrudService.response.products.items = CrudService.response.products.items.filter(function (e) {
                        return e.id !== product.id;
                    });
                    CrudService.response.products.count = CrudService.response.products.count -1;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.removing'), 3000);
                });
            };

            function getBrandsPage(page) {
                PaginationService.data.currentPage = page;
                CrudService.getPaginatedItems(CrudService.endpoints.PRODUCTS_ENDPOINT, (page - 1),
                    PaginationService.data.itemsPerPage).success(function (data) {

                    CrudService.response.products = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

        }]);
