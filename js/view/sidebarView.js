var SidebarView = function (container, model) {
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
  var navPrice = container.find('#nav-price');
  
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
    navPrice.html(`SEK ${Number(totalPrice).toFixed(2)}`);
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
 
