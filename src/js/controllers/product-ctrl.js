myApp.controller('ProductCtrl', ['$scope', '$state', '$stateParams', '$translate',
    '$timeout', 'Flash', 'BreadcrumbManager', 'CrudService', 'ProductService',
    'ServerData',

    function ($scope, $state, $stateParams, $translate, $timeout, Flash, BreadcrumbManager, CrudService, ProductService, ServerData) {
        //View helpers
        $scope.isLoading = false;
        $scope.isCreateShowing = false;
        $scope.isSubmitActive = true;
        $scope.showProductsLegend = true;
        $scope.showProductsClose = true;
        $scope.searchedProducts = [];
        //Page-By-Page things
        $scope.totalProducts = 0;
        $scope.itemsPerPage = 10;
        $scope.currentProductsPage = 1;

        $scope.data = ServerData.data;
        //Create product values
        $scope.product = {};
        //Search
        $scope.searchKeywords = null;

        $scope.init = function () {
            BreadcrumbManager.changePage($translate.instant('views.index.products'));
            getPage(1);
        };

        /**/
        $scope.initCategories = function () {
            CrudService.getItems(myApp.CATEGORIES_ENDPOINT).success(function (data) {
                ServerData.setCategories(JSON.parse(JSON.stringify(data)));
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading.categories'), 3000);
            });
        };

        $scope.pageChanged = function (newPage) {
            getPage(newPage);
        };

        function getPage(pageNumber) { //Page by page for brands
            $scope.isLoading = true;
            CrudService.getPaginatedItems(myApp.PRODUCTS_ENDPOINT, pageNumber - 1, $scope.itemsPerPage).success(function (data) {
                var json = JSON.parse(JSON.stringify(data));
                ServerData.setProducts(json.items);
                $scope.totalProducts = json.count;
                $scope.currentProductsPage = pageNumber;
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading.products'), 3000);
            }).finally(function () {
                $scope.isLoading = false;
            });
        }

        $scope.isPack = function (product) {
            if ('simpleProduct' in product) {
                return $translate.instant('true');
            }
            return $translate.instant('false');
        };

        $scope.searchProducts = function () {
            var brandId = $stateParams.brandId;
            var categoryId = 0;
            if ($scope.product.category != null) {
                categoryId = $scope.product.category.id;
            }
            ProductService.searchProducts($scope.product.simpleProduct, brandId, categoryId, true, null, null).success(function (data) {
                var json = JSON.parse(JSON.stringify(data));
                if (json.items.length > 0) {
                    $scope.searchedProducts = json.items;
                }
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading.products'), 3000);
            });
        };

        $scope.searchProductsByName = function () {
            if ($scope.searchKeywords != null && $scope.searchKeywords.length > 0) {
                $scope.data.showPageByPage = false;
                ProductService.searchProducts($scope.searchKeywords, null, null, null, null, null).success(function (data) {
                    var json = JSON.parse(JSON.stringify(data));
                    if (json.items.length > 0) {
                        ServerData.setProducts(json.items);
                    } else {
                        Flash.clear();
                        Flash.create('info', $translate.instant('error.no-more-results'), 1000);
                    }
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading.products'), 3000);
                });
            } else {
                $scope.init();
                $scope.data.showPageByPage = true;
            }
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
            if (form['description'].$error.required) {
                Flash.clear();
                Flash.create('info', $translate.instant('error.required.description'), 5000);
                return false;
            }
            if (form['category'].$error.required) {
                Flash.clear();
                Flash.create('info', $translate.instant('error.required.category'), 5000);
                return false;
            }
            return true;
        }

        $scope.saveProduct = function (form) {
            if (isValidForm(form)) {
                $scope.isSubmitActive = false;
                var simple = null;
                var a = null;
                var price = null;
                if ($scope.product.isPack) {
                    simple = ('simpleProduct' in $scope.product) ? $scope.product.simpleProduct : null;
                    a = ('amount' in $scope.product) ? $scope.product.amount : null;
                    if (a == null || simple == null) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.simpleProduct'), 3000);
                        $scope.isSubmitActive = true;
                        return;
                    }
                } else {
                    price = ('price' in $scope.product) ? $scope.product.price : null;
                    if (price == null) {
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
                    brand: {id: $stateParams.brandId},
                    category: $scope.product.category,
                    simpleProduct: simple,
                    simpleProductQuantity: a
                };
                CrudService.createItem(myApp.PRODUCTS_ENDPOINT, product).success(function (data) {
                    ServerData.addProduct(JSON.parse(JSON.stringify(data)));
                    $scope.isCreateShowing = false;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.creating.product'), 3000);
                }).finally(function () {
                    $scope.isSubmitActive = true;
                });
            }
        };

        /*View Methods*/
        $scope.showCreate = function () {
            $scope.isCreateShowing = true;
        };
        $scope.hideCreate = function () {
            $scope.isCreateShowing = false;
        };
        $scope.showDetails = function (product) {
            $scope.currentProductsPage = 1;
            $state.go('product-details', {'productId': product.id});
        };
    }
]);
