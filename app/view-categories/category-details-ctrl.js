angular.module('RestMaPla.category.controller', ['ngFlash', 'RestMaPla.common-services'])
    .controller('CategoryDetailsCtrl', ['$scope', '$stateParams', '$translate', 'Flash', 'BreadCrumbService', 'CrudService', 'PaginationService',
        function ($scope, $stateParams, $translate, Flash, BreadCrumbService, CrudService, PaginationService) {
            $scope.pagination = PaginationService.data;

            $scope.category = $stateParams.category;
            $scope.values = CrudService.response;

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($stateParams.category.name);
                findCategoryDetails(1);
            };

            $scope.changePage = function (newPage, oldPage) {
                findCategoryDetails(newPage);
            };

            $scope.searchByName = function () {
                //TODO implement with product services
            };

            $scope.removeProduct = function (product) {
                //TODO fix supplier dependency
                CrudService.removeItem(CrudService.endpoints.PRODUCTS_ENDPOINT, product.id).success(function (data) {
                    CrudService.response.products.items = CrudService.response.products.items.filter(function (e) {
                        return e.id !== product.id;
                    });
                    CrudService.response.products.count = CrudService.response.products.count - 1;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.removing'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            };

            function findCategoryDetails(page) {
                PaginationService.data.currentPage = page;
                CrudService.findItemDetailsById(CrudService.endpoints.CATEGORIES_ENDPOINT, $scope.category.id,
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
