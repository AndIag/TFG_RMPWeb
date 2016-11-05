angular.module('RestMaPla.category.controller', ['ngFlash', 'RestMaPla.common-services'])
    .controller('CategoryDetailsCtrl', ['$scope', '$stateParams', '$sce', 'BreadCrumbService', 'CrudService', 'PaginationService',
        function ($scope, $stateParams, $sce, BreadCrumbService, CrudService, PaginationService) {
            $scope.pagination = PaginationService.data;

            $scope.category = $stateParams.category;
            $scope.values = CrudService.response;
            $scope.image_url = $sce.trustAsResourceUrl($scope.category.url);

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($stateParams.category.name);
                findCategoryDetails(1);
            };

            $scope.changePage = function (newPage, oldPage) {
                findCategoryDetails(newPage);
            };

            $scope.searchByName = function () {
                //TODO implement with product services
            };

            function findCategoryDetails(page) {
                PaginationService.data.currentPage = page;
                CrudService.findItemDetailsById(CrudService.endpoints.CATEGORIES_ENDPOINT, $scope.category.id,
                    (page - 1), PaginationService.data.itemsPerPage).success(function (data) {

                    CrudService.response.products = JSON.parse(JSON.stringify(data)).products;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            }

        }]);
