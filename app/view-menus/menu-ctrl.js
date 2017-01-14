angular.module('RestMaPla.menus.controller', ['ngFlash', 'ngDialog', 'RestMaPla.common'])
    .controller('MenuCtrl', ['$scope', '$state', '$auth', '$translate', 'Flash', 'ngDialog', 'BreadCrumbService', 'CrudService', 'PaginationService', 'FormValidators',
        /**
         *
         * @param $scope @link(https://docs.angularjs.org/guide/scope)
         * @param $state
         * @param $auth
         * @param $translate @link(https://github.com/angular-translate/angular-translate)
         * @param Flash -- Used for error feedback @link(https://github.com/sachinchoolur/angular-flash)
         * @param ngDialog -- Used in add forms @link(https://github.com/likeastore/ngDialog)
         * @param BreadCrumbService -- Handles page Breadcrumbs @link(components/breadcrumb-service.js)
         * @param CrudService -- Handles basic CRUD operations @link(common/crud-service.js)
         * @param PaginationService -- Used to store data about page server side pagination
         * @param FormValidators -- Contains validation logic @link(components/form-validator.js)
         */
            function ($scope, $state, $auth, $translate, Flash, ngDialog, BreadCrumbService, CrudService, PaginationService, FormValidators) {

            var dialog = null;
            $scope.pagination = PaginationService.data;
            $scope.values = CrudService.response;

            /**
             * Fist page request
             */
            $scope.init = function () {
                if (!$auth.isAuthenticated()) {
                    $state.go('login');
                    return;
                }
                BreadCrumbService.setBreadCrumb($translate.instant('views.index.menus'));
                getMenusPage(1);
            };

            /**
             * Load a new brands page
             * @param {number} newPage given by dir-pagination-controls directive
             * @param {number} oldPage given by dir-pagination-controls directive
             */
            $scope.changePage = function (newPage, oldPage) {
                getMenusPage(newPage);
            };

            $scope.searchByName = function () {
                //TODO not implemented yet
            };

            /**
             * Open new add dialog using the provided template and @this as controller
             */
            $scope.showCreate = function () {
                $scope.menu = {};
                dialog = ngDialog.open({template: 'view-menus/add/dialog.html', scope: $scope, controller: this});
            };

            /**
             * Try to post new menu($scope.menu) after validation
             * @param form TODO use for validation
             */
            $scope.saveItem = function (form) {
                $scope.errors = FormValidators.isValidMenu($scope.menu, form);
                if (Object.keys($scope.errors).length === 0) {
                    CrudService.createItem(CrudService.endpoints.MENUS_ENDPOINT, $scope.menu).success(function (data) {
                        $scope.values.menus.items.push(data);
                        $scope.values.menus.count = $scope.values.menus.count + 1;
                        dialog.close();
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.adding'), 3000);
                    });
                }
            };

            /**
             * Delete given menu after verify no products references exist
             * @param menu given object to remove
             */
            $scope.removeMenu = function (menu) {
                CrudService.removeItem(CrudService.endpoints.MENUS_ENDPOINT, menu.id).success(function (data) {
                    CrudService.response.menus.items = CrudService.response.menus.items.filter(function (e) {
                        return e.id !== menu.id;
                    });
                    CrudService.response.menus.count = CrudService.response.menus.count - 1;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.removing'), 3000);
                });
            };

            /**
             * Request a page of brands from service
             * @param page requested page
             */
            function getMenusPage(page) {
                PaginationService.data.currentPage = page;
                CrudService.getPaginatedItems(CrudService.endpoints.MENUS_ENDPOINT, (page - 1),
                    PaginationService.data.itemsPerPage).success(function (data) {

                    CrudService.response.menus = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

        }]);
