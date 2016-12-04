angular.module('RestMaPla.suppliers.controller', ['ngFlash', 'ngDialog', 'RestMaPla.common'])
    .controller('SupplierCtrl', ['$scope', '$translate', 'Flash', 'ngDialog', 'BreadCrumbService', 'CrudService', 'PaginationService', 'FormValidators',
        function ($scope, $translate, Flash, ngDialog, BreadCrumbService, CrudService, PaginationService, FormValidators) {
            $scope.pagination = PaginationService.data;
            $scope.values = CrudService.response;

            var dialog = null;

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
                });
            };

            $scope.showCreate = function () {
                $scope.supplier = {};
                dialog = ngDialog.open({template: 'view-suppliers/add-form.html', scope: $scope, controller: this});
            };

            $scope.saveItem = function (form) {
                if (($scope.errors = FormValidators.isValidSupplier($scope.supplier, form)) === {}) {
                    CrudService.createItem(CrudService.endpoints.SUPPLIERS_ENDPOINT, $scope.supplier).success(function (data) {
                        $scope.values.suppliers.items.push(data);
                        $scope.values.suppliers.count = $scope.values.suppliers.count + 1;
                        dialog.close();
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.adding'), 3000);
                    });
                }
            };

            function getSuppliersPage(page) {
                PaginationService.data.currentPage = page;
                CrudService.getPaginatedItems(CrudService.endpoints.SUPPLIERS_ENDPOINT, (page - 1),
                    PaginationService.data.itemsPerPage).success(function (data) {

                    CrudService.response.suppliers = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

        }]);
