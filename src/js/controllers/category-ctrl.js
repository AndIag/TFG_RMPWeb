myApp.controller('CategoryCtrl', ['$scope', '$state', '$stateParams', '$translate',
    'Flash', 'BreadcrumbManager', 'CrudService', 'ServerData',

    function ($scope, $state, $stateParams, $translate, Flash, BreadcrumbManager, CrudService, ServerData) {
        //View helpers
        $scope.isLoading = false;
        $scope.isAddFormShowing = false;
        $scope.isSubmitActive = true;
        $scope.legendMessage = null;

        $scope.data = ServerData.data;
        $scope.category = {};
        $scope.searchKeywords = null;

        $scope.init = function () {
            BreadcrumbManager.changePage($translate.instant('views.index.categories'));
            $scope.isLoading = true;
            CrudService.getItems(myApp.CATEGORIES_ENDPOINT).success(function (data) {
                ServerData.setCategories(JSON.parse(JSON.stringify(data)));
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading.categories'), 3000);
            }).finally(function () {
                $scope.isLoading = false;
            });
        };

        function isValidForm(form) {
            Flash.clear();
            if (form['url'].$error.url != undefined) {
                Flash.create('info', $translate.instant('error.invalid.url'), 5000);
                return false;
            }
            if (form['name'].$error.required) {
                Flash.create('info', $translate.instant('error.required.name'), 5000);
                return false;
            }
            return true;
        }

        //CRUD methods
        $scope.saveCategory = function (form) {
            if (isValidForm(form)) {
                $scope.isSubmitActive = false;
                var bid = $scope.category.id;
                var name = $scope.category.name;
                var url = $scope.category.url;
                (bid != undefined) ? updateCategory(bid, name, url) : createCategory(name, url);
            }
        };

        function createCategory(name, url) {
            CrudService.createItem(myApp.CATEGORIES_ENDPOINT, {name: name, url: url}).success(function (data) {
                $scope.isAddFormShowing = false;
                Flash.create('success', $translate.instant('message.category.added'), 3000);
                ServerData.addCategory(JSON.parse(JSON.stringify(data)));
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.creating.category'), 3000);
            }).finally(function () {
                $scope.isSubmitActive = true;
                $scope.hideCreate();
            });
        }

        function updateCategory(categoryId, name, url) {
            CrudService.updateItem(myApp.CATEGORIES_ENDPOINT, categoryId, {
                name: name,
                url: url
            }).success(function (data) {
                $scope.isAddFormShowing = false;
                Flash.clear();
                Flash.create('success', $translate.instant('message.category.added'), 3000);
                $scope.init();
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.updating.category'), 3000);
            }).finally(function () {
                $scope.isSubmitActive = true;
                $scope.hideCreate();
            });
        }

        $scope.removeCategory = function (category, index) {
            category.disabled = true;
            CrudService.removeItem(myApp.CATEGORIES_ENDPOINT, category.id).success(function (data) {
                ServerData.removeCategory(index);
                Flash.clear();
                Flash.create('success', $translate.instant('message.category.removed'), 3000);
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.removing.category'), 3000);
                category.disabled = false;
            });
        };

        $scope.searchByName = function () {
            $scope.isLoading = true;
            if ($scope.searchKeywords.length == 0) {
                CrudService.getItems(myApp.CATEGORIES_ENDPOINT).success(function (data) {
                    ServerData.setCategories(JSON.parse(JSON.stringify(data)));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading.categories'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            } else if ($scope.searchKeywords.length > 0) {
                CrudService.findItemsByName(myApp.CATEGORIES_ENDPOINT, $scope.searchKeywords).success(function (data) {
                    var json = JSON.parse(JSON.stringify(data));
                    if (json.length > 0) {
                        ServerData.setCategories(json);
                    } else {
                        Flash.clear();
                        Flash.create('info', $translate.instant('error.no-more-results'), 1000);
                    }
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading.categories'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            }
        };

        /*View Methods*/
        $scope.showCreate = function () {
            $scope.isAddFormShowing = true;
            $scope.legendMessage = $translate.instant('action.add') + ' ' + $translate.instant('category');
        };
        $scope.hideCreate = function () {
            $scope.isAddFormShowing = false;
            $scope.category = {};
        };
        $scope.showDetails = function (category) {
            $scope.category = category;
            $scope.isAddFormShowing = true;
            $scope.legendMessage = $translate.instant('action.modify') + ' ' + $translate.instant('category');
        };
    }
]);
