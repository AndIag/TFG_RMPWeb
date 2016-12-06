angular.module('RestMaPla.bills.controller', ['ngFlash', 'ngDialog', 'RestMaPla.common'])
    .controller('BillCtrl', ['$scope', '$translate', 'Flash', 'ngDialog', 'BreadCrumbService', 'CrudService', 'PaginationService', 'FormValidators',
        /**
         *
         * @param $scope @link(https://docs.angularjs.org/guide/scope)
         * @param $translate @link(https://github.com/angular-translate/angular-translate)
         * @param Flash -- Used for error feedback @link(https://github.com/sachinchoolur/angular-flash)
         * @param ngDialog -- Used in add forms @link(https://github.com/likeastore/ngDialog)
         * @param BreadCrumbService -- Handles page Breadcrumbs @link(components/breadcrumb-service.js)
         * @param CrudService -- Handles basic CRUD operations @link(common/crud-service.js)
         * @param PaginationService -- Used to store data about page server side pagination
         * @param FormValidators -- Contains validation logic @link(components/form-validator.js)
         */
            function ($scope, $translate, Flash, ngDialog, BreadCrumbService, CrudService, PaginationService, FormValidators) {

            var dialog = null;
            $scope.pagination = PaginationService.data;
            $scope.values = CrudService.response;

            /**
             * Fist page request
             */
            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($translate.instant('views.index.bills'));
                getBillsPage(1);
            };

            /**
             * Load a new brands page
             * @param newPage given by dir-pagination-controls directive
             * @param oldPage given by dir-pagination-controls directive
             */
            $scope.changePage = function (newPage, oldPage) {
                getBillsPage(newPage);
            };

            /**
             * Use $scope.searchKeywords to find brand
             */
            $scope.searchByName = function () {
                $scope.isSearching = $scope.searchKeywords && $scope.searchKeywords.length;
                CrudService.findItemsByName(CrudService.endpoints.BILLS_ENDPOINT, $scope.searchKeywords).success(function (data) {
                    CrudService.response.bills = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            };

            /**
             * Open new add dialog using the provided template and @this as controller
             */
            $scope.showCreate = function () {
                $scope.bill = {};
                if (!CrudService.response.hasOwnProperty("suppliers")) loadSuppliers();
                dialog = ngDialog.open({template: 'view-bills/add/dialog.html', scope: $scope, controller: this});
            };

            /**
             * Try to post new brand($scope.brand) after validation
             * @param form TODO use for validation
             */
            $scope.saveItem = function (form) {
                $scope.errors = FormValidators.isValidBill($scope.bill, form);
                if (Object.keys($scope.errors).length === 0) {
                    CrudService.createItem(CrudService.endpoints.BILLS_ENDPOINT, $scope.bill).success(function (data) {
                        $scope.values.bills.items.push(data);
                        $scope.values.bills.count = $scope.values.bills.count + 1;
                        dialog.close();
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.adding'), 3000);
                    });
                }
            };

            /**
             * Delete given bill after verify no products references exist
             * @param bill given object to remove
             */
            $scope.removeBill = function (bill) {
                if (bill.numProducts == 0 && !bill.entry) {
                    CrudService.removeItem(CrudService.endpoints.BILLS_ENDPOINT, bill.id).success(function (data) {
                        CrudService.response.bills.items = CrudService.response.bills.items.filter(function (e) {
                            return e.id !== bill.id; //Filter bill list for remove the chosen one
                        });
                        CrudService.response.bills.count = CrudService.response.bills.count - 1;
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.removing'), 3000);
                    }).finally(function () {
                        $scope.isLoading = false;
                    });
                }
            };

            /**
             * Request a page of bills from service
             * @param page requested page
             */
            function getBillsPage(page) {
                PaginationService.data.currentPage = page;
                CrudService.getPaginatedItems(CrudService.endpoints.BILLS_ENDPOINT, (page - 1),
                    PaginationService.data.itemsPerPage).success(function (data) {
                    CrudService.response.bills = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

            // USED IN ADD BILL DIALOG TODO move to ... common?¿
            /**
             * Required by add product dialog for brand type-ahead
             */
            $scope.searchSupplier = function () {
                CrudService.findItemsByName(CrudService.endpoints.SUPPLIERS_ENDPOINT, $scope.bill.supplier).success(function (data) {
                    CrudService.response.suppliers = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            };

            /**
             * Load list of categories for add product dialog
             */
            function loadSuppliers() {
                CrudService.getItems(CrudService.endpoints.SUPPLIERS_ENDPOINT).success(function (data) {
                    CrudService.response.suppliers = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

        }]);
