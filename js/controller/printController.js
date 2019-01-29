var PrintController = function(view, model, generalController){
	
	view.editfromPrint.click(() => {
		generalController.goToPage('search');
		
	})
}