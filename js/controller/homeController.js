var HomeController = function (view, model, generalController){
	console.log('fetch URL');
	model.fetchUrl();
	view.createDinner.click(() => {
		generalController.goToPage('search');

	})

}