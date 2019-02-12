var HomeController = function (view, model, generalController){
	model.err.addObserver(view);	

	view.createDinner.click(() => {
		model.fetchUrl()
			.then(() => {
				model.err.notifyObserver("");
				generalController.goToPage('search');
			})
			.catch(err => {
				model.err.notifyObserver('Error: No Internet Connection! Make sure you connect to internet, then refresh the page!');
			})
	})

}