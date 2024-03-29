'use strict';

// Declare app level module which depends on views, and components
angular.module('RestMaPla', ['ui.bootstrap', 'ui.router', 'angular-spinkit', 'LocalStorageModule', 'RestMaPla.auth',
    'angularUtils.directives.dirPagination',
    'RestMaPla.version', 'RestMaPla.i18n', 'RestMaPla.frame', 'RestMaPla.dashboard', 'RestMaPla.categories',
    'RestMaPla.employees', 'RestMaPla.brands', 'RestMaPla.products', 'RestMaPla.suppliers', 'RestMaPla.menus',
    'RestMaPla.bills', 'RestMaPla.alerts', 'RestMaPla.tables'])

    .run(['$rootScope', '$state', 'localStorageService', function ($rootScope, $state, localStorageService) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            var toStateName = "stateParams." + toState.name;
            var f = true;
            for (var k in toState.params) {
                f = f && (JSON.stringify(toParams[k]) == JSON.stringify(toState.params[k]));
            }
            if (f && localStorageService.get(toStateName) != null) {
                event.preventDefault();
                var savedToParams = localStorageService.get(toStateName); //retrieving toParams from local storage
                localStorageService.remove(toStateName);
                for (k in toState.params) {
                    toParams[k] = savedToParams[k]; //update only the params {} not url params
                }
                $state.transitionTo(toState, toParams);
            } else {
                var toSave = {};
                for (k in toState.params) {
                    toSave[k] = toParams[k]; //save only the params {} not url params
                }
                localStorageService.set(toStateName, toSave);
            }
        })
    }])

    .constant('LOCALES', {
        'locales': {
            'en_GB': 'English',
            'es_ES': 'Español'
        },
        'preferredLocale': 'en_GB'
    });
