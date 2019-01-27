var SummaryController = function(container, model, controller){

	container.printReceipt.click(function(){
		controller.goToPage('print');
	})

	container.editfromSummary.click(function(){
		controller.goToPage('search');
	})

	container.totalGuest.append(model.getNumberOfGuests());

}