'use strict';

angular.module('RestMaPla.service.pagination', [])
    .service('PaginationService', [function () {
        return {
            data:{
                itemsPerPage: 10
            }
        }
    }]);