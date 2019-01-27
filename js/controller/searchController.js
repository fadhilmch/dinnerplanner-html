var SearchController = function(view, model, controller) {
	
	view.dishType.click(function(){
		console.log("dishType clicked")
	})

	view.searchButton.click(function(){
		console.log('start')
		// console.log(serchInput.value);
		console.log(view.searchInput.val());
		console.log(view.dishType.val());
		console.log('stop')
	})

	view.menuWrapper.click(function(){
		console.log("menu clicked");	
	})

}