'use strict';

angular.module('RestMaPla', [   'ui.bootstrap',
                                'ui.router',
                                'ngCookies',
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

/**
 * i18n configuration for the RestMaPla module.
 */
angular.module('RestMaPla').config(['$translateProvider',
    function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'resources/locale-',// path to translations files
            suffix: '.json'// suffix, currently- extension of the translations
        });
        $translateProvider.preferredLanguage('en_GB');// is applied on first load
        $translateProvider.useLocalStorage();// saves selected language to localStorage
    }]);

angular.module('RestMaPla').config(['tmhDynamicLocaleProvider',
    function (tmhDynamicLocaleProvider) {
        tmhDynamicLocaleProvider.localeLocationPattern('components/angular-i18n/angular-locale_{{locale}}.js');
    }]);
