angular.module('RestMaPla.employees.controller', ['ngFlash', 'RestMaPla.common-services'])
    .controller('EmployeeCtrl', ['$scope', '$translate', 'Flash', 'BreadCrumbService', 'CrudService',
        function ($scope, $translate, Flash, BreadCrumbService, CrudService) {

            $scope.values = CrudService.response;

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

            };

            $scope.removeCategory = function (category) {
                if (category.numProducts == 0) {
                    CrudService.removeItem(CrudService.endpoints.EMPLOYEES_ENDPOINT, category.id).success(function (data) {
                        CrudService.response.employees = CrudService.response.employees.filter(function (e) {
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
