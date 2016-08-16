myApp.factory('BreadcrumbManager', [BreadcrumbManager]);

function BreadcrumbManager() {
    var staticUri = 'Home / '
    return {
        data: {
            uri: '',
            page: ''
        },
        changePage: function(p) {
            this.data.page = p;
            this.data.uri = staticUri + p;
        }
    }
};
