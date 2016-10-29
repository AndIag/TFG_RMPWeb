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
        });
    }])

    .controller('CategoryCtrl', ['$scope', '$translate', 'Flash', 'BreadCrumbService', 'CrudService',
        function ($scope, $translate, Flash, BreadCrumbService, CrudService) {

            $scope.values = CrudService.response;

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb('views.index.categories');
                CrudService.getItems(CrudService.endpoints.CATEGORIES_ENDPOINT).success(function (data) {
                    CrudService.response.data = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            }

        }]);