angular.module('RestMaPla.brands.controller', ['ngFlash', 'RestMaPla.common-services'])
    .controller('BrandCtrl', ['$scope', '$translate', 'Flash', 'BreadCrumbService', 'CrudService', 'PaginationService',
        function ($scope, $translate, Flash, BreadCrumbService, CrudService, PaginationService) {
            $scope.pagination = PaginationService.data;
            $scope.values = CrudService.response;

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($translate.instant('views.index.brands'));
                getBrandsPage(1);
            };

            $scope.changePage = function (newPage, oldPage) {
                getBrandsPage(newPage);
            };

            $scope.searchByName = function () {
                $scope.isSearching = $scope.searchKeywords && $scope.searchKeywords.length;
                CrudService.findItemsByName(CrudService.endpoints.BRANDS_ENDPOINT, $scope.searchKeywords).success(function (data) {
                    CrudService.response.brands = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            };

            $scope.showCreate = function () {

            };

            $scope.removeBrand = function (brand) {
                if (brand.numProducts == 0) {
                    CrudService.removeItem(CrudService.endpoints.BRANDS_ENDPOINT, brand.id).success(function (data) {
                        CrudService.response.brands.items = CrudService.response.brands.items.filter(function (e) {
                            return e.id !== brand.id;
                        });
                        CrudService.response.brands.count = CrudService.response.brands.count -1;
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.removing'), 3000);
                    }).finally(function () {
                        $scope.isLoading = false;
                    });
                }
            };

            function getBrandsPage(page) {
                PaginationService.data.currentPage = page;
                CrudService.getPaginatedItems(CrudService.endpoints.BRANDS_ENDPOINT, (page - 1),
                    PaginationService.data.itemsPerPage).success(function (data) {

                    CrudService.response.brands = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

        }]);
