'use strict';

var HomeView = function(container, model) {
    //initialize component
    this.createDinner = container.find("#create-dinner");

		let renderError = (err='Error') => {
			container.prepend(`
				<div id='error-home' class="alert alert-danger" role="alert">
					${err}
				</div>
			`)
		};

		this.update = () => {
			let error = container.find("#error-home");
			error.remove();
			if (model.err.getValue() !== ""){
				renderError(model.err.getValue());
			} 
		};
}