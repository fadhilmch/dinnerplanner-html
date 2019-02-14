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

var DinnerModel = function() {

    // Initialize Variable
    this.totalGuests = new Observable(1);
    this.selectedDish = new Observable([]);
    this.dishId = new Observable(0);
    this.fetchedDishes = new Observable([]);
    this.infoRecipes = new Observable();
    this.recipeInfo = new Observable({});
    this.err = new Observable("");

    var searchQuery = { 'type': 'all', 'query': '' };
    var url = 'http://sunset.nada.kth.se:8080/iprog/group/29/recipes/random?limitLicense=false&number=10&tags=';
    var header = '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767';
    var infoUrl = "http://sunset.nada.kth.se:8080/iprog/group/29/recipes/";
    var searchUrl = "http://sunset.nada.kth.se:8080/iprog/group/29/recipes/search?number=20&offset=0&";
    this._isLoading = new Observable(false);

    this.fetchUrl = () => {
        this._isLoading.notifyObserver(true);
        return fetch(searchUrl, {
                method: 'GET',
                headers: {
                    'X-Mashape-key': header
                }
            }).then(res => res.json())
            .then(data => {
                this._isLoading.notifyObserver(false);
                this.fetchedDishes.notifyObserver([...data.results]);
                return data.recipes;
            })
            .catch(err => {
                this._isLoading.notifyObserver(false);
                return Promise.reject(Error(err.message))
            })
    }

    this.fetchSearch = (type, query) => {
        query = query.toLowerCase().replace(/\s/g, '+');
        type = type.toLowerCase().replace(/\s/g, '+');
        query = query === 'all' ? '' : query;
        this._isLoading.notifyObserver(true);
        let tempUrl = query == "" ? `${searchUrl}type=${type}` : `${searchUrl}type=${type}&query=${query}`;
        return fetch(tempUrl, {
                method: 'GET',
                headers: {
                    'X-Mashape-key': header
                }
            }).then(res => res.json())
            .then(data => {
                this._isLoading.notifyObserver(false);
                this.fetchedDishes.notifyObserver([...data.results]);
                return data.recipes;
            })
            .catch(err => {
                this._isLoading.notifyObserver(false);
                return Promise.reject(Error(err.message))
            })
    }

    this.getLoading = () => {
        return this._isLoading.getValue();
    }

    this.getRecipeInfo = (id) => {
        this._isLoading.notifyObserver(true);
        return fetch(infoUrl + id + '/information?includeNutrition=false', {
                method: 'GET',
                headers: {
                    'X-Mashape-key': header,
                }
            })
            .then(res => {
                this._isLoading.notifyObserver(false);
                if (res.status !== 200) {
                    return Promise.reject(Error("No Data"))
                } else {
                    return res.json();
                }
            })
            .then(dish => {
                this.recipeInfo.notifyObserver(dish);
            })
            .catch(err => {
                this._isLoading.notifyObserver(false);
                return Promise.reject(Error(err.message))
            })

    }

    this.getInfo = () => {
        return this.recipeInfo.getValue();

    }

    /** @param {Object} query */
    this.setSearchQuery = (query) => {
        if (query) {
            searchQuery = { 'type': query.type, 'query': query.query };
        } else {
            searchQuery = { 'type': 'all', 'query': '' };
        };
    };

    this.getSearchQuery = () => {
        return searchQuery;
        // return this.searchQuery.getValue();
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
        return this.selectedDish.getValue();
    };

    //Returns all ingredients for all the dishes on the menu.
    this.getAllIngredients = () => {
        return this.getFullMenu().map(dish => {
            return dish.ingredients;
        });
    };


    //Get dish total price per dish
    this.dishPrice = (id) => {
        let dishes = this.getFullMenu();
        let price = dishes.filter(dish => { return dish.id === id })[0].pricePerServing;
        return price * this.getNumberOfGuests();
    };


    // Get total price of the menu
    this.getTotalMenuPrice = () => {
        let selectedDish = this.getFullMenu();
        if (selectedDish) {
            return this.getNumberOfGuests() * selectedDish.map(dish => {
                    return dish.pricePerServing;

                })
                .reduce((acc, cur) => {
                    return acc + cur;
                }, 0);
        };
    };


     // Add dish to menu
    /** @param {number} id */
    this.addDishToMenu = (id) => {
        let dishTemp = this.selectedDish.getValue();
        let dish = this.getInfo();
        if (dishTemp.map(value => (value.id)).indexOf(dish.id) === -1)
            dishTemp.push(dish);
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
        let temp = this.fetchedDishes.getValue();
        for (let key in temp) {
            if (temp[key].id == id) {
                return temp[key];
            };
        };
    };

    // Get all or filtered dishes
    /** 
     * @param {string} type
     * @param {string} filter
     */

    this.getAllDishes = () => {
        return this.fetchedDishes.getValue();
       
    };


    // Get all dishes type
    this.getDishType = () => {
        let dishType = [];
        this.fetchedDishes.getValue().forEach(dish => {
            dish.dishTypes.forEach(type => {
                if (dishType.indexOf(type) === -1)
                    dishType.push(type);
            })
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
            return { ...this._value };
        }

        return this._value;
    }
};
