angular.module('RestMaPla')
    .controller('BrandCtrl', ['$scope', '$state', '$translate', 'AlertsManager', 'BreadcrumbManager', 'BrandService', BrandCtrl]);

function BrandCtrl($scope, $state, $translate, AlertsManager, BreadcrumbManager, BrandService) {
    $scope.isLoading = false; //Know if we need to show load screen
    //Initial values we need to load brands with PbP
    $scope.brands = [];
    $scope.totalBrands = 0;
    $scope.brandsPerPage = 10;
    $scope.currentPage = 1;
    //Create brand values
    $scope.isCreateShowing = false;
    $scope.createValues = {};
    $scope.isSubmitActive = true;

    $scope.init = function(){
        BreadcrumbManager.changePage("Brands");
        getResultsPage(1);
    };

    // Load brands from server
    $scope.pageChanged = function(newPage){
        getResultsPage(newPage);
    };

    function getResultsPage(pageNumber) {
        $scope.isLoading = true;
        BrandService.getBrands(pageNumber-1, $scope.brandsPerPage).success(function(data){
            var json = JSON.parse(JSON.stringify(data));
            $scope.brands = json.items;
            $scope.totalBrands = json.count;
            $scope.isLoading = false;
        }).error(function(data){
            AlertsManager.addAlert('danger', $translate.instant('error.loading.brands'));
            $scope.isLoading = false;
        });
    }

    //Create brand
    function isValidForm(form){
        if(form['url'].$error.url != undefined){
            AlertsManager.addAlert('danger', $translate.instant('error.url'));
            return false;
        }
        if(form['name'].$error.required){
            AlertsManager.addAlert('danger', $translate.instant('error.required.name'));
            return false;
        }
        return true;
    };

    $scope.createBrand = function (form) {
        if(isValidForm(form)){
            $scope.isSubmitActive = false;
            var name = $scope.createValues.name;
            var url = $scope.createValues.url;
            BrandService.createBrand(name, url).success(function(data){
                getResultsPage($scope.currentPage);
                $scope.isSubmitActive = true;
                $scope.isCreateShowing = false;
                AlertsManager.addAlert('success', $translate.instant('message.brand.added'));
            }).error(function(data){
                $scope.isSubmitActive = true;
                AlertsManager.addAlert('danger', $translate.instant('error.creating.brand'));
            });
        }
    };

    /*View Methods*/
    $scope.removeBrand = function(brand, index) {
        brand.disabled = true;
        BrandService.removeBrand(brand.id).success(function(data){
            $scope.brands.splice(index, 1);
            AlertsManager.addAlert('success', $translate.instant('message.brand.removed'));
        }).error(function(data){
            AlertsManager.addAlert('danger', $translate.instant('error.removing.brand'));
            brand.disabled = false;
        });
    };

    $scope.showCreateBrand = function(){
        $scope.isCreateShowing = true;
    };
    $scope.hideCreateBrand = function(){
        $scope.isCreateShowing = false;
    };
}
