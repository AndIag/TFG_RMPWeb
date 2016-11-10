angular.module('RestMaPla.supplier.controller', ['ngFlash', 'RestMaPla.common-services'])
    .controller('SupplierDetailsCtrl', ['$scope', '$stateParams', '$translate', 'Flash', 'BreadCrumbService', 'CrudService', 'ProductService', 'PaginationService',
        function ($scope, $stateParams, $translate, Flash, BreadCrumbService, CrudService, ProductService, PaginationService) {
            $scope.pagination = PaginationService.data;

            $scope.supplier = $stateParams.supplier;
            $scope.values = CrudService.response;

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($stateParams.supplier.name);
                findSupplierDetails(1);
            };

            $scope.changePage = function (newPage, oldPage) {
                findSupplierDetails(newPage);
            };

            $scope.searchByName = function () {
                //TODO implement search by supplier
                // ProductService.searchProduct($scope.searchKeywords, null, $scope.supplier.id,
                //     (PaginationService.data.currentPage - 1), PaginationService.data.itemsPerPage).success(function (data) {
                //
                //     CrudService.response.products = JSON.parse(JSON.stringify(data));
                // }).error(function (data) {
                //     Flash.clear();
                //     Flash.create('danger', $translate.instant('error.loading'), 3000);
                // }).finally(function () {
                //     $scope.isLoading = false;
                // });
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

            function findSupplierDetails(page) {
                PaginationService.data.currentPage = page;
                CrudService.findItemDetailsById(CrudService.endpoints.SUPPLIERS_ENDPOINT, $scope.supplier.id,
                    (page - 1), PaginationService.data.itemsPerPage).success(function (data) {

                    console.log(JSON.parse(JSON.stringify(data)));
                    CrudService.response.products = JSON.parse(JSON.stringify(data)).products;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            }

        }]);
