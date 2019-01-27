var HomeController = function (view, model, controller){

	view.createDinner.click(function(){
		controller.goToPage('search');

	})

}