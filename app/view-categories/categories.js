'use strict';

angular.module('RestMaPla.categories', ['ngRoute', 'ngFlash', 'RestMaPla.services'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('categories', {
            url: '/categories',
            views: {
                'headerContent': {
                    templateUrl: 'view-categories/header.html',
                    controller: 'CategoryCtrl'
                },
                'mainContent': {
                    templateUrl: 'view-categories/main.html',
                    controller: 'CategoryCtrl'
                }
            }
        }).state('category-details', {
            url: '/categories/:categoryId',
            params: {category: null},
            views: {
                'headerContent': {
                    templateUrl: 'view-categories/details-header.html',
                    controller: 'CategoryDetailsCtrl'
                }, 'mainContent': {
                    templateUrl: 'view-categories/details-main.html',
                    controller: 'CategoryDetailsCtrl'
                }, 'footerContent' : {
                    templateUrl: 'view-categories/details-footer.html'
                }
            }
        });
    }])

    .controller('CategoryCtrl', ['$scope', '$translate', 'Flash', 'BreadCrumbService', 'CrudService',
        function ($scope, $translate, Flash, BreadCrumbService, CrudService) {

            $scope.values = CrudService.response;

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($translate.instant('views.index.categories'));
                CrudService.getItems(CrudService.endpoints.CATEGORIES_ENDPOINT).success(function (data) {
                    CrudService.response.categories = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            };

            $scope.searchByName = function () {
                CrudService.findItemsByName(CrudService.endpoints.CATEGORIES_ENDPOINT, $scope.searchKeywords).success(function (data) {
                    CrudService.response.categories = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            };

            $scope.showCreate = function () {

            };

            $scope.removeCategory = function (category) {
                if (category.numProducts == 0) {
                    CrudService.removeItem(CrudService.endpoints.CATEGORIES_ENDPOINT, category.id).success(function (data) {
                        CrudService.response.categories = CrudService.response.categories.filter(function (e) {
                            return e.id !== category.id;
                        })
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.removing'), 3000);
                    }).finally(function () {
                        $scope.isLoading = false;
                    });
                }
            }
        }])
    .controller('CategoryDetailsCtrl', ['$scope', '$stateParams', '$sce', 'BreadCrumbService', 'CrudService', 'PaginationService',
        function ($scope, $stateParams, $sce, BreadCrumbService, CrudService, PaginationService) {
            $scope.pagination = PaginationService.data;

            $scope.category = $stateParams.category;
            $scope.values = CrudService.response;
            $scope.image_url = $sce.trustAsResourceUrl($scope.category.url);

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb($stateParams.category.name);
                CrudService.findItemById(CrudService.endpoints.CATEGORIES_ENDPOINT, $scope.category.id).success(function (data) {
                    CrudService.response.products = JSON.parse(JSON.stringify(data)).products;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.removing'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            };

        }]);