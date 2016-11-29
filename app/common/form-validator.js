'use strict';

angular.module('RestMaPla.service.validators', [])
    .service('FormValidators', [function () {
        return {
            isValidProduct: function (product, form) {
                if (form.$error.hasOwnProperty("required")) {
                    return form.$error["required"];
                } else if (product.isPack) {
                    if (!product.simpleProduct || !product.simpleProduct.simple) {

                    } else if (!product.amount > 0) {

                    }
                } else if (!product.isPack) {
                    if (!product.price > 0) {

                    }
                }
                return true;
            },
            isValidBrand: function (brand, form) {
                if (form.$error.hasOwnProperty("required")) {
                    return form.$error["required"];
                }
                return true;
            },
            isValidCategory: function (category, form) {
                if (form.$error.hasOwnProperty("required")) {
                    return form.$error["required"];
                }
                return true;
            }
        }
    }]);
