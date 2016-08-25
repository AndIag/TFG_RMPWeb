myApp.controller('MenuCtrl', ['$scope', '$state', '$stateParams', '$translate',
    'Flash', 'BreadcrumbManager', 'MenuService', 'ServerData',

    function ($scope, $state, $stateParams, $translate, Flash, BreadcrumbManager, MenuService, ServerData) {
        //View helpers
        $scope.isLoading = false; //Know if we need to show load screen
        $scope.isAddFormShowing = false;
        $scope.isSubmitActive = true;
        $scope.currencySymbol = '€';
        //Page-By-Page things
        $scope.totalItems = 0;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;

        $scope.data = ServerData.data;
        $scope.menu = {};

        $scope.init = function(){
            BreadcrumbManager.changePage($translate.instant('views.index.menus'));
            getPage(1);
        };

        // Load brands or products from server
        $scope.pageChanged = function(newPage){
            getPage(newPage);
        };

        function getPage(pageNumber) { //Page by page for brands
            $scope.isLoading = true;
            MenuService.getMenus(pageNumber-1, $scope.itemsPerPage).success(function(data){
                var json = JSON.parse(JSON.stringify(data));
                ServerData.setMenus(json.items);
                $scope.totalItems = json.count;
                $scope.currentPage = pageNumber;
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
            if(form['starter'].$error.required){
                Flash.create('info', $translate.instant('error.required.price'), 5000);
                return false;
            }
            if(form['drink'].$error.required){
                Flash.create('info', $translate.instant('error.required.price'), 5000);
                return false;
            }
            if(form['main'].$error.required){
                Flash.create('info', $translate.instant('error.required.price'), 5000);
                return false;
            }
            if(form['dessert'].$error.required){
                Flash.create('info', $translate.instant('error.required.price'), 5000);
                return false;
            }
            return true;
        };

        //CRUD methods
        $scope.saveMenu = function (form) {
            if(isValidForm(form)){
                var name = $scope.menu.name;
                var starter = $scope.menu.starter;
                var drink = $scope.menu.drink;
                var main = $scope.menu.main;
                var dessert = $scope.menu.dessert;
                $scope.isSubmitActive = false;
                createMenu(name, starter, main, drink, dessert);
            }
        };

        function createMenu(name, starter, main, drink, dessert){
            MenuService.createMenu(name, starter, main, drink, dessert).success(function(data){
                $scope.isAddFormShowing = false;
                Flash.create('success', $translate.instant('message.menu.added'), 3000);
                ServerData.addMenu(JSON.parse(JSON.stringify(data)));
            }).error(function(data){
                Flash.create('danger', $translate.instant('error.creating.menu'), 3000);
            }).finally(function(){
                $scope.isSubmitActive = true;
                $scope.hideCreate();
            });
        };

        function updateMenu(bid, name, url){
            MenuService.updateMenu(bid, name, url).success(function(data){
                $scope.isAddFormShowing = false;
                Flash.create('success', $translate.instant('message.menu.added'), 3000);
                $scope.init();
            }).error(function(data){
                Flash.create('danger', $translate.instant('error.updating.menu'), 3000);
            }).finally(function(){
                $scope.isSubmitActive = true;
                $scope.hideCreate();
            });
        };

        $scope.removeMenu = function(menu, index) {
            menu.disabled = true;
            MenuService.removeMenu(menu.id).success(function(data){
                ServerData.removeMenu(index);
                Flash.create('success', $translate.instant('message.menu.removed'), 3000);
            }).error(function(data){
                Flash.create('danger', $translate.instant('error.removing.menu'), 3000);
                menu.disabled = false;
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
        $scope.showDetails = function(menu){
            $scope.menu = menu;
            $scope.isAddFormShowing = true;
        };

    }
]);
