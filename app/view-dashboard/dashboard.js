'use strict';

angular.module('RestMaPla.dashboard', ['ngRoute', 'ngFlash', 'RestMaPla.services'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('index', {
            url: '/',
            views: {
                'headerContent': {
                    templateUrl: 'view-dashboard/header.html',
                    controller: 'DashboardCtrl'
                },
                'mainContent': {
                    templateUrl: 'view-dashboard/main.html',
                    controller: 'DashboardCtrl'
                }
            }
        });
    }])

    .controller('DashboardCtrl', ['$scope', 'BreadCrumbService', 'CrudService', 'Flash',
        function ($scope, BreadCrumbService, CrudService, Flash) {

            $scope.values = CrudService.response;

            $scope.init = function () {
                BreadCrumbService.setBreadCrumb('views.index.dashboard');
                CrudService.getItems(CrudService.endpoints.DASHBOARD_ENDPOINT).success(function (data) {
                    CrudService.response.data = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            };

        }]);