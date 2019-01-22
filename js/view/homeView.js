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
var HomeView = function (container, model) {
	
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
	
	
	// ===========================
	// 						GLOBAL 
	// ===========================

	// Dummy Data
	model.addDishToMenu(1);
	model.addDishToMenu(100);

	 // Get from model
	var arrDishes = model.getDishType();
	var allDishes = model.getAllDishes();
	var allMenu = model.getFullMenu();
	var totalPrice = model.getTotalMenuPrice();
	var totalGuests = model.getNumberOfGuests();
	var menuPrice = model.getPricePerMenu(100);
	console.log(menuPrice);
	var total=0;

	/*Show View Component on Page
	var topNav = container.find('#top-nav');
	topNav.load('./components/title.html');

	var navMobile = container.find('#nav-mobile');
	navMobile.load('./components/nav-mobile.html');

	var sidebar = container.find('#sidebar');
	sidebar.load('./components/sidebar.html');*/



	// ===========================
	// 			selectdish.html 
	// ===========================


	// Select option for guests number
  var numberOfGuests = container.find(".guest");
  for (var i = 1; i < 10; i++){
    numberOfGuests.append(`<option value="${i}" ${(i===1)?"selected":""}>${i}</option>`);
	}


  // Dropdown Select for Dishes Type
  var dishType = container.find('#dishType');
  arrDishes.splice(0,0,'all');
  arrDishes = arrDishes.map(dish => {
      return dish.replace(
          /\w\S*/g,
          function(txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
      );
	});    

	
	// Total Cost
	var updateTotalCost = function(){
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
	if(allMenu.length > 0){
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

	// ======> EVENT 

	// Change number of guest
	numberOfGuests.on('change', function() {
		console.log(`Number of guests: ${this.value}`);
		model.setNumberOfGuests(this.value);
		updateTotalCost();
		updateSidebar();
	})

  // // Select option for guests number
  // var numberOfGuests = container.find(".guest");
  // for (var i = 1; i < 10; i++){
  //   numberOfGuests.append(`<option value="${i}" ${(i===1)?"selected":""}>${i}</option>`);
  // }

  // // Dropdown Select for Dishes Type
  // var dishType = container.find('#dishType');
  // var arrDishes = model.getDishType();
  // arrDishes.splice(0,0,'all');
  // arrDishes = arrDishes.map(dish => {
  //     return dish.replace(
  //         /\w\S*/g,
  //         function(txt) {
  //             return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  //         }
  //     );
  // });

  // // for(var i = 0; i < arrDishes.length; i++){
  // //   dishType.append(`<option value=${arrDishes[i].toLowerCase()}>${arrDishes[i]}</option>`);
	// // }
	
	// for(var i = 0; i < arrDishes.length; i++){
  //   dishType.append(`<li class="dropdown-item">${arrDishes[i]}</a></li>`);
  // }


	// // Total Cost
	// var totalCost = container.find('.totalCost');
	// totalCost.html(`SEK 0.00`)
	// console.log(arrDishes);
	
	// // Menu Wrapper
	// var menuWrapper = container.find('#menu-wrapper');
	// var allDishes = model.getAllDishes();
	// allDishes.forEach(dish => {
	// 	menuWrapper.append(`
	// 		<div class="col-sm-6 col-md-3 col-lg-2">
	// 			<div class="menu">
	// 				<img src="images/${dish.image}" alt="${dish.name}">
	// 				<div class="caption">
	// 					<h5>${dish.name}</h5>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	`)
	// })

	// ================================================

	// ===========================
	// 			dishdetails.html 
	// ===========================

	//LOAD DETAIL SELECTED MENU

	var loadSelectedDish = function(){
	var detailDish = container.find("#dish-wrapper");
  	var getDish = model.getDish(2);
  	detailDish.append(`<div>
					<h4>${getDish.name.toUpperCase()}</h4>
					
					  	<img class="fitImage" alt="Responsive image" src="images/${getDish.image}">
						<div>
					  		<p>${getDish.description} </p>  </div>
					  		<a href="#" class="btn btn-warning">Back to Search</a>
					</div>
				</div>`)

   }

   loadSelectedDish();


  	//LOAD INGREDIENTS OF SELECTED MENU
  	var loadIngredients = function(){
  	var ingredientsDish = container.find("#ingredients-wrapper");
  	var getDish = model.getDish(2);
  	getDish.ingredients.forEach(dish => {
  	ingredientsDish.append(`<div class="table-responsive">
				<table class="table">
					  <tbody> 	
					    <tr>
					      <th scope="row">${dish.quantity + dish.unit}</th>
					      <td>${dish.name}</td>
					      <td>SEK</td>
					      <td>${dish.price}</td>
					    </tr>
			
					  </tbody>
				</table>
				</div>`)
	  })
	}

	loadIngredients();
  	
  	// READ THE NUMBER OF GUEST  	
  	var totalPeople = container.find(".guest");
  	totalPeople.on('change', function() {
		console.log(`Number of guests: ${this.value}`);
		model.setNumberOfGuests(this.value);
		total = this.value;	
	})


	var people = container.find("#guestIngredients");
  	// guestIngredients = model.getNumberOfGuests();
  	people.append(`INGREDIENTS FOR ${model.getNumberOfGuests()}  PEOPLE` );

  	
	// ===========================
	// 	 dinneroverview.html 
	// ===========================


	//LOAD DATA MENU OVERVIEW
	var loadAllMenuOverview = function(){
	var selectedMenu = container.find("#selected-wrapper");
	var allMenu = model.getFullMenu();
	console.log(allMenu);
	allMenu.forEach(dish => {
		selectedMenu.append(`
			<div class="col-sm-6 col-md-3">
						<div class="img-thumbnail">
							<img src="images/${dish.image}" class="fitImage" alt="...">
							<div class="caption">
								<h6 style="padding-top: 5px">${dish.name}</h6>

							</div>
						</div>
						<div class="caption" style="padding-top: 5px">
							<h6 class="text-danger" style="text-align: right;"> SEK</h6>
						</div>
					</div>
				`)
		})
	}

	loadAllMenuOverview();

	
	//LOAD TOTAL PRICE OF SELECTED MENU ON OVERVIEW
	var getTotalMenuPrice = function(){
	console.log(model.getNumberOfGuests());
	var priceAcc = container.find("#totalPrice");
	var totalPrice = model.getTotalMenuPrice();
	priceAcc.append(`
		${totalPrice} SEK`);
	}
	 getTotalMenuPrice();

 
	//LOAD DATA OF GUEST
	var totalGuest = container.find("#guestOverview");
  	guestOverview = model.getNumberOfGuests();
  	totalGuest.append(`My Dinner: ${guestOverview}  People`);


  	// ===========================
	// 		printout.html 
	// ===========================
  	
  	//LOAD TOTAL OF GUEST
  	var totalGuestPrint = container.find("#guestPrint");
  	totalGuestPrint.append(`My Dinner: ${guestOverview}  People`);

  	//LOAD DATA OF MENU ON PRINT OUT

  	var loadPrintMenu = function(){
  	var printMenu = container.find("#printOut");
  	allMenu.forEach( dish=>{

  		printMenu.append(`<br>
  			<div class="row">
  				<div class="col-md-6" style="padding-bottom: 10px">
  					<div class="row">
			  			<div class="col-md-6 center" style="padding-bottom: 10px">
			  				<img class="fitImage" src="images/${dish.image}">
			  			</div>

			  			<div class="col-md-6" >
			  				<h5>${dish.name.toUpperCase()}</h5>
			  				<p>
			  				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
			  				</p>
		  				</div>
	  				</div>
	  			</div>	
	  			<div class="col-md-6">
	  				<h5>PREPARATION</h5>
	  				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>
	  			
	  			</div>
	  			</div>
  			
  			<br>
  			<br>`)
  	})
  	}

  	loadPrintMenu();
	/**
	 * When we want references to some view elements to be available from outside of view, we 
	 * define them as this.someName. We don't need this in Lab 1 yet, but in Lab 2 it 
	 * will be important for assigning listeners to these buttons, because the listeners
	 * should not be assigned in the view, but rather in controller.
	 * 
	 * We can then, in some other code, use exampleView.plusButton to reference the 
	 * this button and do something with it (see Lab 2).
	 * 
	 */

	
	/**
	 * Here we use @var {jQuery object} numberOfGuests that is a reference to <span>
	 * in our view to dynamically set it's value to "Hello World".
	 */
	
	// numberOfGuests.html(model.getNumberOfGuests());


	
}
 
