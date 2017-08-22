(function(){
	'use strict';

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService){
		var buy = this;
		buy.buyitems = ShoppingListCheckOffService.getBuyItems();
		buy.buy = function(index){
			ShoppingListCheckOffService.removefromBuy(index);
		}
		buy.DoneStatus = ShoppingListCheckOffService.buyDoneStatus;
		console.log(buy.DoneStatus);
	}
	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService){
		var bought = this;
		bought.boughtitems = ShoppingListCheckOffService.getBoughtItems();
		bought.DoneStatus = ShoppingListCheckOffService.getboughtDoneStatus();
	};
	function ShoppingListCheckOffService(){
		var service = this;
		
		var buylist = [
			{
		     name: 'cookies',
		     quantity: 10
		    },
		    {
		     name: 'chips',
		     quantity: 5
		    },
		    {
		     name: 'candies',
		     quantity: 12
		    },
		    {
		     name: 'chocolates',
		     quantity: 14
		    },
		    {
		     name: 'wafers',
		     quantity: 9
		    }
		    ];
		    var bought = [{
		     name: 'cookies',
		     quantity: 10
		    },
		    {
		     name: 'chips',
		     quantity: 5
		    }
		];
		var boughtlist = [];
		service.buyDoneStatus = false;
		service.boughtDoneStatus = true;
		service.removefromBuy = function(index){
			var boughtItem = buylist.splice(index, 1);
			var bitem = {
				name: boughtItem[0].name,
				quantity: boughtItem[0].quantity
			}
			boughtlist.push(bitem);
			service.CheckNChangeStatus();
			// service.boughtDoneStatus = false;
			if(buylist.length == 0){
				service.buyDoneStatus = true;
			}
		}
		service.getBuyItems = function(){
			return buylist;
		}
		service.getBoughtItems = function(){
			return boughtlist;
		}

		service.CheckNChangeStatus = function(){
			if(buylist.length == 0){
				service.buyDoneStatus = true;
			}
			if(boughtlist.length != 0){
				service.boughtDoneStatus = false;
			}
		}

		service.getbuyDoneStatus = function(){
			return service.buyDoneStatus;
		}

		service.getboughtDoneStatus = function(){
			return service.boughtDoneStatus;
		}
		// service.buyDoneStatus = function()
		// {
		// 	if(buylist.length == 0){
		// 		return true;
		// 	}
		// 	return false;
		// }

		// service.boughtDoneStatus = function(){
		// 	if(boughtlist.length == 0){
		// 		return true;
		// 	}
		// 	return false;
		// }
	}
})();
