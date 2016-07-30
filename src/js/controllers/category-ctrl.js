angular.module('RestMaPla')
    .controller('CategoryCtrl', ['$scope', '$state', '$stateParams', '$translate', 'AlertsManager', 'BreadcrumbManager', 'CategoryService', CategoryCtrl]);

function CategoryCtrl($scope, $state, $stateParams, $translate, AlertsManager, BreadcrumbManager, CategoryService) {
    $scope.isLoading = false; //Know if we need to show load screen
    //Initial values we need to load brands with PbP
    $scope.categories = [];
    //Create brand values
    $scope.isCreateShowing = false;
    $scope.createValues = {};
    $scope.isSubmitActive = true;
    //Brand details values
    $scope.selectedCategory = null;

    $scope.init = function(){
        BreadcrumbManager.changePage($translate.instant('views.index.categories'));
        $scope.isLoading = true;
        CategoryService.getCategories().success(function(data){
            $scope.categories = JSON.parse(JSON.stringify(data));
        }).error(function(data){
            AlertsManager.addAlert('danger', $translate.instant('error.loading.brands'));
        }).finally(function(){
            $scope.isLoading = false;
        });
    };

    /*View Methods*/
    $scope.showCreate = function(){
        $scope.isCreateShowing = true;
    };
    $scope.hideCreate = function(){
        $scope.isCreateShowing = false;
    };
}
