'use strict';

angular.module('RestMaPla.auth', ['ui.router', 'satellizer'])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$authProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider, $authProvider) {
            $httpProvider.defaults.useXDomain = true;
            $httpProvider.defaults.headers.common = 'Content-Type: application/json';
            delete $httpProvider.defaults.headers.common['X-Requested-With'];

            //$authProvider.loginUrl = CrudService.ENDPOINT + CrudService.endpoints.LOGIN_ENDPOINT;
            $authProvider.loginUrl = 'http://localhost:9090/restmapla/login';
            $authProvider.loginRedirect = '/';
            $authProvider.logoutRedirect = '/';
            $authProvider.tokenHeader = 'Authorization';
            $authProvider.tokenType = 'Bearer';
            $authProvider.tokenName = 'token';
            $authProvider.tokenRoot = 'token';
            $authProvider.tokenPrefix = 'AndIag';

            // For unmatched routes
            $urlRouterProvider.otherwise('/login');

            $stateProvider.state('login', {
                url: '/login',
                views: {
                    'mainContent': {
                        templateUrl: 'common/views/auth.html',
                        controller: 'AuthController'
                    }
                }
            })
        }
    ])
    .controller('AuthController', ['$scope', '$auth', '$state', function ($scope, $auth, $state) {
        $scope.credentials = {};

        $scope.login = function () {
            var credentials = {
                username: $scope.credentials.username,
                password: btoa($scope.credentials.password)
            };
            // Use Satellizer's $auth service to login
            $auth.login(credentials).then(function (data) {
                $auth.setToken(data.data.token);
                // If login is successful, redirect to the users state
                $state.go('index');
            });
        }
    }]);
