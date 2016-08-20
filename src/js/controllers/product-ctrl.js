myApp.controller('ProductCtrl', ['$scope', '$state', '$stateParams', '$translate',
    '$timeout', 'Flash', 'BreadcrumbManager', 'CategoryService', 'ProductService',
    'ServerData',

    function ProductCtrl($scope, $state, $stateParams, $translate, $timeout, Flash, BreadcrumbManager, CategoryService, ProductService, ServerData) {
        $scope.isLoading = false;
        $scope.isCreateShowing = false;
        $scope.isSubmitActive = true;
        $scope.showPageByPage = true;

        $scope.data = ServerData.data;

        //Page-By-Page things
        $scope.totalProducts = 0;
        $scope.itemsPerPage = 10;
        $scope.currentProductsPage = 1;

        $scope.createProductValues = {};
        $scope.searchedProducts = [];
        //Search
        $scope.searchKeywords = null;

        $scope.init = function(){
            BreadcrumbManager.changePage($translate.instant('views.index.products'));
            getPage(1);
        };

        /**/
        $scope.initCategories = function(){
            CategoryService.getCategories().success(function(data){
                ServerData.setCategories(JSON.parse(JSON.stringify(data)));
            }).error(function(data){
                Flash.create('danger', $translate.instant('error.loading.categories'), 3000);
            });
        };

        $scope.pageChanged = function(newPage){
            getPage(newPage);
        };

        function getPage(pageNumber) { //Page by page for brands
            $scope.isLoading = true;
            ProductService.getProducts(pageNumber-1, $scope.itemsPerPage).success(function(data){
                var json = JSON.parse(JSON.stringify(data));
                ServerData.setProducts(json.items);
                $scope.totalProducts = json.count;
                $scope.currentProductsPage = pageNumber;
            }).error(function(data){
                Flash.create('danger', $translate.instant('error.loading.products'), 3000);
            }).finally(function(){
                $scope.isLoading = false;
            });
        };

        $scope.isPack = function(product){
            if('simpleProduct' in product){
                return $translate.instant('true');
            }
            return $translate.instant('false');
        };

        $scope.searchProducts = function(){
            var brandId = $stateParams.brandId;
            var categoryId = 0;
            if($scope.searchProducts.category != null){
                categoryId = $scope.searchProducts.category.id;
            }
            ProductService.searchProducts($scope.createProductValues.simpleProduct, brandId, categoryId, true, null, null).success(function(data){
                var json = JSON.parse(JSON.stringify(data));
                if(json.items.length > 0){
                    $scope.searchedProducts = json.items;
                }
            }).error(function(data){
                Flash.create('danger', $translate.instant('error.loading.products'), 3000);
            });
        };

        $scope.searchProductsByName = function(){
            if($scope.searchKeywords!=null && $scope.searchKeywords.length > 0){
                ProductService.searchProducts($scope.searchKeywords, null, null, null, null, null).success(function(data){
                    var json = JSON.parse(JSON.stringify(data));
                    if(json.items.length > 0){
                        ServerData.setProducts(json.items);;
                    }else{
                        Flash.create('info', $translate.instant('error.no-more-results'), 7000);
                    }
                }).error(function(data){
                    Flash.create('danger', $translate.instant('error.loading.categories'), 3000);
                });
            }else{
                $scope.init();
            }
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
            if(form['description'].$error.required){
                Flash.create('info', $translate.instant('error.required.description'), 5000);
                return false;
            }
            if(form['category'].$error.required){
                Flash.create('info', $translate.instant('error.required.category'), 5000);
                return false;
            }
            return true;
        };

        $scope.createProduct = function(form){
            if(isValidForm(form)){
                $scope.isSubmitActive = false;
                var simple = null;
                var a = null;
                var price = null;
                if($scope.createProductValues.isPack){
                    simple = ('simpleProduct' in $scope.createProductValues) ? $scope.createProductValues.simpleProduct : null;
                    a = ('amount' in $scope.createProductValues) ? $scope.createProductValues.amount : null;
                    if(a == null || simple == null){
                        Flash.create('danger', $translate.instant('error.simpleProduct'), 3000);
                        $scope.isSubmitActive = true;
                        return;
                    }
                }else{
                    price = ('price' in $scope.createProductValues) ? $scope.createProductValues.price : null;
                    if(price == null){
                        Flash.create('danger', $translate.instant('error.price'), 3000);
                        $scope.isSubmitActive = true;
                        return;
                    }
                }
                var product = {
                    ean: ('ean' in $scope.createProductValues) ? $scope.createProductValues.ean : null,
                    name: $scope.createProductValues.name,
                    description: $scope.createProductValues.description,
                    url: $scope.createProductValues.url,
                    brand: {id:$stateParams.brandId},
                    category: $scope.createProductValues.category,
                    simpleProduct: simple,
                    simpleProductQuantity: a
                }
                ProductService.createProduct(product).success(function(data){
                    ServerData.addProduct(JSON.parse(JSON.stringify(data)));
                    $scope.isCreateShowing = false;
                }).error(function(data){
                    Flash.create('danger', $translate.instant('error.creating.product'), 3000);
                }).finally(function(){
                    $scope.isSubmitActive = true;
                });
            }
        };

        /*View Methods*/
        $scope.showCreate = function(){
            $scope.isCreateShowing = true;
        };
        $scope.hideCreate = function(){
            $scope.isCreateShowing = false;
        };
        $scope.showDetails = function(product){
            $scope.currentProductsPage = 1;
            $state.go('product-details', {'productId': product.id});
        };
    }
]);
