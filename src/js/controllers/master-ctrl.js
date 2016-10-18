myApp.controller('MasterCtrl', ['$scope', '$cookieStore', '$translate', 'Flash', 'CrudService', 'BreadcrumbManager', 'ServerData', 'AlertService',
    function ($scope, $cookieStore, $translate, Flash, CrudService, BreadcrumbManager, ServerData, AlertService) {
        /**
         * Sidebar Toggle & Cookie Control
         */
        var mobileView = 992;

        $scope.data = BreadcrumbManager.data;
        $scope.server_data = ServerData.data;
        $scope.isServerDown = false;

        $scope.init = function () {
            CrudService.getItems(myApp.ALERTS_ENDPOINT).success(function (data) {
                ServerData.setAlerts(JSON.parse(JSON.stringify(data)));
            }).error(function (data) {
                $scope.isServerDown = true;
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading.categories'), 3000);
            }).finally(function () {
                $scope.isLoading = false;
            });
        };

        $scope.getWidth = function () {
            return window.innerWidth;
        };

        $scope.$watch($scope.getWidth, function (newValue, oldValue) {
            if (newValue >= mobileView) {
                if (angular.isDefined($cookieStore.get('toggle'))) {
                    $scope.toggle = $cookieStore.get('toggle');
                } else {
                    $scope.toggle = true;
                }
            } else {
                $scope.toggle = false;
            }

        });

        $scope.showAlert = function (alert) {
            CrudService.updateItem(myApp.ALERTS_ENDPOINT, alert.id, null).success(function (data) {
                alert.viewed = true;
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading.categories'), 3000);
            }).finally(function () {
                $scope.isLoading = false;
            });
        };

        $scope.toggleSidebar = function () {
            $scope.toggle = !$scope.toggle;
            $cookieStore.put('toggle', $scope.toggle);
        };

        $scope.hasUnreadAlerts = function () {
            for (var i in $scope.server_data.alerts) {
                if ($scope.server_data.alerts[i].viewed == false) {
                    return true;
                }
            }
            return false;
        };

        window.onresize = function () {
            $scope.$apply();
        };
    }
]);
