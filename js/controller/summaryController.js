var SummaryController = function(container, model, controller){

	container.totalGuest.change((e) =>{
    model.setNumberOfGuests($(e.target).val());
    model.notifyObserver();

  })

	container.printReceipt.click(function(){
		controller.goToPage('print');
	})

	container.editfromSummary.click(function(){
		controller.goToPage('search');
		
	})



}