myApp.controller('MasterCtrl', ['$scope', '$cookieStore', 'CrudService', 'BreadcrumbManager', 'ServerData',
    function ($scope, $cookieStore, CrudService, BreadcrumbManager, ServerData) {
        /**
         * Sidebar Toggle & Cookie Control
         */
        var mobileView = 992;

        $scope.data = BreadcrumbManager.data;
        $scope.server_data = ServerData.data;
        $scope.isServerDown = false;

        $scope.init = function () {
            //TODO add orderBy to service
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

        $scope.toggleSidebar = function () {
            $scope.toggle = !$scope.toggle;
            $cookieStore.put('toggle', $scope.toggle);
        };

        window.onresize = function () {
            $scope.$apply();
        };
    }
]);
