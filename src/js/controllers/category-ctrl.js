angular.module('RestMaPla')
    .controller('CategoryCtrl', ['$scope', '$state', '$stateParams', '$translate', 'AlertsManager', 'BreadcrumbManager', 'CategoryService', CategoryCtrl]);

function CategoryCtrl($scope, $state, $stateParams, $translate, AlertsManager, BreadcrumbManager, CategoryService) {
    $scope.isLoading = false; //Know if we need to show load screen
    //Initial values we need to load brands with PbP
    $scope.categories = [];
    //Create brand values
    $scope.isCreateOrUpdateShowing = false;
    $scope.createOrUpdateValues = {};
    $scope.isSubmitActive = true;
    //Brand details values
    $scope.selectedCategory = null;

    $scope.init = function(){
        BreadcrumbManager.changePage($translate.instant('views.index.categories'));
        $scope.isLoading = true;
        CategoryService.getCategories().success(function(data){
            $scope.categories = JSON.parse(JSON.stringify(data));
        }).error(function(data){
            AlertsManager.addAlert('danger', $translate.instant('error.loading.categories'));
        }).finally(function(){
            $scope.isLoading = false;
        });
    };

    function isValidForm(form){
        if(form['url'].$error.url != undefined){
            AlertsManager.addAlert('danger', $translate.instant('error.url'));
            return false;
        }
        if(form['name'].$error.required){
            AlertsManager.addAlert('danger', $translate.instant('error.required.name'));
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
            AlertsManager.addAlert('success', $translate.instant('message.category.added'));
            $scope.categories.push(JSON.parse(JSON.stringify(data)));
        }).error(function(data){
            AlertsManager.addAlert('danger', $translate.instant('error.creating.category'));
        }).finally(function(){
            $scope.isSubmitActive = true;
            $scope.hideCreate();
        });
    }

    function updateCategory(bid, name, url){
        CategoryService.updateCategory(bid, name, url).success(function(data){
            $scope.isCreateOrUpdateShowing = false;
            AlertsManager.addAlert('success', $translate.instant('message.category.added'));
            $scope.init();
        }).error(function(data){
            AlertsManager.addAlert('danger', $translate.instant('error.creating.category'));
        }).finally(function(){
            $scope.isSubmitActive = true;
            $scope.hideCreate();
        });
    }

    $scope.removeCategory = function(category, index) {
        category.disabled = true;
        CategoryService.removeCategory(category.id).success(function(data){
            $scope.categories.splice(index, 1);
            AlertsManager.addAlert('success', $translate.instant('message.category.removed'));
        }).error(function(data){
            AlertsManager.addAlert('danger', $translate.instant('error.removing.category'));
            category.disabled = false;
        });
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
