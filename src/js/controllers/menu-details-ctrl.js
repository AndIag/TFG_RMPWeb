myApp.controller('MenuDetailsCtrl', ['$scope', '$state', '$stateParams', '$translate',
    'Flash', 'BreadcrumbManager', 'MenuService', 'CrudService', 'ProductService',

    function ($scope, $state, $stateParams, $translate, Flash, BreadcrumbManager, MenuService, CrudService, ProductService) {
        //View helpers
        $scope.isAddProductShowing = false;
        $scope.isSubmitActive = true;
        $scope.currencySymbol = '€';


        $scope.init = function () {
            $scope.isLoading = true;
            BreadcrumbManager.changePage($translate.instant('views.index.menus'));
            CrudService.findItemById(myApp.MENUS_ENDPOINT, $stateParams.menuId).success(function (data) {
                $scope.menu = JSON.parse(JSON.stringify(data));
                BreadcrumbManager.changePage($scope.menu.name);
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading'), 3000);
            }).finally(function () {
                $scope.isLoading = false;
            });
            initStarters();
            initDrinks();
            initMains();
            initDesserts();
        };

        function initStarters() {
            $scope.isLoading = true;
            MenuService.getMenuParts($stateParams.menuId, MenuService.menuParts.starters).success(function (data) {
                $scope.starters = JSON.parse(JSON.stringify(data));
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading'), 3000);
            }).finally(function () {
                $scope.isLoading = false;
            });
        }

        function initDrinks() {
            $scope.isLoading = true;
            MenuService.getMenuParts($stateParams.menuId, MenuService.menuParts.drinks).success(function (data) {
                $scope.drinks = JSON.parse(JSON.stringify(data));
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading'), 3000);
            }).finally(function () {
                $scope.isLoading = false;
            });
        }

        function initMains() {
            $scope.isLoading = true;
            MenuService.getMenuParts($stateParams.menuId, MenuService.menuParts.mains).success(function (data) {
                $scope.mains = JSON.parse(JSON.stringify(data));
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading'), 3000);
            }).finally(function () {
                $scope.isLoading = false;
            });
        }

        function initDesserts() {
            $scope.isLoading = true;
            MenuService.getMenuParts($stateParams.menuId, MenuService.menuParts.desserts).success(function (data) {
                $scope.desserts = JSON.parse(JSON.stringify(data));
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading'), 3000);
            }).finally(function () {
                $scope.isLoading = false;
            });
        }

        function isValidForm(form) {
            if (form['name'].$error.required) {
                Flash.clear();
                Flash.create('info', $translate.instant('error.required.name'), 5000);
                return false;
            }
            if (form['starterPrice'].$error.required) {
                Flash.clear();
                Flash.create('info', $translate.instant('error.required.price'), 5000);
                return false;
            }
            if (form['drinkPrice'].$error.required) {
                Flash.clear();
                Flash.create('info', $translate.instant('error.required.price'), 5000);
                return false;
            }
            if (form['mainPrice'].$error.required) {
                Flash.clear();
                Flash.create('info', $translate.instant('error.required.price'), 5000);
                return false;
            }
            if (form['dessertPrice'].$error.required) {
                Flash.clear();
                Flash.create('info', $translate.instant('error.required.price'), 5000);
                return false;
            }
            return true;
        }

        //CRUD methods
        $scope.saveMenu = function (form) {
            if (isValidForm(form)) {
                var id = $scope.menu.id;
                var name = $scope.menu.name;
                var starter = $scope.menu.starterPrice;
                var drink = $scope.menu.drinkPrice;
                var main = $scope.menu.mainPrice;
                var dessert = $scope.menu.dessertPrice;
                $scope.isSubmitActive = false;
                updateMenu(id, name, starter, main, drink, dessert);
            }
        };

        function updateMenu(menuId, name, starter, main, drink, dessert) {
            CrudService.updateItem(myApp.MENUS_ENDPOINT, menuId, {
                name: name,
                starterPrice: starter,
                drinkPrice: drink,
                mainPrice: main,
                dessertPrice: dessert
            }).success(function (data) {
                $scope.isAddFormShowing = false;
                Flash.clear();
                Flash.create('success', $translate.instant('message.updated'), 3000);
                $scope.init();
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.updating'), 3000);
            }).finally(function () {
                $scope.isSubmitActive = true;
                $scope.hideCreate();
            });
        }

        $scope.onSelect = function ($item, $model, $label) {
            $scope.product = $item;
        };

        $scope.saveProduct = function (form) {
            if ($scope.product != null) {
                $scope.isSubmitActive = false;
                MenuService.addProductToMenu($scope.menu.id, $scope.product.id, MenuService.addParts[$scope.addingType]).success(
                    function (data) {
                        switch ($scope.addingType) {
                            case 0:
                                $scope.drinks = JSON.parse(JSON.stringify(data));
                                break;
                            case 1:
                                $scope.starters = JSON.parse(JSON.stringify(data));
                                break;
                            case 2:
                                $scope.mains = JSON.parse(JSON.stringify(data));
                                break;
                            case 3:
                                $scope.desserts = JSON.parse(JSON.stringify(data));
                                break;
                        }
                    }
                ).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.adding'), 3000);
                }).finally(function () {
                    $scope.isSubmitActive = true;
                    $scope.hideCreate();
                });
            }
        };

        $scope.searchProducts = function () {
            ProductService.searchProducts($scope.product, null, null, true, null, null).success(function (data) {
                $scope.searchedProducts = JSON.parse(JSON.stringify(data)).items;
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading'), 3000);
            });
        };

        /*View Methods*/
        $scope.showCreate = function (type) {
            $scope.isAddProductShowing = true;
            $scope.addingType = type;
        };
        $scope.hideCreate = function () {
            $scope.isAddProductShowing = false;
            $scope.addingType = null;
        };

    }
]);
