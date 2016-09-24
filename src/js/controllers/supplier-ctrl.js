myApp.controller('SupplierCtrl', ['$scope', '$state', '$stateParams', '$translate',
    'Flash', 'BreadcrumbManager', 'SupplierService', 'CrudService', 'ServerData',

    function ($scope, $state, $stateParams, $translate, Flash, BreadcrumbManager, SupplierService, CrudService, ServerData) {
        //View helpers
        $scope.isLoading = false; //Know if we need to show load screen
        $scope.isAddFormShowing = false;
        $scope.isSubmitActive = true;
        //Page-By-Page things
        $scope.totalItems = 0;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;

        $scope.data = ServerData.data;
        $scope.supplier = {};

        $scope.init = function () {
            BreadcrumbManager.changePage($translate.instant('views.index.suppliers'));
            getPage(1);
        };

        // Load brands or products from server
        $scope.pageChanged = function (newPage) {
            getPage(newPage);
        };

        function getPage(pageNumber) { //Page by page for brands
            $scope.isLoading = true;
            CrudService.getPaginatedItems(myApp.SUPPLIERS_ENDPOINR, pageNumber - 1, $scope.itemsPerPage).success(function (data) {
                var json = JSON.parse(JSON.stringify(data));
                ServerData.setSuppliers(json.items);
                $scope.totalItems = json.count;
                $scope.currentPage = pageNumber;
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.loading.suppliers'), 3000);
            }).finally(function () {
                $scope.isLoading = false;
            });
        }

        function isValidForm(form) {
            if (form['name'].$error.required) {
                Flash.clear();
                Flash.create('info', $translate.instant('error.required.name'), 5000);
                return false;
            }
            if (form['vat'].$error.required) {
                Flash.clear();
                Flash.create('info', $translate.instant('error.required.vat'), 5000);
                return false;
            }
            return true;
        }

        //CRUD methods
        $scope.saveSupplier = function (form) {
            if (isValidForm(form)) {
                $scope.isSubmitActive = false;
                var supplierId = $scope.supplier.id;
                var name = $scope.supplier.name;
                var vat = $scope.supplier.vatS;
                var url = $scope.supplier.url;
                (supplierId != undefined) ? updateSupplier(supplierId, name, url, vat) : createSupplier(name, url, vat);
            }
        };

        function createSupplier(name, url, vat) {
            CrudService.createItem(myApp.SUPPLIERS_ENDPOINR, {name: name, url: url, vat: vat}).success(function (data) {
                $scope.isAddFormShowing = false;
                Flash.clear();
                Flash.create('success', $translate.instant('message.supplier.added'), 3000);
                ServerData.addSupplier(JSON.parse(JSON.stringify(data)));
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.creating.supplier'), 3000);
            }).finally(function () {
                $scope.isSubmitActive = true;
                $scope.hideCreate();
            });
        }

        function updateSupplier(supplierId, name, url, vat) {
            CrudService.updateItem(myApp.SUPPLIERS_ENDPOINR, supplierId, {
                name: name,
                url: url,
                vat: vat
            }).success(function (data) {
                $scope.isAddFormShowing = false;
                Flash.clear();
                Flash.create('success', $translate.instant('message.supplier.added'), 3000);
                $scope.init();
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.updating.supplier'), 3000);
            }).finally(function () {
                $scope.isSubmitActive = true;
                $scope.hideCreate();
            });
        }

        $scope.removeSupplier = function (supplier, index) {
            supplier.disabled = true;
            CrudService.removeItem(myApp.SUPPLIERS_ENDPOINR, supplier.id).success(function (data) {
                ServerData.removeSupplier(index);
                Flash.clear();
                Flash.create('success', $translate.instant('message.supplier.removed'), 3000);
            }).error(function (data) {
                Flash.clear();
                Flash.create('danger', $translate.instant('error.removing.supplier'), 3000);
                supplier.disabled = false;
            });
        };

        /*View Methods*/
        $scope.showCreate = function () {
            $scope.isAddFormShowing = true;
        };
        $scope.hideCreate = function () {
            $scope.isAddFormShowing = false;
            $scope.supplier = {};
        };
        $scope.showDetails = function (supplier) {
            $scope.supplier = supplier;
            $scope.isAddFormShowing = true;
        };

    }
]);
