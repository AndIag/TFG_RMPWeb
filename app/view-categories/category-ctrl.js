angular.module('RestMaPla.categories.controller', ['ngFlash', 'ngDialog', 'RestMaPla.common'])
    .controller('CategoryCtrl', ['$scope', '$translate', 'Flash', 'ngDialog', 'BreadCrumbService', 'CrudService', 'FormValidators',
        /**
         *
         * @param $scope @link(https://docs.angularjs.org/guide/scope)
         * @param $translate @link(https://github.com/angular-translate/angular-translate)
         * @param Flash -- Used for error feedback @link(https://github.com/sachinchoolur/angular-flash)
         * @param ngDialog -- Used in add forms @link(https://github.com/likeastore/ngDialog)
         * @param BreadCrumbService -- Handles page Breadcrumbs @link(common/breadcrumb-service.js)
         * @param CrudService -- Handles basic CRUD operations @link(common/crud-service.js)
         * @param FormValidators -- Contains validation logic @link(common/form-validator.js)
         */
            function ($scope, $translate, Flash, ngDialog, BreadCrumbService, CrudService, FormValidators) {

            var dialog = null;
            $scope.values = CrudService.response;

            /**
             * First data load on page selected
             */
            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($translate.instant('views.index.categories'));
                CrudService.getItems(CrudService.endpoints.CATEGORIES_ENDPOINT).success(function (data) {
                    CrudService.response.categories = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            };

            /**
             * Use $scope.searchKeywords to find categories
             */
            $scope.searchByName = function () {
                $scope.isSearching = $scope.searchKeywords && $scope.searchKeywords.length;
                CrudService.findItemsByName(CrudService.endpoints.CATEGORIES_ENDPOINT, $scope.searchKeywords).success(function (data) {
                    CrudService.response.categories = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            };

            /**
             * Open new add dialog using the provided template and @this as controller
             */
            $scope.showCreate = function () {
                $scope.category = {};
                dialog = ngDialog.open({template: 'view-categories/add/dialog.html', scope: $scope, controller: this});
            };

            /**
             * Try to post new category($scope.category) after validation
             * @param form TODO use for validation
             */
            $scope.saveItem = function (form) {
                $scope.errors = FormValidators.isValidCategory($scope.category, form);
                if (Object.keys($scope.errors).length === 0) { //Validation pass successfully
                    CrudService.createItem(CrudService.endpoints.CATEGORIES_ENDPOINT, $scope.category).success(function (data) {
                        $scope.values.categories.push(data); //Add new category to list
                        dialog.close();
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.adding'), 3000);
                    });
                }
            };

            /**
             * Delete given category after verify no products references exist
             * @param category given object to remove
             */
            $scope.removeCategory = function (category) {
                if (category.numProducts == 0) {
                    CrudService.removeItem(CrudService.endpoints.CATEGORIES_ENDPOINT, category.id).success(function (data) {
                        CrudService.response.categories = CrudService.response.categories.filter(function (e) {
                            return e.id !== category.id; //Filter category list for remove the chosen one
                        })
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.removing'), 3000);
                    }).finally(function () {
                        $scope.isLoading = false;
                    });
                }
            }
        }]);
