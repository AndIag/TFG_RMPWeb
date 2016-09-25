myApp.controller('MenuCtrl', ['$scope', '$state', '$stateParams', '$translate',
    'Flash', 'BreadcrumbManager', 'CrudService', 'ServerData',

    function ($scope, $state, $stateParams, $translate, Flash, BreadcrumbManager, CrudService, ServerData) {
        //View helpers
        $scope.isLoading = false; //Know if we need to show load screen
        $scope.isAddFormShowing = false;
        $scope.isSubmitActive = true;
        $scope.showClose = true;
        $scope.showLegend = true;
        $scope.currencySymbol = '€';
        //Page-By-Page things
        $scope.totalItems = 0;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;

        $scope.data = ServerData.data;
        $scope.menu = {};

        $scope.init = function () {
            BreadcrumbManager.changePage($translate.instant('views.index.menus'));
            getPage(1);
        };

        // Load brands or products from server
        $scope.pageChanged = function (newPage) {
            getPage(newPage);
        };

        function getPage(pageNumber) { //Page by page for brands
            $scope.isLoading = true;
            CrudService.getPaginatedItems(myApp.MENUS_ENDPOINT, pageNumber - 1, $scope.itemsPerPage).success(function (data) {
                var json = JSON.parse(JSON.stringify(data));
                ServerData.setMenus(json.items);
                $scope.totalItems = json.count;
                $scope.currentPage = pageNumber;
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading.menus'), 3000);
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
                var name = $scope.menu.name;
                var starter = $scope.menu.starterPrice;
                var drink = $scope.menu.drinkPrice;
                var main = $scope.menu.mainPrice;
                var dessert = $scope.menu.dessertPrice;
                $scope.isSubmitActive = false;
                createMenu(name, starter, main, drink, dessert);
            }
        };

        function createMenu(name, starter, main, drink, dessert) {
            CrudService.createItem(myApp.MENUS_ENDPOINT, {
                name: name,
                starterPrice: starter,
                drinkPrice: drink,
                mainPrice: main,
                dessertPrice: dessert
            }).success(function (data) {
                $scope.isAddFormShowing = false;
                Flash.clear();
                Flash.create('success', $translate.instant('message.menu.added'), 3000);
                ServerData.addMenu(JSON.parse(JSON.stringify(data)));
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.creating.menu'), 3000);
            }).finally(function () {
                $scope.isSubmitActive = true;
                Flash.clear();
                $scope.hideCreate();
            });
        }

        $scope.removeMenu = function (menu, index) {
            menu.disabled = true;
            CrudService.removeItem(myApp.MENUS_ENDPOINT, menu.id).success(function (data) {
                ServerData.removeMenu(index);
                Flash.clear();
                Flash.create('success', $translate.instant('message.menu.removed'), 3000);
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.removing.menu'), 3000);
                menu.disabled = false;
            });
        };

        /*View Methods*/
        $scope.showCreate = function () {
            $scope.isAddFormShowing = true;
        };
        $scope.hideCreate = function () {
            $scope.isAddFormShowing = false;
            $scope.menu = {};
        };
        $scope.showDetails = function (menu) {
            $scope.currentProductsPage = 1;
            $state.go('menu-details', {'menuId': menu.id});
        };

    }
]);
