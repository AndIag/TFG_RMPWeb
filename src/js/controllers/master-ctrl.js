myApp.controller('MasterCtrl', ['$scope', '$cookieStore', 'BreadcrumbManager', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, BreadcrumbManager) {
    /**
    * Sidebar Toggle & Cookie Control
    */
    var mobileView = 992;

    $scope.data = BreadcrumbManager.data;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };
}
