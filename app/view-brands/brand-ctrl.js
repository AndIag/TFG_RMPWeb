angular.module('RestMaPla.brands.controller', ['ngFlash', 'ngDialog', 'RestMaPla.common'])
    .controller('BrandCtrl', ['$scope', '$translate', 'Flash', 'ngDialog', 'BreadCrumbService', 'CrudService', 'PaginationService', 'FormValidators',
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
                BreadCrumbService.setBreadCrumb($translate.instant('views.index.brands'));
                getBrandsPage(1);
            };

            /**
             * Load a new brands page
             * @param {number} newPage given by dir-pagination-controls directive
             * @param {number} oldPage given by dir-pagination-controls directive
             */
            $scope.changePage = function (newPage, oldPage) {
                getBrandsPage(newPage);
            };

            /**
             * Use $scope.searchKeywords to find brand
             */
            $scope.searchByName = function () {
                $scope.isSearching = $scope.searchKeywords && $scope.searchKeywords.length;
                CrudService.findItemsByName(CrudService.endpoints.BRANDS_ENDPOINT, $scope.searchKeywords).success(function (data) {
                    CrudService.response.brands = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            };

            /**
             * Open new add dialog using the provided template and @this as controller
             */
            $scope.showCreate = function () {
                $scope.brand = {};
                dialog = ngDialog.open({template: 'view-brands/add/dialog.html', scope: $scope, controller: this});
            };

            /**
             * Try to post new brand($scope.brand) after validation
             * @param form TODO use for validation
             */
            $scope.saveItem = function (form) {
                $scope.errors = FormValidators.isValidBrand($scope.brand, form);
                if (Object.keys($scope.errors).length === 0) {
                    CrudService.createItem(CrudService.endpoints.BRANDS_ENDPOINT, $scope.brand).success(function (data) {
                        $scope.values.brands.items.push(data);
                        $scope.values.brands.count = $scope.values.brands.count + 1;
                        dialog.close();
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.adding'), 3000);
                    });
                }
            };

            /**
             * Delete given brand after verify no products references exist
             * @param brand given object to remove
             */
            $scope.removeBrand = function (brand) {
                if (brand.numProducts == 0) {
                    CrudService.removeItem(CrudService.endpoints.BRANDS_ENDPOINT, brand.id).success(function (data) {
                        CrudService.response.brands.items = CrudService.response.brands.items.filter(function (e) {
                            return e.id !== brand.id; //Filter brand list for remove the chosen one
                        });
                        CrudService.response.brands.count = CrudService.response.brands.count - 1;
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.removing'), 3000);
                    }).finally(function () {
                        $scope.isLoading = false;
                    });
                }
            };

            /**
             * Request a page of brands from service
             * @param page requested page
             */
            function getBrandsPage(page) {
                PaginationService.data.currentPage = page;
                CrudService.getPaginatedItems(CrudService.endpoints.BRANDS_ENDPOINT, (page - 1),
                    PaginationService.data.itemsPerPage).success(function (data) {

                    CrudService.response.brands = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

        }]);
