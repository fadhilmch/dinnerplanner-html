var DetailController = function(view, model, controller){

	view.people.change((e) =>{
    model.setNumberOfGuests($(e.target).val());
    model.notifyObserver();

  })
	view.btnBack.click(function() {
		controller.goToPage('search');
		 model.notifyObserver();

    })

	view.addToMenu.click(function(){
		var cur =model.getCurrentDishId();
		console.log(model.getFullMenu());
		 console.log(cur);
		 model.addDishToMenu(Number(cur));
		 console.log(model.getFullMenu());
		 model.notifyObserver();

	})
  

	
}
