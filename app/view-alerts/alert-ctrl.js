angular.module('RestMaPla.alerts.controller', ['ngFlash', 'ngDialog', 'RestMaPla.common-services'])
    .controller('AlertCtrl', ['$scope', '$translate', 'Flash', 'ngDialog', 'BreadCrumbService', 'CrudService', 'PaginationService',
        function ($scope, $translate, Flash, ngDialog, BreadCrumbService, CrudService, PaginationService) {
            $scope.pagination = PaginationService.data;
            $scope.values = CrudService.response;

            var dialog = null;

            $scope.init = function (changeBreadCrumb) {
                if (changeBreadCrumb) {
                    BreadCrumbService.setBreadCrumb($translate.instant('views.index.alerts'));
                }
                getAlertsPage(1);
            };

            $scope.changePage = function (newPage, oldPage) {
                getAlertsPage(newPage);
            };

            $scope.hasUnreadAlerts = function () {
                if (CrudService.response.alerts) {
                    for (var i in CrudService.response.alerts.items) {
                        if (CrudService.response.alerts.items[i].viewed == false) {
                            return true;
                        }
                    }
                }
                return false;
            };

            $scope.showDetails = function (alert) {
                $scope.alert = alert;
                dialog = ngDialog.open({template: 'view-alerts/alert-details.html', scope: $scope, controller: this});
            };

            $scope.markAsRead = function (alert) {
                CrudService.updateItem(CrudService.endpoints.ALERTS_ENDPOINT, alert.id).success(function (data) {
                    getAlertsPage(PaginationService.data.currentPage);
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                }).finally(function () {
                    if (dialog) {
                        dialog.close()
                    }
                });
            };

            function getAlertsPage(page) {
                PaginationService.data.currentPage = page;
                CrudService.getPaginatedItems(CrudService.endpoints.ALERTS_ENDPOINT, (page - 1),
                    PaginationService.data.itemsPerPage).success(function (data) {

                    CrudService.response.alerts = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

        }]);
