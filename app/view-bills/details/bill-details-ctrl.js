angular.module('RestMaPla.bill.controller', ['ngFlash', 'RestMaPla.common'])
    .controller('BillDetailsCtrl', ['$scope', '$stateParams', '$translate', 'Flash', 'BreadCrumbService', 'CrudService', 'ProductService', 'PaginationService',
        /**
         *
         * @param $scope @link(https://docs.angularjs.org/guide/scope)
         * @param $stateParams @link(https://github.com/angular-ui/ui-router/wiki)
         * @param $translate @link(https://github.com/angular-translate/angular-translate)
         * @param Flash -- Used for error feedback @link(https://github.com/sachinchoolur/angular-flash)
         * @param BreadCrumbService -- Handles page Breadcrumbs @link(common/breadcrumb-service.js)
         * @param CrudService -- Handles basic CRUD operations @link(common/crud-service.js)
         * @param ProductService -- Handles harder queries as product filter @link(view-products/products.js)
         * @param PaginationService -- Contains pagination variables @link(common/pagination.js)
         */
            function ($scope, $stateParams, $translate, Flash, BreadCrumbService, CrudService, ProductService, PaginationService) {
            $scope.pagination = PaginationService.data;

            $scope.bill = $stateParams.bill;
            $scope.values = CrudService.response;
            $scope.legend = $translate.instant("action.modify") + ' ' + $translate.instant("word.bill");
            $scope.isDetailsForm = true;

            /**
             * First data load on page selected. Loading page 1
             */
            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($translate.instant('word.bill') + ' ' + $stateParams.bill.id);
                findBillDetails(1);
            };

            /**
             * Load a new products page
             * @param newPage given by dir-pagination-controls directive
             * @param oldPage given by dir-pagination-controls directive
             */
            $scope.changePage = function (newPage, oldPage) {
                findBillDetails(newPage);
            };

            /**
             * Use $scope.searchKeywords and $scope.bill.id to find products
             */
            $scope.searchByName = function () {
                $scope.isSearching = $scope.searchKeywords && $scope.searchKeywords.length;
                ProductService.searchProduct($scope.searchKeywords, null, null, null, $scope.bill.id,
                    (PaginationService.data.currentPage - 1), PaginationService.data.itemsPerPage).success(function (data) {

                    CrudService.response.products = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            };

            /**
             * Load new products page for given bill
             * @param page page to load
             */
            function findBillDetails(page) {
                PaginationService.data.currentPage = page;
                CrudService.findPaginatedItemDetailsById(CrudService.endpoints.BILLS_ENDPOINT, $scope.bill.id,
                    (page - 1), PaginationService.data.itemsPerPage).success(function (data) {

                    CrudService.response.products = JSON.parse(JSON.stringify(data)).products;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

        }]);
