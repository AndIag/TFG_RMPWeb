angular.module('RestMaPla')
    .controller('BrandCtrl', ['$scope', 'BrandService', BrandCtrl]);

function BrandCtrl($scope, BrandService) {
    $scope.brands = [];
    $scope.totalBrands = 0;
    $scope.brandsPerPage = 10;
    $scope.currentPage = 1

    var deletedBrand = [];

    $scope.pageChanged = function(newPage) {
        getResultsPage(newPage);
    };

    function getResultsPage(pageNumber) {
        BrandService.getBrands(pageNumber-1, $scope.brandsPerPage).success(function(data){
            var json = JSON.parse(JSON.stringify(data));
            $scope.brands = json.items;
            $scope.totalBrands = json.count;
        }).error(function(data){
            console.log(data);
        });
    }

    $scope.init = function(){
        getResultsPage(1);
    };

    /*View Methods*/
    $scope.removeBrand = function(brand, index) {
        brand.disabled = true;
        BrandService.removeBrand(brand.id).success(function(data){
            $scope.brands.splice(index, 1);
        }).error(function(data){
            brand.disabled = false;
            console.log(data);
        });
    };
}
