angular.module('RestMaPla')
    .controller('BrandCtrl', ['$scope', '$state', '$stateParams', '$translate', 'AlertsManager', 'BreadcrumbManager', 'BrandService', BrandCtrl]);

function BrandCtrl($scope, $state, $stateParams, $translate, AlertsManager, BreadcrumbManager, BrandService) {
    $scope.isLoading = false; //Know if we need to show load screen
    //Initial values we need to load brands with PbP
    $scope.brands = [];
    $scope.brandProducts = [];
    $scope.totalBrands = 0;
    $scope.totalProducts = 0;
    $scope.itemsPerPage = 10;
    $scope.currentBrandsPage = 1;
    $scope.currentProductsPage = 1;
    //Create brand values
    $scope.isCreateShowing = false;
    $scope.createValues = {};
    $scope.isSubmitActive = true;
    //Brand details values
    $scope.selectedBrand = null;

    $scope.initBrands = function(){
        BreadcrumbManager.changePage("Brands");
        getBrandsPage(1);
    };

    $scope.initBrandProducts = function(){
        $scope.isLoading = true;
        if(($scope.selectedBrand == undefined || $scope.selectedBrand == null) && $stateParams.brandId){
            BrandService.getBrandById($stateParams.brandId).success(function(data){
                $scope.selectedBrand = JSON.parse(JSON.stringify(data));
                BreadcrumbManager.changePage($scope.selectedBrand.name);
                getProductsPage(1)
            }).error(function(data){
                AlertsManager.addAlert('danger', $translate.instant('error.loading.products'));
            }).finally(function(){
                $scope.isLoading = false;
            });
        }
    }

    // Load brands or products from server
    $scope.pageChanged = function(newPage){
        ($stateParams.brandId == undefined) ? getBrandsPage(newPage): getProductsPage(newPage);
    };

    function getBrandsPage(pageNumber) { //Page by page for brands
        $scope.isLoading = true;
        BrandService.getBrands(pageNumber-1, $scope.itemsPerPage).success(function(data){
            var json = JSON.parse(JSON.stringify(data));
            $scope.brands = json.items;
            $scope.totalBrands = json.count;
            $scope.currentBrandsPage = pageNumber;
        }).error(function(data){
            AlertsManager.addAlert('danger', $translate.instant('error.loading.brands'));
        }).finally(function(){
            $scope.isLoading = false;
        });
    };

    function getProductsPage(pageNumber) { //Page by page for brand products
        $scope.isLoading = true;
        BrandService.getBrandProducts($scope.selectedBrand.id, pageNumber-1, $scope.itemsPerPage).success(function(data){
            var json = JSON.parse(JSON.stringify(data));
            $scope.brandProducts = json.items;
            $scope.totalProducts = json.count;
            $scope.currentProductsPage = pageNumber;
        }).error(function(data){
            AlertsManager.addAlert('danger', $translate.instant('error.loading.products'));
        }).finally(function(){
            $scope.isLoading = false;
        });
    }


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

    //CRUD methods
    $scope.createBrand = function (form) {
        if(isValidForm(form)){
            $scope.isSubmitActive = false;
            var name = $scope.createValues.name;
            var url = $scope.createValues.url;
            BrandService.createBrand(name, url).success(function(data){
                $scope.isCreateShowing = false;
                AlertsManager.addAlert('success', $translate.instant('message.brand.added'));
            }).error(function(data){
                console.log(data);
                AlertsManager.addAlert('danger', $translate.instant('error.creating.brand'));
            }).finally(function(){
                $scope.isSubmitActive = true;
                getBrandsPage($scope.currentBrandsPage);
            });
        }
    };

    $scope.updateBrand = function (form) {
        if(isValidForm(form)){
            $scope.isSubmitActive = false;
            var name = $scope.selectedBrand.name;
            var url = $scope.selectedBrand.url;
            BrandService.updateBrand($scope.selectedBrand.id, name, url).success(function(data){
                //TODO
            }).error(function(data){
                //TODO
            }).finally(function(){
                //TODO
            });
        }
    };

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

    /*View Methods*/
    $scope.showCreate = function(){
        $scope.isCreateShowing = true;
    };
    $scope.hideCreate = function(){
        $scope.isCreateShowing = false;
    };
    $scope.showDetails = function(brand){
        $scope.currentProductsPage = 1;
        $state.go('brand-details', {'brandId': brand.id});
    }
}
