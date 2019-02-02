'use strict';

var SelectView = function(container, model) {
    // Get from model
    var arrDishes = model.getDishType();
    var allDishes = model.getAllDishes();
    var allMenu = model.getFullMenu();
    var totalPrice = model.getTotalMenuPrice();
    var totalGuests = model.getNumberOfGuests();


    // Select option for guests number
    var numberOfGuests = container.find(".guest");
    for (var i = 1; i < 10; i++) {
        numberOfGuests.append(`<option value="${i}" ${(i===1)?"selected":""}>${i}</option>`);
    }


    // Dropdown Select for Dishes Type
    var dishType = container.find('#dishType');
    arrDishes.splice(0, 0, 'all');
    arrDishes = arrDishes.map(dish => {
        return dish.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    });


    // Total Cost
    var updateTotalCost = function() {
        totalPrice = model.getTotalMenuPrice();
        var totalCost = container.find('.totalCost');
        totalCost.html(`SEK ${Number(totalPrice).toFixed(2)}`);

        // Menu Wrapper
        var menuWrapper = container.find('#menu-wrapper');
        allDishes.forEach(dish => {
            menuWrapper.append(`
				<div class="col-sm-6 col-md-3 col-lg-2">
					<div class="menu">
						<img src="images/${dish.image}" alt="${dish.name}">
						<div class="caption">
							<h5>${dish.name}</h5>
						</div>
					</div>
				</div>
			`)
        })
    }

    updateTotalCost();

    // Confirm button
    if (allMenu.length > 0) {
        var confirmButton = container.find('.btn-confirm');
        confirmButton.prop('disabled', false);
    }

    // Table Sidebar
    var updateSidebar = function() {
        var menuTable = container.find('.menu-table');
        allMenu = model.getFullMenu();
        totalGuests = model.getNumberOfGuests();
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
    updateSidebar();
}