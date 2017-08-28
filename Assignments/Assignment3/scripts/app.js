(function(){
	'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', foundItems);

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService){
		var nd = this;
		nd.searchTerm = "";
		nd.searchResults = [];
		nd.searchItem = function(){
			var promise = MenuSearchService.getMatchedMenuItems(nd.searchTerm);

			promise.then(function (response) {
				if(response.length){
					nd.searchResults = response;
					nd.notFound = "";
				}
				else{
					nd.searchResults = [];
					nd.notFound = "Nothing found";
				}
			})
			.catch(function (error) {
			  console.log("Something went terribly wrong.");
			});
		}
		nd.removeFoundItem = function(index)
		{
			nd.searchResults.splice(index, 1);
		}
	}

	MenuSearchService.$inject = ['$http'];
	function MenuSearchService($http){
		var service = this;
		service.getMatchedMenuItems = function(searchTerm){
			return $http({
		      method: "GET",
		      url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
		    }).then(function (result) {
				var totalItems = result.data.menu_items;
				var foundItems = [];
				for(var i = 0; i < totalItems.length; i++){
					if((searchTerm.length) && (totalItems[i].description.indexOf(searchTerm) > -1)){
						foundItems.push(totalItems[i]);
					}
				}
			    return foundItems;
			});
		}
	}

	function foundItems(){
		var ddo = {
			templateUrl: 'listFoundItems.html',
			scope: {
				found: '<',
				notFound: '<',
				onRemove: '&'
			}
		};
		return ddo;
	}
})();
