const DinnerModel = require('./dinnerModel');
const model = new DinnerModel();

// Set Number of guests
model.setNumberOfGuests(3);

// Get Number of guests
var numberOfGuests = model.getNumberOfGuests();

// add dish to menu
model.addDishToMenu(1);
model.addDishToMenu(2);
model.addDishToMenu(103);


// get selected dish
var selectedDish = model.getSelectedDish('starter');

// get full menu
var fullMenu = model.getFullMenu();

console.log(fullMenu);

// get all ingredient
var allIngredients = model.getAllIngredients();

// get total menu price
var totalMenuPrice = model.getTotalMenuPrice();

// remove dish from menu
var updateMenu = model.removeDishFromMenu(1);

// console.log(updateMenu);
