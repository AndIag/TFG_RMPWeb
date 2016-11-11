angular.module('RestMaPla.alerts', ['ngFlash', 'RestMaPla.common-services'])
    .controller('AlertCtrl', ['$scope', '$translate', 'Flash', 'CrudService',
        function ($scope, $translate, Flash, CrudService) {

            $scope.values = CrudService.response;

            $scope.init = function () {
                CrudService.getItems(CrudService.endpoints.ALERTS_ENDPOINT).success(function (data) {
                    CrudService.response.alerts = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            };

            $scope.hasUnreadAlerts = function () {
                for (var i in CrudService.response.alerts) {
                    if (CrudService.response.alerts[i].viewed == false) {
                        return true;
                    }
                }
                return false;
            };

            $scope.markAsRead = function (alert, index) {
                CrudService.updateItem(CrudService.endpoints.ALERTS_ENDPOINT, alert.id).success(function (data) {
                    CrudService.response.alerts[index].viewed = true;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            }

        }]);
