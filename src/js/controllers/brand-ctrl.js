myApp.controller('BrandCtrl', ['$scope', '$state', '$stateParams', '$translate',
    'Flash', 'BreadcrumbManager', 'BrandService', 'ServerData',

    function ($scope, $state, $stateParams, $translate, Flash, BreadcrumbManager, BrandService, ServerData) {
        //View helpers
        $scope.isLoading = false; //Know if we need to show load screen
        $scope.showClose = true;
        $scope.isSubmitActive = true;
        $scope.isCreateShowing = false;
        //Page-By-Page things
        $scope.totalItems = 0;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;

        $scope.data = ServerData.data;
        //Create brand values
        $scope.brand = {};
        //SearchProductService
        $scope.searchKeywords = null;

        $scope.initBrands = function(){
            BreadcrumbManager.changePage($translate.instant('views.index.brands'));
            getPage(1);
        };

        // Load brands or products from server
        $scope.pageChanged = function(newPage){
            getPage(newPage);
        };

        function getPage(pageNumber) { //Page by page for brands
            $scope.isLoading = true;
            BrandService.getBrands(pageNumber-1, $scope.itemsPerPage).success(function(data){
                var json = JSON.parse(JSON.stringify(data));
                ServerData.setBrands(json.items);
                $scope.totalItems = json.count;
                $scope.currentPage = pageNumber;
            }).error(function(data){
                Flash.create('danger', $translate.instant('error.loading.brands'), 3000);
            }).finally(function(){
                $scope.isLoading = false;
            });
        };

        function isValidForm(form){
            if(form['url'].$error.url != undefined){
                Flash.create('info', $translate.instant('error.url'), 5000);
                return false;
            }
            if(form['name'].$error.required){
                Flash.create('info', $translate.instant('error.required.name'), 5000);
                return false;
            }
            return true;
        };

        //CRUD methods
        $scope.saveBrand = function (form) {
            if(isValidForm(form)){
                $scope.isSubmitActive = false;
                var name = $scope.brand.name;
                var url = $scope.brand.url;
                BrandService.createBrand(name, url).success(function(data){
                    $scope.isCreateShowing = false;
                    Flash.create('success', $translate.instant('message.brand.added'), 3000);
                    ServerData.addBrand(JSON.parse(JSON.stringify(data)));
                }).error(function(data){
                    Flash.create('danger', $translate.instant('error.creating.brand'), 3000);
                }).finally(function(){
                    $scope.isSubmitActive = true;
                });
            }
        };

        $scope.removeBrand = function(brand, index) {
            brand.disabled = true;
            BrandService.removeBrand(brand.id).success(function(data){
                ServerData.removeBrand(index);
                Flash.create('success', $translate.instant('message.brand.removed'), 3000);
            }).error(function(data){
                Flash.create('danger', $translate.instant('error.removing.brand'), 3000);
                brand.disabled = false;
            });
        };

        //Search
        $scope.searchBrandByName = function(){
            if($scope.searchKeywords.length == 0){
                $scope.data.showPageByPage = true;
                getPage(1);
            } else if($scope.searchKeywords.length > 0){
                $scope.data.showPageByPage = false;
                searchBrandByNamePage(1);
            }
        };

        function searchBrandByNamePage(pageNumber){
            $scope.isLoading = true;
            BrandService.getBrandsByName($scope.searchKeywords, pageNumber-1, $scope.itemsPerPage).success(function(data){
                var json = JSON.parse(JSON.stringify(data));
                if(json.items.length > 0){
                    ServerData.setBrands(json.items);
                }else{
                    Flash.create('info', $translate.instant('error.no-more-results'), 1000);
                }
            }).error(function(data){
                Flash.create('danger', $translate.instant('error.loading.brands'), 3000);
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
            $scope.brand = {};
        };
        $scope.showDetails = function(brand){
            $scope.currentProductsPage = 1;
            $state.go('brand-details', {'brandId': brand.id});
        };
    }
]);
