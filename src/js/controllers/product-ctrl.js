angular.module('RestMaPla')
    .controller('ProductCtrl', ['$scope', '$state', '$stateParams', '$translate', '$timeout', 'Flash', 'BreadcrumbManager', 'CategoryService', ProductCtrl]);

function ProductCtrl($scope, $state, $stateParams, $translate, $timeout, Flash, BreadcrumbManager, CategoryService) {
    $scope.createProductValues = {};
    $scope.categories = [];
    $scope.isCreateShowing = false;

    $scope.initCategories = function(){
        CategoryService.getCategories().success(function(data){
            $scope.categories = JSON.parse(JSON.stringify(data));
        }).error(function(data){
            Flash.create('danger', $translate.instant('error.loading.categories'), 3000);
        });
    };

    $scope.createProduct = function(form){
        console.log($scope.createProductValues.category);
    };

}
