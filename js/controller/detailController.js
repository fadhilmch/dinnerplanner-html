var DetailController = function(view, model, controller){

	view.people.change((e) =>{
    model.setNumberOfGuests($(e.target).val());
    model.notifyObserver();

  })
	view.btnBack.click(function() {
	    controller.goToPage('search');
		model.getFullMenu();
		model.notifyObserver();

    })

	view.addToMenu.click(function(){
		var cur =model.getCurrentDishId();
		 model.addDishToMenu(Number(cur));
		 model.notifyObserver();

	})
  

	
}
