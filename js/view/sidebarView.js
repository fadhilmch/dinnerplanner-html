/** ExampleView Object constructor
 * 
 * This object represents the code for one specific view (in this case the Example view). 
 * 
 * It is responsible for:
 * - constructing the view (e.g. if you need to create some HTML elements procedurally) 
 * - populating the view with the data
 * - updating the view when the data changes
 * 
 * You should create a view Object like this for every view in your UI.
 * 
 * @param {jQuery object} container - references the HTML parent element that contains the view.
 * @param {Object} model - the reference to the Dinner Model
 */ 
var SidebarView = function (container, model) {
	
	/**
	 * We use the @method find() on @var {jQuery object} container to look for various elements 
	 * inside the view in orther to use them later on. For instance:	
	 * 
	 * @var {jQuery object} numberOfGuests is a reference to the <span> element that 
	 * represents the placeholder for where we want to show the number of guests. It's
	 * a reference to HTML element (wrapped in jQuery object for added benefit of jQuery methods)
	 * and we can use it to modify <span>, for example to populate it with dynamic data (for now 
	 * only 'Hello world', but you should change this by end of Lab 1).
	 * 
	 * We use variables when we want to make the reference private (only available within) the
	 * ExampleView.
	 * 
	 * IMPORTANT: Never use $('someSelector') directly in the views. Always use container.find
	 * or some other way of searching only among the containers child elements. In this way you
	 * make your view code modular and ensure it dosn't break if by mistake somebody else
	 * in some other view gives the same ID to another element.
	 * 
	 */
	
	// Dummy Data
	model.addDishToMenu(1);
	model.addDishToMenu(100);

	// Get from model
	var allMenu = model.getFullMenu();
	var totalPrice = model.getTotalMenuPrice();
   var totalGuests = model.getNumberOfGuests();
  
  // Initialize variable

  //Initialize Component
  var numberOfGuests = container.find(".guest");
  var totalCost = container.find('.totalCost');
  var confirmButton = container.find('.btn-confirm');
  var menuTable = container.find('.menu-table');

  
  // Initialize Function
  var initialize = function() {
    // Show options on select for guest number
    for (var i = 1; i < 10; i++){
      numberOfGuests.append(`<option value="${i}" ${(i===1)?"selected":""}>${i}</option>`);
    };
    setConfimButtonStatus();
  };
  
	// Total Cost
	var calculateTotalCost = function(){
		totalCost.html(`SEK ${Number(totalPrice).toFixed(2)}`);
	}

  // Confirm button
  var setConfimButtonStatus = function() {
    if(allMenu.length > 0){
      confirmButton.prop('disabled', false);
    }
  }

	// Table Sidebar
	var showSidebar = function() {
		menuTable.children().remove();
		allMenu.forEach(dish => {
			menuTable.append(`							
				<tr>
					<td>${dish.name}</td>
					<td>${
						Number(
							dish.ingredients.map(ingredient => {
								return ingredient.quantity * ingredient.price;
							})
							.reduce((acc, cur) => {
								return acc + cur;
							})
						).toFixed(2)*totalGuests
					}
					</td>
				</tr>
			`);
		})
  }
  
  initialize();
  showSidebar();
	calculateTotalCost();
  
	// ======> EVENT 

	// Change nummber of guess
	numberOfGuests.on('change', function() {
		console.log(`Number of guests: ${this.value}`);
		model.setNumberOfGuests(this.value);
	})
	
}
 
