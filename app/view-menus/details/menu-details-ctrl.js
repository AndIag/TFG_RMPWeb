angular.module('RestMaPla.menu.controller', ['ngFlash', 'ngDialog', 'RestMaPla.common'])
    .controller('MenuDetailsCtrl', ['$scope', '$stateParams', '$translate', 'Flash', 'ngDialog',
        'BreadCrumbService', 'CrudService', 'ProductService', 'PaginationService',
        'FormValidators',

        function ($scope, $stateParams, $translate, Flash, ngDialog, BreadCrumbService, CrudService,
                  ProductService, PaginationService, FormValidators) {

            var dialog = null;
            $scope.pagination = PaginationService.data;
            $scope.menu = $stateParams.menu;
            $scope.values = CrudService.response;
            $scope.legend = $translate.instant("action.modify") + ' ' + $translate.instant("word.menu");
            $scope.isDetailsForm = true;

            /**
             * First data load on page selected. Loading page 1
             */
            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($stateParams.menu.name);
                findMenuDetails(1);
            };

            /**
             * Load a new products page
             * @param {number} newPage given by dir-pagination-controls directive
             * @param {number} oldPage given by dir-pagination-controls directive
             */
            $scope.changePage = function (newPage, oldPage) {
                findMenuDetails(newPage);
            };

            /**
             * Load new products page for given supplier
             * @param page page to load
             */
            function findMenuDetails(page) {
                PaginationService.data.currentPage = page;
                CrudService.findPaginatedItemDetailsById(CrudService.endpoints.MENUS_ENDPOINT, $scope.menu.id,
                    (page - 1), PaginationService.data.itemsPerPage).success(function (data) {

                    console.log(data);

                    CrudService.response.products = JSON.parse(JSON.stringify(data)).products;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

        }]);