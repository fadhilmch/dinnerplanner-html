'use strict';

var HomeView = function(container, model) {
    //initialize component
    this.createDinner = container.find("#create-dinner");
    //console.log(model.searchQuery);

	model.fetchUrl()
		// .then(data => {
    //   console.log(data)
		// })
		// .catch(err => {
		// 	console.log('Error: ' + err);
		// })


	// model.fetchSearch()
	// .then(data => {
	// 	console.log(data)

	// })
	// .catch(err => {
	// 		console.log('Error: ' + err);
	// 	})
	
	

}