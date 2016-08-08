angular.module('RestMaPla')
    .factory('ServerData', [ServerData])

function ServerData() {
    return {
        data: {
            categories: [],
            brands:[],
            products:[],
            showPageByPage: true
        }, setCategories: function(data) {
            this.data.categories = data;
        }, removeCategory: function(index) {
            this.data.categories.splice(index, 1);
        }, addCategory: function(c){
            this.data.categories.push(c);
        }, setProducts: function(data) {
            this.data.products = data;
        }, removeProduct: function(index) {
            this.data.products.splice(index, 1);
        }, addProduct: function(c){
            this.data.products.push(c);
        }, setBrands: function(data) {
            this.data.brands = data;
        }, removeBrand: function(index) {
            this.data.brands.splice(index, 1);
        }, addBrand: function(c){
            this.data.brands.push(c);
        }
    }
};
