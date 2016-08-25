myApp.controller('MenuDetailsCtrl', ['$scope', '$state', '$stateParams', '$translate',
    'Flash', 'BreadcrumbManager', 'MenuService', 'ServerData',

    function ($scope, $state, $stateParams, $translate, Flash, BreadcrumbManager, MenuService, ServerData) {
        //View helpers
        $scope.isLoading = false; //Know if we need to show load screen
        $scope.isAddFormShowing = false;
        $scope.isSubmitActive = true;
        $scope.currencySymbol = '€';

        $scope.menu = {};
        $scope.starters = [];
        $scope.drinks = [];
        $scope.mains = [];
        $scope.desserts = [];

        $scope.init = function(){
            BreadcrumbManager.changePage($translate.instant('views.index.menus'));
            MenuService.getMenuById($stateParams.menuId).success(function(data){
                $scope.menu = JSON.parse(JSON.stringify(data));
                BreadcrumbManager.changePage($scope.menu.name);
            }).error(function(data){
                Flash.create('danger', $translate.instant('error.loading.menus'), 3000);
            }).finally(function(){
                $scope.isLoading = false;
            });
            initStarters();
            initDrinks();
            initMains();
            initDesserts();
        };

        function initStarters(){
            MenuService.getStarters($stateParams.menuId).success(function(data){
                $scope.starters = JSON.parse(JSON.stringify(data));
            }).error(function(data){
                Flash.create('danger', $translate.instant('error.loading.menus'), 3000);
            }).finally(function(){
                $scope.isLoading = false;
            });
        };

        function initDrinks(){
            MenuService.getDrinks($stateParams.menuId).success(function(data){
                $scope.drinks = JSON.parse(JSON.stringify(data));
            }).error(function(data){
                Flash.create('danger', $translate.instant('error.loading.menus'), 3000);
            }).finally(function(){
                $scope.isLoading = false;
            });
        };

        function initMains(){
            MenuService.getMains($stateParams.menuId).success(function(data){
                $scope.mains = JSON.parse(JSON.stringify(data));
            }).error(function(data){
                Flash.create('danger', $translate.instant('error.loading.menus'), 3000);
            }).finally(function(){
                $scope.isLoading = false;
            });
        };

        function initDesserts(){
            MenuService.getDesserts($stateParams.menuId).success(function(data){
                $scope.desserts = JSON.parse(JSON.stringify(data));
            }).error(function(data){
                Flash.create('danger', $translate.instant('error.loading.menus'), 3000);
            }).finally(function(){
                $scope.isLoading = false;
            });
        };

        function isValidForm(form){
            if(form['name'].$error.required){
                Flash.create('info', $translate.instant('error.required.name'), 5000);
                return false;
            }
            if(form['starterPrice'].$error.required){
                Flash.create('info', $translate.instant('error.required.price'), 5000);
                return false;
            }
            if(form['drinkPrice'].$error.required){
                Flash.create('info', $translate.instant('error.required.price'), 5000);
                return false;
            }
            if(form['mainPrice'].$error.required){
                Flash.create('info', $translate.instant('error.required.price'), 5000);
                return false;
            }
            if(form['dessertPrice'].$error.required){
                Flash.create('info', $translate.instant('error.required.price'), 5000);
                return false;
            }
            return true;
        };

        //CRUD methods
        $scope.saveMenu = function (form) {
            if(isValidForm(form)){
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

        function updateMenu(id, name, starter, main, drink, dessert){
            MenuService.updateMenu(id, name, starter, main, drink, dessert).success(function(data){
                $scope.isAddFormShowing = false;
                Flash.create('success', $translate.instant('message.menu.updated'), 3000);
                $scope.init();
            }).error(function(data){
                Flash.create('danger', $translate.instant('error.updating.menu'), 3000);
            }).finally(function(){
                $scope.isSubmitActive = true;
                $scope.hideCreate();
            });
        };

        /*View Methods*/
        $scope.showCreate = function(){
            $scope.isAddFormShowing = true;
        };
        $scope.hideCreate = function(){
            $scope.isAddFormShowing = false;
            $scope.menu = {};
        };

    }
]);
