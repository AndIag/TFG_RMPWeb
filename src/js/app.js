'use strict';

angular.module('RestMaPla', [   'ui.bootstrap',
                                'ui.router',
                                'ngCookies',
                                'ngSanitize',
                                'angularUtils.directives.dirPagination',
                                'pascalprecht.translate',// angular-translate
                                'tmh.dynamicLocale'// angular-dynamic-locale
                            ])

angular.module('RestMaPla').constant('LOCALES', {
    'locales': {
        'en_GB': 'English',
        'es_ES': 'Español'
    },
    'preferredLocale': 'en_GB'
});
