'use strict';

var HomeView = function(container, model) {
    //initialize component
    this.createDinner = container.find("#create-dinner");

	model.fetchUrl()
		.then(data => {
			model.getAllDishes2();
			model.getDishType2();
		})
		.catch(err => {
			console.log('Error: ' + err);
		})

}