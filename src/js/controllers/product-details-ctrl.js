myApp.controller('ProductDetailsCtrl', ['$scope', '$state', '$stateParams', '$translate',
    'Flash', 'BreadcrumbManager', 'ServerData', 'ProductService',

    function($scope, $state, $stateParams, $translate, Flash, BreadcrumbManager, ServerData, ProductService){
        $scope.isLoading = false;
        $scope.isCreateShowing = false;
        $scope.isSubmitActive = true;
        $scope.currencySymbol = '€';
        $scope.showProductClose = false;
        //Page-By-Page things
        $scope.totalItems = 0;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;

        $scope.product = null;

        $scope.init = function(){
            $scope.isLoading = true;
            if(($scope.product == null) && $stateParams.productId){
                ProductService.getProductById($stateParams.productId).success(function(data){
                    $scope.product = JSON.parse(JSON.stringify(data));
                    console.log(data);
                    BreadcrumbManager.changePage($scope.product.name);
                }).error(function(data){
                    Flash.create('danger', $translate.instant('error.loading.products'), 3000);
                }).finally(function(){
                    $scope.isLoading = false;
                });
            }
        };
    }
]);
