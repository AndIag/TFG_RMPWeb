'use strict';

angular.module('RestMaPla.service.breadcrumb', [])
    .service('BreadCrumbService', ['$translate', function ($translate) {
        return {
            data: {breadCrumb: ''},
            setBreadCrumb: function (name) {
                name = toTitleCase(name);
                this.data.breadCrumb = name;
                this.data.isDashboard = name === toTitleCase($translate.instant("views.index.dashboard"));
            }
        }
    }]);

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}