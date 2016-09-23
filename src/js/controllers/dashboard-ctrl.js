/**
 * Created by Canalejas on 23/09/2016.
 */
myApp.controller('DashboardCtrl', ['$scope', '$state', '$stateParams', '$translate',
    'Flash', 'BreadcrumbManager', 'AlertService',

    function ($scope, $state, $stateParams, $translate, Flash, BreadcrumbManager, AlertService) {

        $scope.data = null;

        $scope.init = function(){
            BreadcrumbManager.changePage($translate.instant('views.index.dashboard'));
            $scope.isLoading = true;
            AlertService.getDashboardInfo().success(function(data){
                $scope.data = JSON.parse(JSON.stringify(data));
                console.log(data);
            }).error(function(data){
                Flash.create('danger', $translate.instant('error.loading.info'), 3000);
            }).finally(function(){
                $scope.isLoading = false;
            });
        };

    }
]);