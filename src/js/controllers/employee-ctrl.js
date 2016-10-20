myApp.controller('EmployeeCtrl', ['$scope', '$state', '$stateParams', '$translate',
    'Flash', 'BreadcrumbManager', 'CrudService', 'ServerData',

    function ($scope, $state, $stateParams, $translate, Flash, BreadcrumbManager, CrudService, ServerData) {
        //View helpers
        $scope.isLoading = false;
        $scope.isAddFormShowing = false;
        $scope.isSubmitActive = true;
        $scope.legendMessage = null;
        $scope.showClose = true;
        $scope.showEmployeeLegend = true;

        $scope.data = ServerData.data;
        $scope.employee = {};
        $scope.searchKeywords = null;

        $scope.init = function () {
            BreadcrumbManager.changePage($translate.instant('views.index.employees'));
            $scope.isLoading = true;
            CrudService.getItems(myApp.EMPLOYEES_ENDPOINT).success(function (data) {
                ServerData.setEmployees(JSON.parse(JSON.stringify(data)));
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading'), 3000);
            }).finally(function () {
                $scope.isLoading = false;
            });
        };

        function isValidForm(form) {
            Flash.clear();
            if (form['url'].$error.url != undefined) {
                Flash.create('info', $translate.instant('error.invalid.url'), 5000);
                return false;
            }
            if (form['name'].$error.required) {
                Flash.create('info', $translate.instant('error.required.name'), 5000);
                return false;
            }
            return true;
        }

        //CRUD methods
        $scope.saveEmployee = function (form) {
            if (isValidForm(form)) {
                $scope.isSubmitActive = false;
                var bid = $scope.employee.id;
                var name = $scope.employee.name;
                var url = $scope.employee.url;
                (bid != undefined) ? updateEmployee(bid, name, url) : createEmployee(name, url);
            }
        };

        function createEmployee(name, url) {

        }

        function updateEmployee(employeeId, name, url) {

        }

        $scope.removeEmployee = function (employee, index) {

        };

        $scope.searchByName = function () {

        };

        /*View Methods*/
        $scope.showCreate = function () {
            $scope.isAddFormShowing = true;
            $scope.legendMessage = $translate.instant('action.add') + ' ' + $translate.instant('word.employee');
        };
        $scope.hideCreate = function () {
            $scope.isAddFormShowing = false;
            $scope.employee = {};
        };
        $scope.showDetails = function (employee) {
            $scope.employee = employee;
            $scope.isAddFormShowing = true;
            $scope.legendMessage = $translate.instant('action.modify') + ' ' + $translate.instant('word.employee');
        };
    }
]);
