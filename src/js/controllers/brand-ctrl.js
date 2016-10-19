myApp.controller('BrandCtrl', ['$scope', '$state', '$stateParams', '$translate',
    'Flash', 'BreadcrumbManager', 'CrudService', 'ServerData',

    function ($scope, $state, $stateParams, $translate, Flash, BreadcrumbManager, CrudService, ServerData) {
        //View helpers
        $scope.isLoading = false; //Know if we need to show load screen
        $scope.showClose = true;
        $scope.isSubmitActive = true;
        $scope.isCreateShowing = false;
        $scope.showBrandLegend = true;
        //Page-By-Page things
        $scope.totalItems = 0;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;

        $scope.data = ServerData.data;
        $scope.brand = {};
        $scope.searchKeywords = null;

        $scope.initBrands = function () {
            BreadcrumbManager.changePage($translate.instant('views.index.brands'));
            getPage(1);
        };

        // Load brands or products from server
        $scope.pageChanged = function (newPage) {
            getPage(newPage);
        };

        function getPage(pageNumber) { //Page by page for brands
            $scope.isLoading = true;
            CrudService.getPaginatedItems(myApp.BRANDS_ENDPOINT, pageNumber - 1, $scope.itemsPerPage).success(function (data) {
                var json = JSON.parse(JSON.stringify(data));
                ServerData.setBrands(json.items);
                $scope.totalItems = json.count;
                $scope.currentPage = pageNumber;
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading'), 3000);
            }).finally(function () {
                $scope.isLoading = false;
            });
        }

        function isValidForm(form) {
            if (form['url'].$error.url != undefined) {
                Flash.clear();
                Flash.create('info', $translate.instant('error.url'), 5000);
                return false;
            }
            if (form['name'].$error.required) {
                Flash.clear();
                Flash.create('info', $translate.instant('error.required.name'), 5000);
                return false;
            }
            return true;
        }

        //CRUD methods
        $scope.saveBrand = function (form) {
            if (isValidForm(form)) {
                $scope.isSubmitActive = false;
                var name = $scope.brand.name;
                var url = $scope.brand.url;
                CrudService.createItem(myApp.BRANDS_ENDPOINT, {name: name, url: url}).success(function (data) {
                    $scope.isCreateShowing = false;
                    Flash.clear();
                    Flash.create('success', $translate.instant('message.added'), 3000);
                    ServerData.addBrand(JSON.parse(JSON.stringify(data)));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.creating'), 3000);
                }).finally(function () {
                    $scope.isSubmitActive = true;
                });
            }
        };

        $scope.removeBrand = function (brand, index) {
            brand.disabled = true;
            CrudService.removeItem(myApp.BRANDS_ENDPOINT, brand.id).success(function (data) {
                ServerData.removeBrand(index);
                Flash.clear();
                Flash.create('success', $translate.instant('message.removed'), 3000);
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.removing'), 3000);
                brand.disabled = false;
            });
        };

        //Search
        $scope.searchBrandByName = function () {
            if ($scope.searchKeywords.length == 0) {
                $scope.data.showPageByPage = true;
                getPage(1);
            } else if ($scope.searchKeywords.length > 0) {
                $scope.data.showPageByPage = false;
                searchBrandByNamePage(1);
            }
        };

        function searchBrandByNamePage(pageNumber) {
            $scope.isLoading = true;
            CrudService.findPaginatedItemsByName(myApp.BRANDS_ENDPOINT, $scope.searchKeywords, pageNumber - 1, $scope.itemsPerPage).success(function (data) {
                var json = JSON.parse(JSON.stringify(data));
                if (json.items.length > 0) {
                    ServerData.setBrands(json.items);
                } else {
                    Flash.clear();
                    Flash.create('info', $translate.instant('error.no.results'), 1000);
                }
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading'), 3000);
            }).finally(function () {
                $scope.isLoading = false;
            });
        }

        /*View Methods*/
        $scope.showCreate = function () {
            $scope.isCreateShowing = true;
        };
        $scope.hideCreate = function () {
            $scope.isCreateShowing = false;
            $scope.brand = {};
        };
        $scope.showDetails = function (brand) {
            $scope.currentProductsPage = 1;
            $state.go('brand-details', {'brandId': brand.id});
        };
    }
]);
