myApp.controller('SupplierProductCtrl', ['$scope', '$state', '$stateParams', '$translate',
    '$timeout', 'Flash', 'BreadcrumbManager', 'CrudService', 'ProductService',
    'ServerData',

    //TODO  not implemented for TFG
    function ($scope, $state, $stateParams, $translate, $timeout, Flash, BreadcrumbManager, CrudService, ProductService, ServerData) {
        $scope.isLoading = false;
        $scope.isCreateShowing = false;
        $scope.isSubmitActive = true;
        //Page-By-Page things
        $scope.totalItems = 0;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;

        $scope.supplier = null;
        $scope.data = ServerData.data;

        $scope.init = function () {
            $scope.isLoading = true;
            if (($scope.supplier == null) && $stateParams.supplierId) {
                CrudService.findItemById(myApp.SUPPLIERS_ENDPOINT, $stateParams.supplierId).success(function (data) {
                    $scope.supplier = JSON.parse(JSON.stringify(data));
                    BreadcrumbManager.changePage($scope.supplier.name);
                    getSelectedProducts($scope.supplier.id);
                    getPage(1);
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            }
        };

        $scope.pageChanged = function (newPage) {
            getPage(newPage);
        };

        function getSelectedProducts(supplierId) {
            ProductService.findProductsBySupplier(supplierId).success(function (data) {
                ServerData.setSelectedProducts(JSON.parse(JSON.stringify(data)).items);
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading'), 3000);
            }).finally(function () {
                $scope.isLoading = false;
            });
        }

        function getPage(pageNumber) { //Page by page for brands
            $scope.isLoading = true;
            CrudService.getPaginatedItems(myApp.PRODUCTS_ENDPOINT, pageNumber - 1, $scope.itemsPerPage).success(function (data) {
                var json = JSON.parse(JSON.stringify(data));
                ServerData.setProducts(json.items);
                $scope.totalItems = json.count;
                $scope.currentPage = pageNumber;
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading'), 3000);
            }).finally(function () {
                $scope.isLoading = false;
            });
        }

        $scope.isPack = function (product) {
            return ('simpleProduct' in product);
        };

        $scope.indexOf = function (productId) {
            for(var i=0; i < $scope.data.selectedProducts.length; i++) {
                if ($scope.data.selectedProducts[i].id == productId){
                    return i;
                }
            }
            return -1
        };

        $scope.toggleSelect = function (product) {
            if($scope.indexOf(product.id) != -1){
                ServerData.removeSelectedProduct($scope.indexOf(product.id))
            }else{
                ServerData.addSelectedProduct(product)
            }
        };

    }

]);