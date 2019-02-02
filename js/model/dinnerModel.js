"use strict";

/**
 * @description Dish Data
 * @type {Object}
 * @property {string} id
 * @property {string} name
 * @property {string} type
 * @property {string} image
 * @property {string} description
 * @property {Array.<DishIngredient>} ingredients
 */

 /**
  * @description Dish Ingredient Data
  * @type {Object}
  * @property {string} name
  * @property {number} quantity
  * @property {string} unit
  * @property {number} price
  */

  /**
   * @function DinnerModel
   * @description Model to hold dish and guest data
   */

var DinnerModel = function () {

    // Initialize Variable
    this.totalGuests = new Observable(1);
    this.selectedDish = new Observable({});
    this.dishId = new Observable(0);
    this.searchQuery = new Observable({'type':'all','query':''});

    /** @param {Object} query */
    this.setSearchQuery = (query) => {
        if(query){
            this.searchQuery.notifyObserver({'type':query.type,'query': query.query});
        }
        else {
            this.searchQuery.notifyObserver({'type': 'all', 'query': ''});
        };
    };

    this.getSearchQuery = () => {
        return this.searchQuery.getValue();
    };

    // Set current dish ID
    /** @param {number} id */
    this.setCurrentDishId = (id) => {
        this.dishId.notifyObserver(id);
    }

    // Get the current dish ID
    this.getCurrentDishId = () => {
        return this.dishId.getValue();
    }

    // Set number of guest
    /** @param  {number} num */
    this.setNumberOfGuests = function(num) {
        this.totalGuests.notifyObserver(num);
    }

    // Get number of guest
    this.getNumberOfGuests = function() {
        // return totalGuests;
        return this.totalGuests.getValue();
    }

    //Returns all the dishes on the menu.
    this.getFullMenu = () => {
        return Object.values(this.selectedDish.getValue());
    };

    //Returns all ingredients for all the dishes on the menu.
    this.getAllIngredients = () => {
        return this.getFullMenu().map(dish => {
            return dish.ingredients;
        });
    };

    //Get dish total price per dish
    this.dishPrice = (id) => {
        return Number(this.getDish(id).ingredients.map(ingredient => {
            // return ingredient.quantity * ingredient.price;
            return ingredient.price;
        })
            .reduce((acc, cur) => {
                return acc + cur;
            })
        ).toFixed(2)*this.getNumberOfGuests();
    };

    // Get total price of the menu
    this.getTotalMenuPrice = () => {
        let selectedDish = this.getFullMenu();
        if(selectedDish) {
            return this.getNumberOfGuests() * selectedDish.map(dish => {
                return dish.ingredients.map(ingredient => {
                        // return ingredient.quantity * ingredient.price;
                        return ingredient.price;
                    })
                    .reduce((acc, cur) => {
                        return acc + cur;
                    }, 0);
            })
            .reduce((acc, cur) => {
                return acc + cur;
            }, 0);
        };
    };


    // Add dish to menu
    /** @param {number} id */
    this.addDishToMenu = (id) => {
        let dishType = this.getDish(id).type;

        let dishTemp = this.selectedDish.getValue();
        dishTemp[dishType] = this.getDish(id);

        this.selectedDish.notifyObserver(dishTemp);
    };

    // Remove dish from menu
    /** @param {number} id */
    this.removeDishFromMenu = (id) => {
        let dish = this.getDish(id);
        let dishTemp = this.selectedDish.getValue();
        if (dish) {
            delete dishTemp[dish.type];
        };
        this.selectedDish.notifyObserver(dishTemp);
    };


    // Get all dish by id model
    /** @param {number} id */
    this.getDish = (id) => {
        for (let key in dishes) {
            if (dishes[key].id == id) {
                return dishes[key];
            };
        };
    };

    // Get all or filtered dishes
    /** 
     * @param {string} type
     * @param {string} filter
     */
    this.getAllDishes = (type = 'all', filter = '') => {
        filter = filter.toLowerCase();

        return dishes.filter((dish) => {
            var found = true;
            if (filter == "" && type == "all") {
                return true;
            };

            if (filter != "") {
                found = false;
                dish.ingredients.forEach(function(ingredient) {
                    if (ingredient.name.toLowerCase().indexOf(filter) != -1) {
                        found = true;
                    };
                });

                if (dish.name.toLowerCase().indexOf(filter) != -1) {
                    found = true;
                };
            };

            return type === 'all' ? found : dish.type == type && found;
        });
    };


    // Get all dishes type
    this.getDishType = () => {
        let dishType = [];
        dishes.forEach(dish => {
            if (dishType.indexOf(dish.type) === -1)
                dishType.push(dish.type);
        });
        return dishType;
    };
};

/**
 * @class Observable
 * @description class to hold the observable
 * @param {number,Object,Array} value
 */
class Observable {
    constructor(value) {
        this._observers = []; 
        this._value = value;
	}

	addObserver(observer) {
		this._observers.push(observer);
		return observer;
	}

	removeObserver(observer) {
		this._observers.filter(obs => {
            obs !== observer;
        });
	}

	notifyObserver(value) {
        this._value = value;
		for (let observer of this._observers) {
            observer.update(this.getValue());
        }
    }

    getValue() {
        if (Array.isArray(this._value)) {
            return [...this._value];
		}
        
		if (typeof this._value === 'object') {
            return {...this._value};
		}

		return this._value;
    }
};

/**
 * @description array of dummy data for all dishes
 * @type {Array.<Dish>}
 */
const dishes = [{
    'id': 1,
    'name': 'French toast',
    'type': 'starter',
    'image': 'toast.jpg',
    'description': "In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
    'ingredients': [{
        'name': 'eggs',
        'quantity': 0.5,
        'unit': '',
        'price': 10
    }, {
        'name': 'milk',
        'quantity': 30,
        'unit': 'ml',
        'price': 6
    }, {
        'name': 'brown sugar',
        'quantity': 7,
        'unit': 'g',
        'price': 1
    }, {
        'name': 'ground nutmeg',
        'quantity': 0.5,
        'unit': 'g',
        'price': 12
    }, {
        'name': 'white bread',
        'quantity': 2,
        'unit': 'slices',
        'price': 2
    }]
}, {
    'id': 2,
    'name': 'Sourdough Starter',
    'type': 'starter',
    'image': 'sourdough.jpg',
    'description': "Here is how you make it... Lore ipsum...",
    'ingredients': [{
        'name': 'active dry yeast',
        'quantity': 0.5,
        'unit': 'g',
        'price': 4
    }, {
        'name': 'warm water',
        'quantity': 30,
        'unit': 'ml',
        'price': 0
    }, {
        'name': 'all-purpose flour',
        'quantity': 15,
        'unit': 'g',
        'price': 2
    }]
}, {
    'id': 3,
    'name': 'Baked Brie with Peaches',
    'type': 'starter',
    'image': 'bakedbrie.jpg',
    'description': "Here is how you make it... Lore ipsum...",
    'ingredients': [{
        'name': 'round Brie cheese',
        'quantity': 10,
        'unit': 'g',
        'price': 8
    }, {
        'name': 'raspberry preserves',
        'quantity': 15,
        'unit': 'g',
        'price': 10
    }, {
        'name': 'peaches',
        'quantity': 1,
        'unit': '',
        'price': 4
    }]
}, {
    'id': 100,
    'name': 'Meat balls',
    'type': 'main dish',
    'image': 'meatballs.jpg',
    'description': "Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
    'ingredients': [{
        'name': 'extra lean ground beef',
        'quantity': 115,
        'unit': 'g',
        'price': 20
    }, {
        'name': 'sea salt',
        'quantity': 0.7,
        'unit': 'g',
        'price': 3
    }, {
        'name': 'small onion, diced',
        'quantity': 0.25,
        'unit': '',
        'price': 2
    }, {
        'name': 'garlic salt',
        'quantity': 0.7,
        'unit': 'g',
        'price': 2
    }, {
        'name': 'Italian seasoning',
        'quantity': 0.6,
        'unit': 'g',
        'price': 3
    }, {
        'name': 'dried oregano',
        'quantity': 0.3,
        'unit': 'g',
        'price': 3
    }, {
        'name': 'crushed red pepper flakes',
        'quantity': 0.6,
        'unit': 'g',
        'price': 3
    }, {
        'name': 'Worcestershire sauce',
        'quantity': 6,
        'unit': 'ml',
        'price': 7
    }, {
        'name': 'milk',
        'quantity': 20,
        'unit': 'ml',
        'price': 4
    }, {
        'name': 'grated Parmesan cheese',
        'quantity': 5,
        'unit': 'g',
        'price': 8
    }, {
        'name': 'seasoned bread crumbs',
        'quantity': 15,
        'unit': 'g',
        'price': 4
    }]
}, {
    'id': 101,
    'name': 'MD 2',
    'type': 'main dish',
    'image': 'bakedbrie.jpg',
    'description': "Here is how you make it... Lore ipsum...",
    'ingredients': [{
        'name': 'ingredient 1',
        'quantity': 1,
        'unit': 'pieces',
        'price': 8
    }, {
        'name': 'ingredient 2',
        'quantity': 15,
        'unit': 'g',
        'price': 7
    }, {
        'name': 'ingredient 3',
        'quantity': 10,
        'unit': 'ml',
        'price': 4
    }]
}, {
    'id': 102,
    'name': 'MD 3',
    'type': 'main dish',
    'image': 'meatballs.jpg',
    'description': "Here is how you make it... Lore ipsum...",
    'ingredients': [{
        'name': 'ingredient 1',
        'quantity': 2,
        'unit': 'pieces',
        'price': 8
    }, {
        'name': 'ingredient 2',
        'quantity': 10,
        'unit': 'g',
        'price': 7
    }, {
        'name': 'ingredient 3',
        'quantity': 5,
        'unit': 'ml',
        'price': 4
    }]
}, {
    'id': 103,
    'name': 'MD 4',
    'type': 'main dish',
    'image': 'meatballs.jpg',
    'description': "Here is how you make it... Lore ipsum...",
    'ingredients': [{
        'name': 'ingredient 1',
        'quantity': 1,
        'unit': 'pieces',
        'price': 4
    }, {
        'name': 'ingredient 2',
        'quantity': 12,
        'unit': 'g',
        'price': 7
    }, {
        'name': 'ingredient 3',
        'quantity': 6,
        'unit': 'ml',
        'price': 4
    }]
}, {
    'id': 200,
    'name': 'Chocolat Ice cream',
    'type': 'dessert',
    'image': 'icecream.jpg',
    'description': "Here is how you make it... Lore ipsum...",
    'ingredients': [{
        'name': 'ice cream',
        'quantity': 100,
        'unit': 'ml',
        'price': 6
    }]
}, {
    'id': 201,
    'name': 'Vanilla Ice cream',
    'type': 'dessert',
    'image': 'icecream.jpg',
    'description': "Here is how you make it... Lore ipsum...",
    'ingredients': [{
        'name': 'ice cream',
        'quantity': 100,
        'unit': 'ml',
        'price': 6
    }]
}, {
    'id': 202,
    'name': 'Strawberry',
    'type': 'dessert',
    'image': 'icecream.jpg',
    'description': "Here is how you make it... Lore ipsum...",
    'ingredients': [{
        'name': 'ice cream',
        'quantity': 100,
        'unit': 'ml',
        'price': 6
    }]
}];
