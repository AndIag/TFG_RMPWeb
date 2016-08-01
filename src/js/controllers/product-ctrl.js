angular.module('RestMaPla')
    .controller('ProductCtrl', ['$scope', '$state', '$stateParams', '$translate', 'Flash', 'BreadcrumbManager', ProductCtrl]);

function ProductCtrl($scope, $state, $stateParams, $translate, Flash, BreadcrumbManager) {
    $scope.createValues = {};
}
