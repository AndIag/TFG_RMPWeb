'use strict';

angular.module('RestMaPla.frame', ['RestMaPla.common'])
    .controller('FrameCtrl', ['$scope', '$cookieStore', 'BreadCrumbService',
        function ($scope, $cookieStore, BreadCrumbService) {

            var mobileView = 992;

            $scope.data = BreadCrumbService.data;

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

        }]);