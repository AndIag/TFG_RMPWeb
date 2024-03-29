angular.module('RestMaPla.tables.controller', ['ngFlash', 'ngDialog', 'RestMaPla.common'])
    .controller('TableCtrl', ['$scope', '$state', '$auth', '$translate', 'Flash', 'ngDialog', 'BreadCrumbService', 'CrudService',
        function ($scope, $state, $auth, $translate, Flash, ngDialog, BreadCrumbService, CrudService) {
            var dialog = null;
            $scope.values = CrudService.response;

            $scope.init = function () {
                if (!$auth.isAuthenticated()) {
                    $state.go('login');
                    return;
                }
                BreadCrumbService.setBreadCrumb($translate.instant('views.index.tables'));
                CrudService.getItems(CrudService.endpoints.TABLES_ENDPOINT).success(function (data) {
                    CrudService.response.tables = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            };

            $scope.showCreate = function () {
                $scope.table = {};
                dialog = ngDialog.open({template: 'view-tables/add-form.html', scope: $scope, controller: this});
            };

            $scope.saveItem = function (form) {
                if (!form.$error.hasOwnProperty("required")) {
                    CrudService.createItem(CrudService.endpoints.TABLES_ENDPOINT, $scope.table).success(function (data) {
                        $scope.values.tables.push(data);
                        dialog.close();
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.adding'), 3000);
                    });
                }
            };

        }]);
