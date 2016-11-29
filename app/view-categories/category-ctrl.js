angular.module('RestMaPla.categories.controller', ['ngFlash', 'ngDialog', 'RestMaPla.common-services'])
    .controller('CategoryCtrl', ['$scope', '$translate', 'Flash', 'ngDialog', 'BreadCrumbService', 'CrudService', 'FormValidators',
        function ($scope, $translate, Flash, ngDialog, BreadCrumbService, CrudService, FormValidators) {
            var dialog = null;
            $scope.values = CrudService.response;

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($translate.instant('views.index.categories'));
                CrudService.getItems(CrudService.endpoints.CATEGORIES_ENDPOINT).success(function (data) {
                    CrudService.response.categories = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            };

            $scope.searchByName = function () {
                $scope.isSearching = $scope.searchKeywords && $scope.searchKeywords.length;
                CrudService.findItemsByName(CrudService.endpoints.CATEGORIES_ENDPOINT, $scope.searchKeywords).success(function (data) {
                    CrudService.response.categories = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            };

            $scope.showCreate = function () {
                $scope.category = {};
                dialog = ngDialog.open({template: 'view-categories/add-form.html', scope: $scope, controller: this});
            };

            $scope.saveItem = function (form) {
                var error = null;
                if (error = FormValidators.isValidCategory($scope.category, form) === true) {
                    CrudService.createItem(CrudService.endpoints.CATEGORIES_ENDPOINT, $scope.category).success(function (data) {
                        $scope.values.categories.push(data);
                        dialog.close();
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.adding'), 3000);
                    });
                }
            };

            $scope.removeCategory = function (category) {
                if (category.numProducts == 0) {
                    CrudService.removeItem(CrudService.endpoints.CATEGORIES_ENDPOINT, category.id).success(function (data) {
                        CrudService.response.categories = CrudService.response.categories.filter(function (e) {
                            return e.id !== category.id;
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
