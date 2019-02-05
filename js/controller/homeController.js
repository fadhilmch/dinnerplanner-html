var HomeController = function (view, model, generalController){
	

	view.createDinner.click(() => {
		generalController.goToPage('search');

	})

}