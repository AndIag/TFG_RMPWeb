angular.module('RestMaPla.employees.controller', ['ngFlash', 'ngDialog', 'RestMaPla.common'])
    .controller('EmployeeCtrl', ['$scope', '$translate', 'Flash', 'ngDialog', 'BreadCrumbService', 'CrudService', 'FormValidators',
        function ($scope, $translate, Flash, ngDialog, BreadCrumbService, CrudService, FormValidators) {

            $scope.values = CrudService.response;
            $scope.roles = [$translate.instant('employee.admin'),
                $translate.instant('employee.waiter'),
                $translate.instant('employee.chef')];
            var dialog = null;

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($translate.instant('views.index.employees'));
                CrudService.getItems(CrudService.endpoints.EMPLOYEES_ENDPOINT).success(function (data) {
                    CrudService.response.employees = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            };

            $scope.searchByName = function () {
                //TODO implement server-side
            };

            $scope.showCreate = function () {
                $scope.employee = {};
                dialog = ngDialog.open({template: 'view-employees/add-form.html', scope: $scope, controller: this});
            };

            $scope.saveItem = function (form) {
                if (($scope.errors = FormValidators.isValidEmployee($scope.employee, form)) === {}) {
                    CrudService.createItem(CrudService.endpoints.EMPLOYEES_ENDPOINT, $scope.employee).success(function (data) {
                        $scope.values.employees.push(data);
                        dialog.close();
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.adding'), 3000);
                    });
                }
            };

        }]);
