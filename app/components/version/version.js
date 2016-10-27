'use strict';

angular.module('RestMaPla.version', [
    'RestMaPla.version.interpolate-filter',
    'RestMaPla.version.version-directive'
])

    .value('version', '0.1');
