'use strict';

angular.module('RestMaPla.service.breadcrumb', [])
    .service('BreadCrumbService', ['$translate', function ($translate) {
        return {
            data: {},
            setBreadCrumb: function (name) {
                name = toTitleCase(name);
                (name.length <= 10) ? this.data.breadCrumb = name
                    : this.data.breadCrumb = name.substring(0,11) + '...';
            }
        }
    }]);

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}