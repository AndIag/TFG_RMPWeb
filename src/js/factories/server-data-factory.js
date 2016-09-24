myApp.factory('ServerData', [
    function () {
        return {
            data: {
                alerts: [],
                categories: [],
                brands: [],
                products: [],
                suppliers: [],
                menus: [],
                showPageByPage: true
            }, setCategories: function (data) {
                this.data.categories = data;
            }, removeCategory: function (index) {
                this.data.categories.splice(index, 1);
            }, addCategory: function (c) {
                this.data.categories.push(c);
            }, setProducts: function (data) {
                this.data.products = data;
            }, removeProduct: function (index) {
                this.data.products.splice(index, 1);
            }, addProduct: function (c) {
                this.data.products.push(c);
            }, setBrands: function (data) {
                this.data.brands = data;
            }, removeBrand: function (index) {
                this.data.brands.splice(index, 1);
            }, addBrand: function (c) {
                this.data.brands.push(c);
            }, setSuppliers: function (data) {
                this.data.suppliers = data;
            }, removeSupplier: function (index) {
                this.data.suppliers.splice(index, 1);
            }, addSupplier: function (c) {
                this.data.suppliers.push(c);
            }, setMenus: function (data) {
                this.data.menus = data;
            }, removeMenu: function (index) {
                this.data.menus.splice(index, 1);
            }, addMenu: function (c) {
                this.data.menus.push(c);
            }, setAlerts: function (data) {
                this.data.alerts = data;
            }
        };
    }
])
