myApp.controller('EmployeeCtrl', ['$scope', '$state', '$stateParams', '$translate',
    'Flash', 'BreadcrumbManager', 'CrudService', 'ServerData',

    function ($scope, $state, $stateParams, $translate, Flash, BreadcrumbManager, CrudService, ServerData) {
        //View helpers
        $scope.isLoading = false;
        $scope.isAddFormShowing = false;
        $scope.isSubmitActive = true;
        $scope.legendMessage = null;

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
            CrudService.createItem(myApp.EMPLOYEES_ENDPOINT, {name: name, url: url}).success(function (data) {
                $scope.isAddFormShowing = false;
                Flash.create('success', $translate.instant('message.added'), 3000);
                ServerData.addEmployee(JSON.parse(JSON.stringify(data)));
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.creating'), 3000);
            }).finally(function () {
                $scope.isSubmitActive = true;
                $scope.hideCreate();
            });
        }

        function updateEmployee(employeeId, name, url) {
            CrudService.updateItem(myApp.EMPLOYEES_ENDPOINT, employeeId, {
                name: name,
                url: url
            }).success(function (data) {
                $scope.isAddFormShowing = false;
                Flash.clear();
                Flash.create('success', $translate.instant('message.updated'), 3000);
                $scope.init();
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.updating'), 3000);
            }).finally(function () {
                $scope.isSubmitActive = true;
                $scope.hideCreate();
            });
        }

        $scope.removeEmployee = function (employee, index) {
            employee.disabled = true;
            CrudService.removeItem(myApp.EMPLOYEES_ENDPOINT, employee.id).success(function (data) {
                ServerData.removeEmployee(index);
                Flash.clear();
                Flash.create('success', $translate.instant('message.removed'), 3000);
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.removing'), 3000);
                employee.disabled = false;
            });
        };

        $scope.searchByName = function () {
            $scope.isLoading = true;
            if ($scope.searchKeywords.length == 0) {
                CrudService.getItems(myApp.EMPLOYEES_ENDPOINT).success(function (data) {
                    ServerData.setEmployees(JSON.parse(JSON.stringify(data)));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.employees'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            } else if ($scope.searchKeywords.length > 0) {
                CrudService.findItemsByName(myApp.EMPLOYEES_ENDPOINT, $scope.searchKeywords).success(function (data) {
                    var json = JSON.parse(JSON.stringify(data));
                    if (json.length > 0) {
                        ServerData.setEmployees(json);
                    } else {
                        Flash.clear();
                        Flash.create('info', $translate.instant('error.no.results'), 1000);
                    }
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            }
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
