var SummaryController = function(container, model, controller){

	container.printReceipt.click(function(){
		controller.goToPage('print');
	})

}