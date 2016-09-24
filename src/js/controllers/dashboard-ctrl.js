/**
 * Created by Canalejas on 23/09/2016.
 */
myApp.controller('DashboardCtrl', ['$scope', '$state', '$stateParams', '$translate',
    'Flash', 'BreadcrumbManager', 'CrudService',

    function ($scope, $state, $stateParams, $translate, Flash, BreadcrumbManager, CrudService) {

        $scope.data = null;

        $scope.init = function () {
            BreadcrumbManager.changePage($translate.instant('views.index.dashboard'));
            $scope.isLoading = true;
            CrudService.getItems(myApp.DASHBOARD_ENDPOINT).success(function (data) {
                $scope.data = JSON.parse(JSON.stringify(data));
                console.log(data);
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading.info'), 3000);
            }).finally(function () {
                $scope.isLoading = false;
            });
        };

    }
]);