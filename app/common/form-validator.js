'use strict';

angular.module('RestMaPla.service.validators', [])
    .service('FormValidators', ['$translate', function ($translate) {
        return {
            isValidProduct: function (product, form) {
                var error = {};
                if (!product.name || product.name === '' || product.name.replace(/\s+/g, " ") === ' ') {
                    error.name = $translate.instant("error.required.name");
                }
                if (!product.category || !product.category.id) {
                    error.category = $translate.instant("error.required.category");
                }
                if (!product.brand || !product.brand.id) {
                    error.brand = $translate.instant("error.required.brand");
                }
                if (product.isPack) {
                    if (!product.simpleProduct || !product.simpleProduct.simple) {
                        error.simpleProduct = $translate.instant("error.required.simple_product");
                    }
                    if (!product.amount > 0) {
                        error.amount = $translate.instant("error.required.amount");
                    }
                }
                if (!product.isPack) {
                    if (!product.price > 0) {
                        error.price = $translate.instant("error.required.price");
                    }
                }
                return error;
            },
            isValidBrand: function (brand, form) {
                var error = {};
                if (!brand.name || brand.name === '' || brand.name.replace(/\s+/g, " ") === ' ') {
                    error.name = $translate.instant("error.required.name");
                }
                return error;
            },
            isValidCategory: function (category, form) {
                var error = {};
                if (!category.name || category.name === '' || category.name.replace(/\s+/g, " ") === ' ') {
                    error.name = $translate.instant("error.required.name");
                }
                return error;
            }
        }
    }]);
