angular.module('RestMaPla')
    .controller('BrandCtrl', ['$scope', 'BrandService', BrandCtrl]);

function BrandCtrl($scope, BrandService) {
    $scope.brands = [];
    $scope.numPages = [];

    var startIndex = 0;
    var count = 10;

    $scope.init = function(){
        BrandService.getBrands(startIndex, count).success(function(data){
            $scope.brands = JSON.parse(JSON.stringify(data));
            console.log($scope.brands)
            startIndex += count;
        }).error(function(data){
            console.log(data);
        });
        BrandService.getBrandsCount().success(function(data){
            var brandCounts = JSON.parse(data).count;
            var pages = Math.floor(brandCounts / count);
            var numPages = ((brandCounts % count) > 0) ? (pages + 1) : pages;
            for(var i = 0; i < numPages; i++){
                $scope.numPages.push(i);
            }
        }).error(function(data){
            // console.log(data);
            var brandCounts = 13
            var pages = Math.floor(brandCounts / count);
            var numPages = ((brandCounts % count) > 0) ? (pages + 1) : pages;
            for(var i = 1; i <= numPages; i++){
                $scope.numPages.push(i);
            }
        });
    };
}
