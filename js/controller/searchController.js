var SearchController = function(container, model, controller) {

  	
	
	container.dishType.click(function(){
		console.log("dishType clicked")
	})

	container.searchButton.click(function(){
		console.log(container.searchInput.value);
		console.log(container.dishType.value);
	})

	container.menuWrapper.click(function(){
		console.log("menu clicked");	
	})

}