angular.module('RestMaPla.suppliers.controller', ['ngFlash', 'ngDialog', 'RestMaPla.common'])
    .controller('SupplierCtrl', ['$scope', '$state', '$auth', '$translate', 'Flash', 'ngDialog', 'BreadCrumbService', 'CrudService', 'PaginationService', 'FormValidators',
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
                BreadCrumbService.setBreadCrumb($translate.instant('views.index.suppliers'));
                getSuppliersPage(1);
            };

            /**
             * Load a new brands page
             * @param {number} newPage given by dir-pagination-controls directive
             * @param {number} oldPage given by dir-pagination-controls directive
             */
            $scope.changePage = function (newPage, oldPage) {
                getSuppliersPage(newPage);
            };

            /**
             * Use $scope.searchKeywords to find brand
             */
            $scope.searchByName = function () {
                $scope.isSearching = $scope.searchKeywords && $scope.searchKeywords.length;
                CrudService.findItemsByName(CrudService.endpoints.SUPPLIERS_ENDPOINT, $scope.searchKeywords).success(function (data) {
                    CrudService.response.suppliers = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            };

            /**
             * Open new add dialog using the provided template and @this as controller
             */
            $scope.showCreate = function () {
                $scope.supplier = {};
                dialog = ngDialog.open({template: 'view-suppliers/add/dialog.html', scope: $scope, controller: this});
            };

            /**
             * Try to post new supplier($scope.supplier) after validation
             * @param form TODO use for validation
             */
            $scope.saveItem = function (form) {
                if (($scope.errors = FormValidators.isValidSupplier($scope.supplier, form)) === {}) {
                    CrudService.createItem(CrudService.endpoints.SUPPLIERS_ENDPOINT, $scope.supplier).success(function (data) {
                        $scope.values.suppliers.items.push(data);
                        $scope.values.suppliers.count = $scope.values.suppliers.count + 1;
                        dialog.close();
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.adding'), 3000);
                    });
                }
            };

            /**
             * Delete given supplier after verify no products references exist
             * @param supplier given object to remove
             */
            $scope.removeSupplier = function (supplier) {
                if (supplier.numProducts == 0) {
                    CrudService.removeItem(CrudService.endpoints.SUPPLIERS_ENDPOINT, supplier.id).success(function (data) {
                        CrudService.response.suppliers.items = CrudService.response.suppliers.items.filter(function (e) {
                            return e.id !== supplier.id; //Filter suppliers list for remove the chosen one
                        });
                        CrudService.response.suppliers.count = CrudService.response.suppliers.count - 1;
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.removing'), 3000);
                    }).finally(function () {
                        $scope.isLoading = false;
                    });
                }
            };

            /**
             * Request a page of suppliers from service
             * @param page requested page
             */
            function getSuppliersPage(page) {
                PaginationService.data.currentPage = page;
                CrudService.getPaginatedItems(CrudService.endpoints.SUPPLIERS_ENDPOINT, (page - 1),
                    PaginationService.data.itemsPerPage).success(function (data) {

                    CrudService.response.suppliers = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

        }]);
