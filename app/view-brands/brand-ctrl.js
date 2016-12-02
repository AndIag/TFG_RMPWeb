angular.module('RestMaPla.brands.controller', ['ngFlash', 'ngDialog', 'RestMaPla.common-services'])
    .controller('BrandCtrl', ['$scope', '$translate', 'Flash', 'ngDialog', 'BreadCrumbService', 'CrudService', 'PaginationService', 'FormValidators',
        function ($scope, $translate, Flash, ngDialog, BreadCrumbService, CrudService, PaginationService, FormValidators) {
            var dialog = null;
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
                $scope.brand = {};
                dialog = ngDialog.open({template: 'view-brands/add-form.html', scope: $scope, controller: this});
            };

            $scope.saveItem = function (form) {
                $scope.errors = FormValidators.isValidBrand($scope.brand, form);
                if (Object.keys($scope.errors).length === 0) {
                    CrudService.createItem(CrudService.endpoints.BRANDS_ENDPOINT, $scope.brand).success(function (data) {
                        $scope.values.brands.items.push(data);
                        $scope.values.brands.count = $scope.values.brands.count + 1;
                        dialog.close();
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.adding'), 3000);
                    });
                }
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
