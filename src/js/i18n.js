'use strict';

/**
* Internacionalization configuration for the RestMaPla module.
*/
angular.module('RestMaPla').constant('LOCALES', {
	'locales': {
		'es_ES': 'Español',
		'en_GB': 'English'
	},
	'preferredLocale': 'es_ES'
});
angular.module('RestMaPla').config(['$translateProvider', 'LOCALES',
	function ($translateProvider, LOCALES) {
		$translateProvider.useStaticFilesLoader({
			prefix: 'resources/locale-',
			suffix: '.json'
		});

		$translateProvider.preferredLanguage(LOCALES.preferredLocale);
		$translateProvider.useLocalStorage();
	}]);

angular.module('RestMaPla').config(['tmhDynamicLocaleProvider',
	function (tmhDynamicLocaleProvider) {
		tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
	}]);
