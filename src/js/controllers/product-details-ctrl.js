myApp.controller('ProductDetailsCtrl', ['$scope', '$state', '$stateParams', '$translate',
    'Flash', 'BreadcrumbManager', 'ServerData', 'CrudService', 'SupplierService',

    function ($scope, $state, $stateParams, $translate, Flash, BreadcrumbManager, ServerData, CrudService, SupplierService) {
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
        $scope.searchedSuppliers = [];
        $scope.newProductSupplier = {};

        $scope.init = function () {
            $scope.isLoading = true;
            if (($scope.product == null) && $stateParams.productId) {
                CrudService.findItemById(myApp.PRODUCTS_ENDPOINT, $stateParams.productId).success(function (data) {
                    $scope.product = JSON.parse(JSON.stringify(data));
                    BreadcrumbManager.changePage($scope.product.name);
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading.products'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            }
        };

        function isValidProductForm(form) {
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
            if (isValidProductForm(form)) {
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
                CrudService.updateItem(myApp.PRODUCTS_ENDPOINT, product).success(function (data) {
                    $scope.product = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.creating.product'), 3000);
                }).finally(function () {
                    $scope.isSubmitActive = true;
                });
            }
        };

        function isValidForm(form) {
            if (form['supplier'].$error.required) {
                Flash.clear();
                Flash.create('info', $translate.instant('error.required.supplier'), 5000);
                return false;
            }
            if (form['price'].$error.required) {
                Flash.clear();
                Flash.create('info', $translate.instant('error.required.price'), 5000);
                return false;
            }
            return true;
        }

        $scope.addSupplier = function (form) {
            if (isValidForm(form)) {
                SupplierService.addSupplier2Product($stateParams.productId, $scope.newProductSupplier.supplier.id, $scope.newProductSupplier.price).success(function (data) {
                    $scope.init();
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.creating.productsupplier'), 3000);
                });
            }
        };

        //Search
        $scope.searchSuppliers = function () {
            CrudService.findItemsByName(myApp.SUPPLIERS_ENDPOINR, $scope.newProductSupplier.supplier).success(function (data) {
                var json = JSON.parse(JSON.stringify(data));
                if (json.items.length > 0) {
                    $scope.searchedSuppliers = json.items;
                }
            }).error(function (data) {
                console.log(data);
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading.products'), 3000);
            });
        };

        /*View Methods*/
        $scope.showCreate = function () {
            $scope.isCreateShowing = true;
        };
        $scope.hideCreate = function () {
            $scope.isCreateShowing = false;
            $scope.newProductSupplier = {};
        };

    }
]);
