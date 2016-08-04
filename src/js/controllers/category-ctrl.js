angular.module('RestMaPla')
    .factory('CategoryFactory', [CategoryFactory])
    .controller('CategoryCtrl', ['$scope', '$state', '$stateParams', '$translate', 'Flash', 'BreadcrumbManager', 'CategoryService', 'CategoryFactory', CategoryCtrl]);

function CategoryCtrl($scope, $state, $stateParams, $translate, Flash, BreadcrumbManager, CategoryService, CategoryFactory) {
    $scope.isLoading = false; //Know if we need to show load screen
    //Initial values we need to load brands with PbP
    $scope.data = CategoryFactory.data;
    //Create brand values
    $scope.isCreateOrUpdateShowing = false;
    $scope.createOrUpdateValues = {};
    $scope.isSubmitActive = true;
    //Brand details values
    $scope.selectedCategory = null;
    //Search
    $scope.searchKeywords = null;

    $scope.init = function(){
        BreadcrumbManager.changePage($translate.instant('views.index.categories'));
        $scope.isLoading = true;
        CategoryService.getCategories().success(function(data){
            CategoryFactory.setCategories(JSON.parse(JSON.stringify(data)));
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
    $scope.save = function (form) {
        if(isValidForm(form)){
            $scope.isSubmitActive = false;
            var bid = $scope.createOrUpdateValues.id;
            var name = $scope.createOrUpdateValues.name;
            var url = $scope.createOrUpdateValues.url;
            (bid != undefined) ? updateCategory(bid,name,url) : createCategory(name, url);
        }
    };

    function createCategory(name, url){
        CategoryService.createCategory(name, url).success(function(data){
            $scope.isCreateOrUpdateShowing = false;
            Flash.create('success', $translate.instant('message.category.added'), 3000);
            CategoryFactory.addCategory(JSON.parse(JSON.stringify(data)));
        }).error(function(data){
            Flash.create('danger', $translate.instant('error.creating.category'), 3000);
        }).finally(function(){
            $scope.isSubmitActive = true;
            $scope.hideCreate();
        });
    }

    function updateCategory(bid, name, url){
        CategoryService.updateCategory(bid, name, url).success(function(data){
            $scope.isCreateOrUpdateShowing = false;
            Flash.create('success', $translate.instant('message.category.added'), 3000);
            $scope.init();
        }).error(function(data){
            Flash.create('danger', $translate.instant('error.updating.category'), 3000);
        }).finally(function(){
            $scope.isSubmitActive = true;
            $scope.hideCreate();
        });
    }

    $scope.removeCategory = function(category, index) {
        category.disabled = true;
        CategoryService.removeCategory(category.id).success(function(data){
            CategoryFactory.removeCategory(index);
            Flash.create('success', $translate.instant('message.category.removed'), 3000);
        }).error(function(data){
            Flash.create('danger', $translate.instant('error.removing.category'), 3000);
            category.disabled = false;
        });
    };

    $scope.searchByName = function(){
        if($scope.searchKeywords.length == 0){
            $scope.isLoading = true;
            CategoryService.getCategories().success(function(data){
                CategoryFactory.setCategories(JSON.parse(JSON.stringify(data)));
            }).error(function(data){
                Flash.create('danger', $translate.instant('error.loading.categories'), 3000);
            }).finally(function(){
                $scope.isLoading = false;
            });
        } else if($scope.searchKeywords.length > 0){
            $scope.isLoading = true;
            CategoryService.getCategoriesByName($scope.searchKeywords).success(function(data){
                CategoryFactory.setCategories(JSON.parse(JSON.stringify(data)));
            }).error(function(data){
                Flash.create('danger', $translate.instant('error.loading.categories'), 3000);
            }).finally(function(){
                $scope.isLoading = false;
            });
        }
    };

    /*View Methods*/
    $scope.showCreate = function(){
        $scope.isCreateOrUpdateShowing = true;
    };
    $scope.hideCreate = function(){
        $scope.isCreateOrUpdateShowing = false;
        $scope.createOrUpdateValues = {};
    };
    $scope.showDetails = function(category){
        $scope.createOrUpdateValues = category;
        $scope.isCreateOrUpdateShowing = true;
    }
}

function CategoryFactory() {
    return {
        data: {
            categories: []
        }, setCategories: function(data) {
            this.data.categories = data;
        }, removeCategory: function(index) {
            this.data.categories.splice(index, 1);
        }, addCategory: function(c){
            this.data.categories.push(c);
        }
    }
};
