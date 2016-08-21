myApp.controller('CategoryCtrl', ['$scope', '$state', '$stateParams', '$translate',
    'Flash', 'BreadcrumbManager', 'CategoryService', 'ServerData',

    function ($scope, $state, $stateParams, $translate, Flash, BreadcrumbManager, CategoryService, ServerData) {
        //View helpers
        $scope.isLoading = false; //Know if we need to show load screen
        $scope.isAddFormShowing = false;
        $scope.isSubmitActive = true;

        $scope.data = ServerData.data;
        //Create category values
        $scope.category = {};
        //Search
        $scope.searchKeywords = null;

        $scope.init = function(){
            BreadcrumbManager.changePage($translate.instant('views.index.categories'));
            $scope.isLoading = true;
            CategoryService.getCategories().success(function(data){
                ServerData.setCategories(JSON.parse(JSON.stringify(data)));
            }).error(function(data){
                Flash.create('danger', $translate.instant('error.loading.categories'), 3000);
            }).finally(function(){
                $scope.isLoading = false;
            });
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
            return true;
        };

        //CRUD methods
        $scope.saveCategory = function (form) {
            if(isValidForm(form)){
                $scope.isSubmitActive = false;
                var bid = $scope.category.id;
                var name = $scope.category.name;
                var url = $scope.category.url;
                (bid != undefined) ? updateCategory(bid,name,url) : createCategory(name, url);
            }
        };

        function createCategory(name, url){
            CategoryService.createCategory(name, url).success(function(data){
                $scope.isAddFormShowing = false;
                Flash.create('success', $translate.instant('message.category.added'), 3000);
                ServerData.addCategory(JSON.parse(JSON.stringify(data)));
            }).error(function(data){
                Flash.create('danger', $translate.instant('error.creating.category'), 3000);
            }).finally(function(){
                $scope.isSubmitActive = true;
                $scope.hideCreate();
            });
        };

        function updateCategory(bid, name, url){
            CategoryService.updateCategory(bid, name, url).success(function(data){
                $scope.isAddFormShowing = false;
                Flash.create('success', $translate.instant('message.category.added'), 3000);
                $scope.init();
            }).error(function(data){
                Flash.create('danger', $translate.instant('error.updating.category'), 3000);
            }).finally(function(){
                $scope.isSubmitActive = true;
                $scope.hideCreate();
            });
        };

        $scope.removeCategory = function(category, index) {
            category.disabled = true;
            CategoryService.removeCategory(category.id).success(function(data){
                ServerData.removeCategory(index);
                Flash.create('success', $translate.instant('message.category.removed'), 3000);
            }).error(function(data){
                Flash.create('danger', $translate.instant('error.removing.category'), 3000);
                category.disabled = false;
            });
        };

        $scope.searchByName = function(){
            $scope.isLoading = true;
            if($scope.searchKeywords.length == 0){
                CategoryService.getCategories().success(function(data){
                    ServerData.setCategories(JSON.parse(JSON.stringify(data)));
                }).error(function(data){
                    Flash.create('danger', $translate.instant('error.loading.categories'), 3000);
                }).finally(function(){
                    $scope.isLoading = false;
                });
            } else if($scope.searchKeywords.length > 0){
                CategoryService.getCategoriesByName($scope.searchKeywords).success(function(data){
                    var json = JSON.parse(JSON.stringify(data));
                    if(json.length > 0){
                        ServerData.setCategories(json);
                    }else{
                        Flash.create('info', $translate.instant('error.no-more-results'), 1000);
                    }
                }).error(function(data){
                    Flash.create('danger', $translate.instant('error.loading.categories'), 3000);
                }).finally(function(){
                    $scope.isLoading = false;
                });
            }
        };

        /*View Methods*/
        $scope.showCreate = function(){
            $scope.isAddFormShowing = true;
        };
        $scope.hideCreate = function(){
            $scope.isAddFormShowing = false;
            $scope.category = {};
        };
        $scope.showDetails = function(category){
            $scope.category = category;
            $scope.isAddFormShowing = true;
        };
    }
]);
