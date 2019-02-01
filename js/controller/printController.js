'use strict';

var PrintController = function(view, model, generalController){
	model.totalGuests.addObserver(view);
	model.selectedDish.addObserver(view);

	view.editfromPrint.click(() => {
		generalController.goToPage('search');
		
	})
}