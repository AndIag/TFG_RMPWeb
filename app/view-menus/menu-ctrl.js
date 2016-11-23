angular.module('RestMaPla.menus.controller', ['ngFlash', 'RestMaPla.common-services'])
    .controller('MenuCtrl', ['$scope', '$translate', 'Flash', 'BreadCrumbService', 'CrudService', 'PaginationService',
        function ($scope, $translate, Flash, BreadCrumbService, CrudService, PaginationService) {
            $scope.pagination = PaginationService.data;
            $scope.values = CrudService.response;

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($translate.instant('views.index.menus'));
                getMenusPage(1);
            };

            $scope.changePage = function (newPage, oldPage) {
                getMenusPage(newPage);
            };

            $scope.searchByName = function () {

            };

            $scope.showCreate = function () {

            };

            $scope.removeMenu = function (menu) {
                CrudService.removeItem(CrudService.endpoints.MENUS_ENDPOINT, menu.id).success(function (data) {
                    CrudService.response.menus.items = CrudService.response.menus.items.filter(function (e) {
                        return e.id !== menu.id;
                    });
                    CrudService.response.menus.count = CrudService.response.menus.count -1;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.removing'), 3000);
                });
            };

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
