angular.module('RestMaPla.categories.controller', ['ngFlash', 'ngDialog', 'RestMaPla.common-services'])
    .controller('CategoryCtrl', ['$scope', '$translate', 'Flash', 'ngDialog', 'BreadCrumbService', 'CrudService',
        function ($scope, $translate, Flash, ngDialog, BreadCrumbService, CrudService) {

            $scope.values = CrudService.response;
            var dialog;

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
                dialog = ngDialog.open({template: 'view-categories/add-form.html', scope: $scope, controller: this});
            };

            $scope.saveItem = function (form) {
                if (!form.$error.hasOwnProperty("required")) {
                    CrudService.createItem(CrudService.endpoints.CATEGORIES_ENDPOINT, $scope.category).success(function (data) {
                        $scope.values.categories.push(data);
                        $scope.category = null;
                        dialog.closeThisDialog();
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
