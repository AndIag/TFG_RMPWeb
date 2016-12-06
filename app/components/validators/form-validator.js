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
            },
            isValidSupplier: function (supplier, form) {
                var error = {};
                if (!supplier.name || supplier.name === '' || supplier.name.replace(/\s+/g, " ") === ' ') {
                    error.name = $translate.instant("error.required.name");
                }
                if (!supplier.vat) {
                    error.vat = $translate.instant("error.required.vat");
                }
                return error;
            },
            isValidEmployee: function (employee, form) {
                var error = {};
                if (!employee.name || employee.name === '' || employee.name.replace(/\s+/g, " ") === ' ') {
                    error.name = $translate.instant("error.required.name");
                }
                if (!employee.dni || !isValidDni(employee.dni)) {
                    error.dni = $translate.instant("error.required.dni");
                }
                return error;
            },
            isValidBill: function (bill, form) {
                var error = {};
                if (!bill.description || bill.description === '' || bill.description.replace(/\s+/g, " ") === ' ') {
                    error.description = $translate.instant("error.required.description");
                }
                if (!bill.price > 0) {
                    error.price = $translate.instant("error.required.price");
                }
                if (!bill.entry) {
                    if (!bill.supplier) {
                        error.supplier = $translate.instant("error.required.supplier");
                    }
                }
                return error;
            },
            isValidMenu: function (menu, form) {
                var error = {};
                if (!menu.name || menu.name === '' || menu.name.replace(/\s+/g, " ") === ' ') {
                    error.name = $translate.instant("error.required.name");
                }
                if (!menu.starterPrice > 0) {
                    error.starterPrice = $translate.instant("error.required.price");
                }
                if (!menu.mainPrice > 0) {
                    error.mainPrice = $translate.instant("error.required.price");
                }
                if (!menu.drinkPrice > 0) {
                    error.drinkPrice = $translate.instant("error.required.price");
                }
                if (!menu.dessertPrice > 0) {
                    error.dessertPrice = $translate.instant("error.required.price");
                }
                return error;
            }
        }
    }]);

function isValidDni(value) {
    var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
    var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    var str = value.toString().toUpperCase();

    if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

    var nie = str
        .replace(/^[X]/, '0')
        .replace(/^[Y]/, '1')
        .replace(/^[Z]/, '2');

    var letter = str.substr(-1);
    var charIndex = parseInt(nie.substr(0, 8)) % 23;

    return validChars.charAt(charIndex) === letter;
}