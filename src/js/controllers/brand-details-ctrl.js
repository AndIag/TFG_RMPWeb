myApp.controller('BrandDetailsCtrl', ['$scope', '$state', '$stateParams', '$translate',
    'Flash', 'BreadcrumbManager', 'ServerData', 'BrandService', 'ProductService', 'CrudService',

    function($scope, $state, $stateParams, $translate, Flash, BreadcrumbManager, ServerData, BrandService, ProductService, CrudService){
        $scope.isLoading = false;
        $scope.showProductsClose = true;
        $scope.showProductsLegend = true;

        $scope.product = {};

        $scope.data = ServerData.data;
        $scope.totalItems = 0;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;
        $scope.searchKeywords = null;
        $scope.isSubmitActive = true;

        $scope.init = function(){
            $scope.isLoading = true;
            if(($scope.brand == undefined || $scope.brand == null) && $stateParams.brandId){
                CrudService.findItemById(myApp.BRANDS_ENDPOINT, $stateParams.brandId).success(function(data){
                    $scope.brand = JSON.parse(JSON.stringify(data));
                    BreadcrumbManager.changePage($scope.brand.name);
                    getPage(1)
                }).error(function(data){
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading.products'), 3000);
                }).finally(function(){
                    $scope.isLoading = false;
                });
            }
        };

        $scope.initCategories = function(){
            CrudService.getItems(myApp.CATEGORIES_ENDPOINT).success(function(data){
                ServerData.setCategories(JSON.parse(JSON.stringify(data)));
            }).error(function(data){
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading.categories'), 3000);
            });
        };

        // Load brands or products from server
        $scope.pageChanged = function(newPage){
            getPage(newPage);
        };

        function getPage(pageNumber) { //Page by page for brand products
            $scope.isLoading = true;
            BrandService.getBrandProducts($scope.brand.id, pageNumber-1, $scope.itemsPerPage).success(function(data){
                var json = JSON.parse(JSON.stringify(data));
                ServerData.setProducts(json.items);
                $scope.totalItems = json.count;
                $scope.currentPage = pageNumber;
            }).error(function(data){
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading.products'), 3000);
            }).finally(function(){
                $scope.isLoading = false;
            });
        }

        $scope.removeBrandProduct = function(product, index){
            product.disabled = true;
            CrudService.removeItem(myApp.PRODUCTS_ENDPOINT, product.id).success(function(data){
                ServerData.removeProduct(index);
                Flash.clear();
                Flash.create('success', $translate.instant('message.product.removed'), 3000);
            }).error(function(data){
                Flash.clear();
                Flash.create('danger', $translate.instant('error.removing.product'), 3000);
                product.disabled = false;
            });
        };

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

        $scope.saveBrand = function (form) {
            if(isValidForm(form)){
                $scope.isSubmitActive = false;
                var name = $scope.selectedBrand.name;
                var url = $scope.selectedBrand.url;
                CrudService.updateItem(myApp.BRANDS_ENDPOINT, $scope.selectedBrand.id, {name: name, url: url}).success(function(data){
                    $scope.selectedBrand = JSON.parse(JSON.stringify(data));
                    Flash.clear();
                    Flash.create('success', $translate.instant('message.brand.updated'), 3000);
                }).error(function(data){
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.updating.brand'), 3000);
                }).finally(function(){
                    $scope.isSubmitActive = true;
                });
            }
        };

        function isValidProductForm(form){
            if(form['url'].$error.url != undefined){
                Flash.clear();
                Flash.create('info', $translate.instant('error.url'), 5000);
                return false;
            }
            if(form['name'].$error.required){
                Flash.clear();
                Flash.create('info', $translate.instant('error.required.name'), 5000);
                return false;
            }
            if(form['description'].$error.required){
                Flash.clear();
                Flash.create('info', $translate.instant('error.required.description'), 5000);
                return false;
            }
            if(form['category'].$error.required){
                Flash.clear();
                Flash.create('info', $translate.instant('error.required.category'), 5000);
                return false;
            }
            return true;
        }

        $scope.saveProduct = function(form){
            if(isValidProductForm(form)){
                $scope.isSubmitActive = false;
                var simple = null;
                var a = null;
                var price = null;
                if($scope.product.isPack){
                    simple = ('simpleProduct' in $scope.product) ? $scope.product.simpleProduct : null;
                    a = ('amount' in $scope.product) ? $scope.product.amount : null;
                    if(a == null || simple == null){
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.simpleProduct'), 3000);
                        $scope.isSubmitActive = true;
                        return;
                    }
                }else{
                    price = ('price' in $scope.product) ? $scope.product.price : null;
                    if(price == null){
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.price'), 3000);
                        $scope.isSubmitActive = true;
                        return;
                    }
                }
                var product = {
                    ean: ('ean' in $scope.product) ? $scope.product.ean : null,
                    name: $scope.product.name,
                    description: $scope.product.description,
                    url: $scope.product.url,
                    brand: {id:$stateParams.brandId},
                    category: $scope.product.category,
                    simpleProduct: simple,
                    simpleProductQuantity: a
                };
                CrudService.createItem(myApp.PRODUCTS_ENDPOINT, product).success(function(data){
                    ServerData.addProduct(JSON.parse(JSON.stringify(data)));
                    $scope.isCreateShowing = false;
                }).error(function(data){
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.creating.product'), 3000);
                }).finally(function(){
                    $scope.isSubmitActive = true;
                });
            }
        };

        $scope.searchProducts = function(){
            var brandId = $stateParams.brandId;
            var categoryId = 0;
            if($scope.product.category != null){
                categoryId = $scope.product.category.id;
            }
            ProductService.searchProducts($scope.product.simpleProduct, brandId, categoryId, true, null, null).success(function(data){
                var json = JSON.parse(JSON.stringify(data));
                if(json.items.length > 0){
                    $scope.searchedProducts = json.items;
                }
            }).error(function(data){
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading.products'), 3000);
            });
        };

        /*View Methods*/
        $scope.showCreate = function(){
            $scope.isCreateShowing = true;
        };
        $scope.hideCreate = function(){
            $scope.isCreateShowing = false;
            $scope.product = {};
        };
        $scope.showProductDetails = function(product){
            $scope.currentPage = 1;
            $state.go('product-details', {'productId': product.id});
        };

    }
]);
