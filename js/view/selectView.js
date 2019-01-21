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
var SelectView = function (container, model) {
	
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
	
// 	 // Dummy
// 	model.addDishToMenu(1);
// 	model.addDishToMenu(100);
// 	var tes = container.find('#tes');
// 	// tes.load('./components/title.html');
// 	$("#tes").load("./components/title.html #insert");
// 	// $("#tes").append("./components/title.html");

	
// 	// Get from model
// 	var arrDishes = model.getDishType();
// 	var allDishes = model.getAllDishes();
// 	var allMenu = model.getFullMenu();
// 	var totalPrice = model.getTotalMenuPrice();
// 	var totalGuests = model.getNumberOfGuests();
	

//   // Select option for guests number
//   var numberOfGuests = container.find(".guest");
//   for (var i = 1; i < 10; i++){
//     numberOfGuests.append(`<option value="${i}" ${(i===1)?"selected":""}>${i}</option>`);
// 	}


//   // Dropdown Select for Dishes Type
//   var dishType = container.find('#dishType');
//   arrDishes.splice(0,0,'all');
//   arrDishes = arrDishes.map(dish => {
//       return dish.replace(
//           /\w\S*/g,
//           function(txt) {
//               return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//           }
//       );
//   });

//   // for(var i = 0; i < arrDishes.length; i++){
//   //   dishType.append(`<option value=${arrDishes[i].toLowerCase()}>${arrDishes[i]}</option>`);
// 	// }
	
// 	// for(var i = 0; i < arrDishes.length; i++){
//  //    dishType.append(`<li class="dropdown-item">${arrDishes[i]}</a></li>`);
//  //  }


// 	// Total Cost
// 	var updateTotalCost = function(){
// 		totalPrice = model.getTotalMenuPrice();
// 		var totalCost = container.find('.totalCost');
// 		totalCost.html(`SEK ${Number(totalPrice).toFixed(2)}`);
		
// 		// Menu Wrapper
// 		var menuWrapper = container.find('#menu-wrapper');
// 		allDishes.forEach(dish => {
// 			menuWrapper.append(`
// 				<div class="col-sm-6 col-md-3 col-lg-2">
// 					<div class="menu">
// 						<img src="images/${dish.image}" alt="${dish.name}">
// 						<div class="caption">
// 							<h5>${dish.name}</h5>
// 						</div>
// 					</div>
// 				</div>
// 			`)
// 		})
// 	}

// 	updateTotalCost();

// 	// Confirm button
// 	if(allMenu.length > 0){
// 		var confirmButton = container.find('.btn-confirm');
// 		confirmButton.prop('disabled', false);
// 	}

// 	// Table Sidebar
// 	var updateSidebar = function() {
// 		var menuTable = container.find('.menu-table');
// 		allMenu = model.getFullMenu();
// 		totalGuests = model.getNumberOfGuests();
// 		menuTable.children().remove();
// 		allMenu.forEach(dish => {
// 			menuTable.append(`							
// 				<tr>
// 					<td>${dish.name}</td>
// 					<td>${
// 						Number(
// 							dish.ingredients.map(ingredient => {
// 								return ingredient.quantity * ingredient.price;
// 							})
// 							.reduce((acc, cur) => {
// 								return acc + cur;
// 							})
// 						).toFixed(2)*totalGuests
// 					}
// 					</td>
// 				</tr>
// 			`);
// 		})
// 	}
// 	updateSidebar();



// 	// ======> EVENT 

// 	// Change nummber of guess
// 	numberOfGuests.on('change', function() {
// 		console.log(`Number of guests: ${this.value}`);
// 		model.setNumberOfGuests(this.value);
// 		updateTotalCost();
// 		updateSidebar();
// 	})
	
// }
 
