'use strict';

angular.module('RestMaPla.i18n', ['pascalprecht.translate', 'tmh.dynamicLocale', 'ngSanitize', 'ngCookies'])
    .config(['$translateProvider', 'tmhDynamicLocaleProvider',
        function ($translateProvider, tmhDynamicLocaleProvider) {
            $translateProvider.useStaticFilesLoader({
                prefix: '/components/i18n/locales/locale-',// path to translations files
                suffix: '.json'// suffix, currently- extension of the translations
            });
            $translateProvider.preferredLanguage('en_GB');// is applied on first load
            $translateProvider.useSanitizeValueStrategy('escape');
            $translateProvider.useLocalStorage();// saves selected language to localStorage
            $translateProvider.useMissingTranslationHandlerLog();

            tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-locales/angular-locale_{{locale}}.js');
        }]);
