myApp.factory('BreadcrumbManager', [
    function BreadcrumbManager() {
        var staticUri = 'Home / ';
        return {
            data: {
                uri: '',
                page: '',
                shortPage: ''
            },
            changePage: function (p) {
                this.data.page = p;
                this.data.uri = staticUri + p;
                this.data.shortPage = (p.length > 13) ? p.substring(0, 10) + '...' : p;
            }
        };
    }
]);
