angular.module('RestMaPla.brands.controller', ['ngFlash', 'RestMaPla.common-services'])
    .controller('BrandCtrl', ['$scope', '$translate', 'Flash', 'BreadCrumbService', 'CrudService',
        function ($scope, $translate, Flash, BreadCrumbService, CrudService) {

            $scope.values = CrudService.response;

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($translate.instant('views.index.brands'));
                CrudService.getItems(CrudService.endpoints.BRANDS_ENDPOINT).success(function (data) {
                    CrudService.response.brands = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            };

            $scope.searchByName = function () {
                CrudService.findItemsByName(CrudService.endpoints.BRANDS_ENDPOINT, $scope.searchKeywords).success(function (data) {
                    CrudService.response.brands = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            };

            $scope.showCreate = function () {

            };

            $scope.removeBrand = function (brand) {
                if (brand.numProducts == 0) {
                    CrudService.removeItem(CrudService.endpoints.BRANDS_ENDPOINT, brand.id).success(function (data) {
                        CrudService.response.brands = CrudService.response.brands.filter(function (e) {
                            return e.id !== brand.id;
                        })
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.removing'), 3000);
                    }).finally(function () {
                        $scope.isLoading = false;
                    });
                }
            }
        }]);
