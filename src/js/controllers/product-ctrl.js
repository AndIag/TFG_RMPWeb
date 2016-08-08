angular.module('RestMaPla')
    .controller('ProductCtrl', ['$scope', '$state', '$stateParams', '$translate', '$timeout', 'Flash', 'BreadcrumbManager', 'CategoryService', 'ProductService', 'ServerData', ProductCtrl]);

function ProductCtrl($scope, $state, $stateParams, $translate, $timeout, Flash, BreadcrumbManager, CategoryService, ProductService, ServerData) {
    $scope.createProductValues = {};
    $scope.data = ServerData.data;
    $scope.searchedProducts = [];
    $scope.isCreateShowing = false;

    $scope.initCategories = function(){
        CategoryService.getCategories().success(function(data){
            ServerData.setCategories(JSON.parse(JSON.stringify(data)));
        }).error(function(data){
            Flash.create('danger', $translate.instant('error.loading.categories'), 3000);
        });
    };

    $scope.searchProducts = function(){
        var brandId = $stateParams.brandId;;
        var categoryId = 0;
        if($scope.searchProducts.category != null){
            categoryId = $scope.searchProducts.category.id;
        }
        ProductService.searchProducts(brandId, categoryId, $scope.createProductValues.simpleProduct, true, null, null).success(function(data){
            var json = JSON.parse(JSON.stringify(data));
            if(json.items.length > 0){
                $scope.searchedProducts = json.items;
            }
        }).error(function(data){
            Flash.create('danger', $translate.instant('error.loading.categories'), 3000);
        });
    }

    $scope.createProduct = function(form){
        console.log($scope.createProductValues.category);
    };

}
