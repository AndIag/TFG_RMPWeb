angular.module('RestMaPla')
    .controller('AlertsCtrl', ['$scope', 'AlertsManager', AlertsCtrl]);

function AlertsCtrl($scope, AlertsManager){
    $scope.alerts = AlertsManager.alerts;
    $scope.closeAlert = function(index){
        AlertsManager.closeAlert(index);
    }
}
