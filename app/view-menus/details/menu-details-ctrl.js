angular.module('RestMaPla.menu.controller', ['ngFlash', 'ngDialog', 'RestMaPla.common'])
    .controller('MenuDetailsCtrl', ['$scope', '$state', '$auth', '$stateParams', '$translate', 'Flash', 'ngDialog',
        'BreadCrumbService', 'CrudService', 'ProductService', 'MenuService', 'PaginationService',
        'FormValidators',

        function ($scope, $state, $auth, $stateParams, $translate, Flash, ngDialog, BreadCrumbService, CrudService,
                  ProductService, MenuService, PaginationService, FormValidators) {

            var dialog = null;
            $scope.pagination = PaginationService.data;
            $scope.menu = $stateParams.menu;
            $scope.values = CrudService.response;
            $scope.legend = $translate.instant("action.modify") + ' ' + $translate.instant("word.menu");
            $scope.isDetailsForm = true;

            $scope.menuItemTypes = [{'key': 'drinks', 'name': $translate.instant('word.drinks')},
                {'key': 'mains', 'name': $translate.instant('word.mains')},
                {'key': 'desserts', 'name': $translate.instant('word.desserts')},
                {'key': 'starters', 'name': $translate.instant('word.starters')}];

            /**
             * First data load on page selected. Loading page 1
             */
            $scope.init = function () {
                if (!$auth.isAuthenticated()) {
                    $state.go('login');
                    return;
                }
                BreadCrumbService.setBreadCrumb($stateParams.menu.name);
                findMenuDetails(1);
            };

            /**
             * Load a new products page
             * @param {number} newPage given by dir-pagination-controls directive
             * @param {number} oldPage given by dir-pagination-controls directive
             */
            $scope.changePage = function (newPage, oldPage) {
                findMenuDetails(newPage);
            };

            /**
             * Try to post new menu($scope.menu) after validation
             * @param form TODO use for validation
             */
            $scope.saveItem = function (form) {
                $scope.errors = FormValidators.isValidMenu($scope.menu, form);
                if (Object.keys($scope.errors).length === 0) {
                    CrudService.updateItem(CrudService.endpoints.MENUS_ENDPOINT, $scope.menu.id, $scope.menu).success(function (data) {

                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.adding'), 3000);
                    });
                }
            };

            /**
             * Delete given product from menu
             * @param product given object to remove
             */
            $scope.removeProduct = function (product) {
                MenuService.removeProduct($scope.menu.id, product.id).success(function (data) {
                    CrudService.response.products.items = CrudService.response.products.items.filter(function (e) {
                        return e.id !== product.id; //Filter products list for remove the chosen one
                    });
                    CrudService.response.products.count = CrudService.response.products.count - 1;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.removing'), 3000);
                }).finally(function () {
                    $scope.isLoading = false;
                });
            };

            /**
             * Open new add dialog using the provided template and @this as controller
             */
            $scope.showCreate = function () {
                $scope.product = {};
                loadProducts(null);
                dialog = ngDialog.open({
                    template: 'view-menus/details/add/dialog.html',
                    scope: $scope,
                    controller: this
                });
            };

            /**
             * Search packs to add to this supplier
             */
            $scope.searchProducts = function () {
                loadProducts($scope.product.newProduct);
            };

            /**
             * Try to post new product($scope.product) to supplier after validation
             * @param form TODO use for validation
             */
            $scope.addProduct = function (form) {
                $scope.errors = FormValidators.isValidProductForMenu($scope.product, form);
                if (Object.keys($scope.errors).length === 0) {
                    MenuService.addProduct($scope.menu.id, $scope.product.newProduct.id, $scope.product.type.key).success(function (data) {
                        findMenuDetails(1);
                        dialog.close();
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.adding'), 3000);
                    });
                }
            };

            /**
             * %scope.saveItem + $scope.showCreate again
             */
            $scope.addMoreProducts = function () {
                $scope.errors = FormValidators.isValidProductForSupplier($scope.product, form);
                if (Object.keys($scope.errors).length === 0) {
                    MenuService.addProduct($scope.menu.id, $scope.product.newProduct.id, $scope.product.type.key).success(function (data) {
                        findMenuDetails(1);
                        dialog.close();
                        $scope.product = {};
                        loadProducts(null);
                        dialog = ngDialog.open({
                            template: 'view-menus/details/add/dialog.html',
                            scope: $scope,
                            controller: this
                        });
                    }).error(function (data) {
                        Flash.clear();
                        Flash.create('danger', $translate.instant('error.adding'), 3000);
                    });
                }
            };

            /**
             * Load new products page for given supplier
             * @param page page to load
             */
            function findMenuDetails(page) {
                PaginationService.data.currentPage = page;
                CrudService.findPaginatedItemDetailsById(CrudService.endpoints.MENUS_ENDPOINT, $scope.menu.id,
                    (page - 1), PaginationService.data.itemsPerPage).success(function (data) {

                    var json = JSON.parse(JSON.stringify(data));
                    $scope.menu = json.item;
                    CrudService.response.products = json.products;
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

            /**
             * Load first list of products for add product dialog
             */
            function loadProducts(keywords) {
                ProductService.searchSimple(keywords).success(function (data) {
                    CrudService.response.searchedProducts = JSON.parse(JSON.stringify(data));
                }).error(function (data) {
                    Flash.clear();
                    Flash.create('danger', $translate.instant('error.loading'), 3000);
                });
            }

        }]);