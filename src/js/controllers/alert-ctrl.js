/**
 * Alerts Controller
 */

angular.module('RestMaPla')
    .controller('AlertsCtrl', ['$scope', AlertsCtrl]);

function AlertsCtrl($scope) {
    $scope.alerts = [];
	// [{
    //     type: 'success',
    //     msg: 'Thanks for visiting! Feel free to create pull requests to improve the dashboard!'
    // }, {
    //     type: 'danger',
    //     msg: 'Found a bug? Create an issue with as many details as you can.'
    // }];

    $scope.addAlert = function(t, message) {
        $scope.alerts.push({
			type: t,
            msg: message
        });
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
}
