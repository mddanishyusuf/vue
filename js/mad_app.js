var app = angular.module('mad_app',[])

.controller('mainController',['$scope','$http',function($scope, $http){
$scope.filter_by_category_sx = false
$scope.price_arrow = false
$scope.score_arrow = false
$scope.loadingText = true
$scope.shopList = false
$scope.limit = 9
$scope.category_list = []

$scope.filter = {};
	$scope.open_filters = function () {
                $scope.filter_by_category_sx = $scope.filter_by_category_sx ? false : true;
            }

	$http.get('https://test-prod-api.herokuapp.com/products').success(function(data){
		$scope.loadingText = true
		$scope.shopping_list = data.products
		angular.forEach(data.products,function(val){
			if($scope.category_list.indexOf(val.cat) < 0){
				$scope.category_list.push(val.cat)
			}
		})
		}).finally(function() {
			$scope.loadingText = false
			$scope.shopList = true
		});


	$scope.filterByCategory = function(item){
		return $scope.filter[item.cat] || $scope.noFilter($scope.filter);
	}

	$scope.noFilter = function(filterObj) {
		return Object.
		keys(filterObj).
		every(function (key) { return !filterObj[key]; });
	}
}])

app.directive("scroll", function ($window) {
	return function(scope, element, attrs) {
		angular.element($window).bind("scroll", function() {
			if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight-1)) {
			scope.limit = scope.limit + 9
			}scope.$apply();
		})
    }
})

app.directive('onErrorSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.onErrorSrc) {
          attrs.$set('src', attrs.onErrorSrc);
        }
      });
    }
  }
});

app.directive('default', function() {
  return {
    restrict: 'A',
    scope: { default: '@' },
    link: function(scope, element, attrs) {
        element.one('load', function() {
            element.attr('src', scope.default);
        });
    }
  };
});