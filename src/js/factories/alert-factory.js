/**
 * Alerts Factory
 */

angular.module('RestMaPla')
    .factory('AlertsManager', [AlertsManager]);

function AlertsManager() {
    return {
        alerts: [],
        addAlert: function(t, message) {
            this.alerts.push({
                type: t,
                msg: message
            });
        },
        closeAlert: function(index) {
            this.alerts.splice(index, 1);
        }
    }
};
