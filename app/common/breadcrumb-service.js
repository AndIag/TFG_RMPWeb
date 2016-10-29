'use strict';

angular.module('RestMaPla.service.breadcrumb', [])
    .service('BreadCrumbService', ['$translate', function ($translate) {
        return {
            data: {},
            setBreadCrumb: function (name) {
                this.data.breadCrumb = (!angular.isDefined(name) || name === null)
                    ? $translate.instant("views.index.dashboard")
                    : $translate.instant(name);
                this.data.links = (!angular.isDefined(name) || name === null)
                    ? 'Home / ' + $translate.instant("views.index.dashboard")
                    : 'Home / ' + $translate.instant(name);

                this.data.isDashboard = this.data.breadCrumb === $translate.instant("views.index.dashboard");
            }
        }
    }]);
