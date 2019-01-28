var DetailController = function(view, model, controller){

	view.btnBack.click(function() {
		controller.goToPage('search');

    })

	view.addToMenu.click(function(){
		 model.addDishToMenu(model.getCurrentDishId());
		 console.log("id-now" + model.getCurrentDishId());
		 model.getFullMenu();
		 console.log(model.getFullMenu());
		  model.notifyObserver();

	})
  

	
}
