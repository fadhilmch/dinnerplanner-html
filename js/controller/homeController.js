var HomeController = function (view, model, generalController){
	console.log('fetch URL');
	model.fetchUrl()
		.then(data => {
			console.log(model.getDishType2());
		})
		.catch(err => {
			console.log('Error: ' + err);
		})


	view.createDinner.click(() => {
		generalController.goToPage('search');

	})

}