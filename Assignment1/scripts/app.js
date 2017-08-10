(function(){
	'use strict';

	angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];
	function LunchCheckController($scope){
		$scope.lunchList = "";
		$scope.muchOrNot = "";
		$scope.checkTooMuch = function(){
			var count = checkNumItems($scope.lunchList);
			if(count <= 0){
				$scope.muchOrNot = "Please enter data first";
			}
			else if(count > 0 && count < 4){
				$scope.muchOrNot = "Enjoy!";
			}
			else{
				$scope.muchOrNot = "Too much!";
			}
		};
		function checkNumItems(string){
			if(string.length != 0){
			 	var splitStrings = string.split(',');
			 	// Doesn't count empty string in array
			 	splitStrings = splitStrings.filter(function(entry) { return entry.trim() != ''; });
			 	return splitStrings.length;
			}
			else{
				return 0;
			}
		}
	};
})();
