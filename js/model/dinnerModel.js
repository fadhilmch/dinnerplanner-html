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
    this.selectedDish = new Observable({});
    this.dishId = new Observable(0);
    this.searchQuery = new Observable({ 'type': 'all', 'query': '' });
    this.fetchedDishes = [];

    var url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=10&tags=';
    var header = '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767';

    this.fetchUrl = () => {
        return fetch(url, {
                method: 'GET',
                headers: {
                    'X-Mashape-key': header
                }
            }).then(res => res.json())
            .then(data => {
                this.fetchedDishes = data.recipes;
                console.log('Success: ', JSON.stringify(data.recipes[0].id));
                return data.recipes;
            })
            .catch(err => {
                console.log('Error: ', err);
                return Promise.reject(Error(error.message))
            })
    }

    /** @param {Object} query */
    this.setSearchQuery = (query) => {
        if (query) {
            this.searchQuery.notifyObserver({ 'type': query.type, 'query': query.query });
        } else {
            this.searchQuery.notifyObserver({ 'type': 'all', 'query': '' });
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
        ).toFixed(2) * this.getNumberOfGuests();
    };

    //Get dish total price per dish
    this.dishPrice2 = (id) => {
        var dish = this.getDish2(id);
        return dish.pricePerServing * this.getNumberOfGuests();
    };

    // Get total price of the menu
    this.getTotalMenuPrice = () => {
        let selectedDish = this.getFullMenu();
        if (selectedDish) {
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

    // Get total price of the menu
    this.getTotalMenuPrice2 = () => {
        let selectedDish = this.getFullMenu();
        if (selectedDish) {
            return this.getNumberOfGuests() * selectedDish.map(dish => {
                    return dish.pricePerServing;
                       console.log(dish.pricePerServing);
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

    this.addDishToMenu2 = (id) => {
        let dishType = this.getDish2(id).dishTypes;
        console.log(dishType);

        let dishTemp = this.selectedDish.getValue();
        dishTemp[dishType] = this.getDish2(id);

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

    this.getDish2 = (id) => {
        for (let key in this.fetchedDishes) {
            if (this.fetchedDishes[key].id == id) {
                return this.fetchedDishes[key];
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

    this.getAllDishes2 = (type = 'all', filter = '') => {
        filter = filter.toLowerCase();
        console.log(this.fetchedDishes);
        return this.fetchedDishes.filter((dish) => {
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

    this.getDishType2 = () => {
        let dishType = [];
        this.fetchedDishes.forEach(dish => {
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

/**
 * @description array of dummy data for all dishes
 * @type {Array.<Dish>}
 */
const dishes = [
    // {
    //     "vegetarian": false,
    //     "vegan": false,
    //     "glutenFree": true,
    //     "dairyFree": false,
    //     "veryHealthy": true,
    //     "cheap": false,
    //     "veryPopular": true,
    //     "sustainable": false,
    //     "weightWatcherSmartPoints": 14,
    //     "gaps": "no",
    //     "lowFodmap": false,
    //     "ketogenic": false,
    //     "whole30": false,
    //     "preparationMinutes": 20,
    //     "cookingMinutes": 10,
    //     "sourceUrl": "http://www.theroastedroot.net/broiled-salmon-and-fig-salad-with-blackberries-and-green-goddess-dressing/",
    //     "spoonacularSourceUrl": "https://spoonacular.com/broiled-salmon-and-fig-salad-with-blackberries-and-green-goddess-dressing-814353",
    //     "aggregateLikes": 1258,
    //     "spoonacularScore": 100,
    //     "healthScore": 100,
    //     "creditText": "The Roasted Root",
    //     "sourceName": "The Roasted Root",
    //     "pricePerServing": 630.99,
    //     "extendedIngredients": [
    //         {
    //             "id": 9037,
    //             "aisle": "Produce",
    //             "image": "avocado.jpg",
    //             "consitency": "solid",
    //             "name": "avocado",
    //             "original": "1 ripe avocado, sliced",
    //             "originalString": "1 ripe avocado, sliced",
    //             "originalName": "ripe avocado, sliced",
    //             "amount": 1,
    //             "unit": "",
    //             "meta": [
    //                 "ripe",
    //                 "sliced"
    //             ],
    //             "metaInformation": [
    //                 "ripe",
    //                 "sliced"
    //             ],
    //             "measures": {
    //                 "us": {
    //                     "amount": 1,
    //                     "unitShort": "",
    //                     "unitLong": ""
    //                 },
    //                 "metric": {
    //                     "amount": 1,
    //                     "unitShort": "",
    //                     "unitLong": ""
    //                 }
    //             }
    //         },
    //         {
    //             "id": 9042,
    //             "aisle": "Produce",
    //             "image": "blackberries.jpg",
    //             "consitency": "solid",
    //             "name": "blackberries",
    //             "original": "½ cup blackberries",
    //             "originalString": "½ cup blackberries",
    //             "originalName": "blackberries",
    //             "amount": 0.5,
    //             "unit": "cup",
    //             "meta": [],
    //             "metaInformation": [],
    //             "measures": {
    //                 "us": {
    //                     "amount": 0.5,
    //                     "unitShort": "cups",
    //                     "unitLong": "cups"
    //                 },
    //                 "metric": {
    //                     "amount": 118.294,
    //                     "unitShort": "g",
    //                     "unitLong": "grams"
    //                 }
    //             }
    //         },
    //         {
    //             "id": 9050,
    //             "aisle": "Produce",
    //             "image": "blueberries.jpg",
    //             "consitency": "solid",
    //             "name": "blueberries",
    //             "original": "½ cup blueberries",
    //             "originalString": "½ cup blueberries",
    //             "originalName": "blueberries",
    //             "amount": 0.5,
    //             "unit": "cup",
    //             "meta": [],
    //             "metaInformation": [],
    //             "measures": {
    //                 "us": {
    //                     "amount": 0.5,
    //                     "unitShort": "cups",
    //                     "unitLong": "cups"
    //                 },
    //                 "metric": {
    //                     "amount": 118.294,
    //                     "unitShort": "g",
    //                     "unitLong": "grams"
    //                 }
    //             }
    //         },
    //         {
    //             "id": 2009,
    //             "aisle": "Spices and Seasonings",
    //             "image": "chili-powder.jpg",
    //             "consitency": "solid",
    //             "name": "chili powder",
    //             "original": "Chili powder",
    //             "originalString": "Chili powder",
    //             "originalName": "Chili powder",
    //             "amount": 2,
    //             "unit": "servings",
    //             "meta": [],
    //             "metaInformation": [],
    //             "measures": {
    //                 "us": {
    //                     "amount": 2,
    //                     "unitShort": "servings",
    //                     "unitLong": "servings"
    //                 },
    //                 "metric": {
    //                     "amount": 2,
    //                     "unitShort": "servings",
    //                     "unitLong": "servings"
    //                 }
    //             }
    //         },
    //         {
    //             "id": 42193,
    //             "aisle": "Condiments",
    //             "image": "mayonnaise.png",
    //             "consitency": "liquid",
    //             "name": "fat free mayo",
    //             "original": "Mayo-Free Green Goddess Dressing",
    //             "originalString": "Mayo-Free Green Goddess Dressing",
    //             "originalName": "Mayo-Free Green Goddess Dressing",
    //             "amount": 2,
    //             "unit": "servings",
    //             "meta": [
    //                 "green"
    //             ],
    //             "metaInformation": [
    //                 "green"
    //             ],
    //             "measures": {
    //                 "us": {
    //                     "amount": 2,
    //                     "unitShort": "servings",
    //                     "unitLong": "servings"
    //                 },
    //                 "metric": {
    //                     "amount": 2,
    //                     "unitShort": "servings",
    //                     "unitLong": "servings"
    //                 }
    //             }
    //         },
    //         {
    //             "id": 9089,
    //             "aisle": "Dried Fruits;Produce",
    //             "image": "figs-fresh.jpg",
    //             "consitency": "solid",
    //             "name": "figs",
    //             "original": "Maple Roasted Figs",
    //             "originalString": "Maple Roasted Figs",
    //             "originalName": "Maple Roasted Figs",
    //             "amount": 2,
    //             "unit": "servings",
    //             "meta": [],
    //             "metaInformation": [],
    //             "measures": {
    //                 "us": {
    //                     "amount": 2,
    //                     "unitShort": "servings",
    //                     "unitLong": "servings"
    //                 },
    //                 "metric": {
    //                     "amount": 2,
    //                     "unitShort": "servings",
    //                     "unitLong": "servings"
    //                 }
    //             }
    //         },
    //         {
    //             "id": 1022020,
    //             "aisle": "Spices and Seasonings",
    //             "image": "garlic-powder.png",
    //             "consitency": "solid",
    //             "name": "garlic powder",
    //             "original": "Garlic powder",
    //             "originalString": "Garlic powder",
    //             "originalName": "Garlic powder",
    //             "amount": 2,
    //             "unit": "servings",
    //             "meta": [],
    //             "metaInformation": [],
    //             "measures": {
    //                 "us": {
    //                     "amount": 2,
    //                     "unitShort": "servings",
    //                     "unitLong": "servings"
    //                 },
    //                 "metric": {
    //                     "amount": 2,
    //                     "unitShort": "servings",
    //                     "unitLong": "servings"
    //                 }
    //             }
    //         },
    //         {
    //             "id": 10011251,
    //             "aisle": "Produce",
    //             "image": "romaine.jpg",
    //             "consitency": "solid",
    //             "name": "hearts of romaine",
    //             "original": "5 ounces hearts of romaine, chopped",
    //             "originalString": "5 ounces hearts of romaine, chopped",
    //             "originalName": "hearts of romaine, chopped",
    //             "amount": 5,
    //             "unit": "ounces",
    //             "meta": [
    //                 "chopped"
    //             ],
    //             "metaInformation": [
    //                 "chopped"
    //             ],
    //             "measures": {
    //                 "us": {
    //                     "amount": 5,
    //                     "unitShort": "oz",
    //                     "unitLong": "ounces"
    //                 },
    //                 "metric": {
    //                     "amount": 141.748,
    //                     "unitShort": "g",
    //                     "unitLong": "grams"
    //                 }
    //             }
    //         },
    //         {
    //             "id": 4053,
    //             "aisle": "Oil, Vinegar, Salad Dressing",
    //             "image": "olive-oil.jpg",
    //             "consitency": "liquid",
    //             "name": "olive oil",
    //             "original": "Olive oil",
    //             "originalString": "Olive oil",
    //             "originalName": "Olive oil",
    //             "amount": 2,
    //             "unit": "servings",
    //             "meta": [],
    //             "metaInformation": [],
    //             "measures": {
    //                 "us": {
    //                     "amount": 2,
    //                     "unitShort": "servings",
    //                     "unitLong": "servings"
    //                 },
    //                 "metric": {
    //                     "amount": 2,
    //                     "unitShort": "servings",
    //                     "unitLong": "servings"
    //                 }
    //             }
    //         },
    //         {
    //             "id": 15076,
    //             "aisle": "Seafood",
    //             "image": "salmon.png",
    //             "consitency": "solid",
    //             "name": "salmon fillets",
    //             "original": "2 (1/3-pound) salmon fillets",
    //             "originalString": "2 (1/3-pound) salmon fillets",
    //             "originalName": "salmon fillets",
    //             "amount": 0.6666666666666666,
    //             "unit": "pound",
    //             "meta": [],
    //             "metaInformation": [],
    //             "measures": {
    //                 "us": {
    //                     "amount": 0.667,
    //                     "unitShort": "lb",
    //                     "unitLong": "pounds"
    //                 },
    //                 "metric": {
    //                     "amount": 302.395,
    //                     "unitShort": "g",
    //                     "unitLong": "grams"
    //                 }
    //             }
    //         },
    //         {
    //             "id": 1012047,
    //             "aisle": "Spices and Seasonings",
    //             "image": "salt.jpg",
    //             "consitency": "solid",
    //             "name": "sea salt",
    //             "original": "Sea salt",
    //             "originalString": "Sea salt",
    //             "originalName": "Sea salt",
    //             "amount": 2,
    //             "unit": "servings",
    //             "meta": [],
    //             "metaInformation": [],
    //             "measures": {
    //                 "us": {
    //                     "amount": 2,
    //                     "unitShort": "servings",
    //                     "unitLong": "servings"
    //                 },
    //                 "metric": {
    //                     "amount": 2,
    //                     "unitShort": "servings",
    //                     "unitLong": "servings"
    //                 }
    //             }
    //         }
    //     ],
    //     "id": 814353,
    //     "title": "Broiled Salmon and Fig Salad with Blackberries and Green Goddess Dressing",
    //     "readyInMinutes": 30,
    //     "servings": 2,
    //     "image": "https://spoonacular.com/recipeImages/814353-556x370.jpg",
    //     "imageType": "jpg",
    //     "cuisines": [],
    //     "dishTypes": [
    //         "lunch",
    //         "main course",
    //         "main dish",
    //         "dinner"
    //     ],
    //     "diets": [
    //         "gluten free",
    //         "pescatarian"
    //     ],
    //     "occasions": [],
    //     "winePairing": {
    //         "pairedWines": [
    //             "chardonnay",
    //             "pinot noir",
    //             "sauvignon blanc"
    //         ],
    //         "pairingText": "Salmon on the menu? Try pairing with Chardonnay, Pinot Noir, and Sauvignon Blanc. To decide on white or red, you should consider your seasoning and sauces. Chardonnay is a great friend to buttery, creamy dishes, while sauvignon blanc can complement herb or citrus-centric dishes. A light-bodied, low-tannin red such as the pinot noir goes great with broiled or grilled salmon. The CalNaturale Chardonnay Lodi with a 4.1 out of 5 star rating seems like a good match. It costs about 11 dollars per bottle.",
    //         "productMatches": [
    //             {
    //                 "id": 430688,
    //                 "title": "CalNaturale Chardonnay Lodi",
    //                 "description": "Complexity and intensity define this Chardonnay. The nose is full of citrus, green apple and pear with floral overtones. The flavors are rich on entry with lively fruit in the mid palate and a long fruity, warm finish.",
    //                 "price": "$10.99",
    //                 "imageUrl": "https://spoonacular.com/productImages/430688-312x231.jpg",
    //                 "averageRating": 0.82,
    //                 "ratingCount": 2,
    //                 "score": 0.677142857142857,
    //                 "link": "https://www.amazon.com/2014-CalNaturale-Chardonnay-Lodi-1-0/dp/B00DBF4NJK?tag=spoonacular-20"
    //             }
    //         ]
    //     },
    //     "instructions": "Preheat the oven on the high broil setting and move one of the racks to the second to the highest shelf.Coat the bottom of a baking dish with olive oil and place the salmon in the dish. Sprinkle the fish with chili powder and garlic powder (or spices of choice). Drizzle olive oil on top and use your hands to coat all of the salmon fillets. Sprinkle with sea salt.Slice 3 to 4 figs in half and place face-up on a baking sheet. drizzle with a small amount of maple syrup and sprinkle with sea salt.Place both the fish and the figs in the oven. Broil figs for 6 minutes, or until juices are seeping out, and broil the salmon for 8 to 12 minutes, or until crispy and cooked through (mine took 10 minutes). Remove from the oven and allow the figs and salmon to cool a couple of minutes.Divide the romaine lettuce, avocado, blueberries, blackberries, salmon, and figs between two plates. Drizzle with desired amount of green goddess dressing and enjoy.",
    //     "analyzedInstructions": [
    //         {
    //             "name": "",
    //             "steps": [
    //                 {
    //                     "number": 1,
    //                     "step": "Preheat the oven on the high broil setting and move one of the racks to the second to the highest shelf.Coat the bottom of a baking dish with olive oil and place the salmon in the dish. Sprinkle the fish with chili powder and garlic powder (or spices of choice).",
    //                     "ingredients": [
    //                         {
    //                             "id": 1022020,
    //                             "name": "garlic powder",
    //                             "image": "garlic-powder.png"
    //                         },
    //                         {
    //                             "id": 2009,
    //                             "name": "chili powder",
    //                             "image": "chili-powder.jpg"
    //                         },
    //                         {
    //                             "id": 4053,
    //                             "name": "olive oil",
    //                             "image": "olive-oil.jpg"
    //                         },
    //                         {
    //                             "id": 15076,
    //                             "name": "salmon",
    //                             "image": "salmon.png"
    //                         }
    //                     ],
    //                     "equipment": [
    //                         {
    //                             "id": 404646,
    //                             "name": "baking pan",
    //                             "image": "roasting-pan.jpg"
    //                         },
    //                         {
    //                             "id": 404784,
    //                             "name": "oven",
    //                             "image": "oven.jpg"
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "number": 2,
    //                     "step": "Drizzle olive oil on top and use your hands to coat all of the salmon fillets. Sprinkle with sea salt.Slice 3 to 4 figs in half and place face-up on a baking sheet. drizzle with a small amount of maple syrup and sprinkle with sea salt.",
    //                     "ingredients": [
    //                         {
    //                             "id": 15076,
    //                             "name": "salmon fillets",
    //                             "image": "salmon.png"
    //                         },
    //                         {
    //                             "id": 4053,
    //                             "name": "olive oil",
    //                             "image": "olive-oil.jpg"
    //                         },
    //                         {
    //                             "id": 1012047,
    //                             "name": "sea salt",
    //                             "image": "salt.jpg"
    //                         },
    //                         {
    //                             "id": 9089,
    //                             "name": "figs",
    //                             "image": "figs-fresh.jpg"
    //                         }
    //                     ],
    //                     "equipment": [
    //                         {
    //                             "id": 404727,
    //                             "name": "baking sheet",
    //                             "image": "baking-sheet.jpg"
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "number": 3,
    //                     "step": "Place both the fish and the figs in the oven. Broil figs for 6 minutes, or until juices are seeping out, and broil the salmon for 8 to 12 minutes, or until crispy and cooked through (mine took 10 minutes).",
    //                     "ingredients": [
    //                         {
    //                             "id": 15076,
    //                             "name": "salmon",
    //                             "image": "salmon.png"
    //                         },
    //                         {
    //                             "id": 9089,
    //                             "name": "figs",
    //                             "image": "figs-fresh.jpg"
    //                         }
    //                     ],
    //                     "equipment": [
    //                         {
    //                             "id": 404784,
    //                             "name": "oven",
    //                             "image": "oven.jpg"
    //                         }
    //                     ],
    //                     "length": {
    //                         "number": 24,
    //                         "unit": "minutes"
    //                     }
    //                 },
    //                 {
    //                     "number": 4,
    //                     "step": "Remove from the oven and allow the figs and salmon to cool a couple of minutes.Divide the romaine lettuce, avocado, blueberries, blackberries, salmon, and figs between two plates.",
    //                     "ingredients": [
    //                         {
    //                             "id": 10111251,
    //                             "name": "romaine",
    //                             "image": "romaine"
    //                         },
    //                         {
    //                             "id": 9042,
    //                             "name": "blackberries",
    //                             "image": "blackberries.jpg"
    //                         },
    //                         {
    //                             "id": 9050,
    //                             "name": "blueberries",
    //                             "image": "blueberries.jpg"
    //                         },
    //                         {
    //                             "id": 9037,
    //                             "name": "avocado",
    //                             "image": "avocado.jpg"
    //                         },
    //                         {
    //                             "id": 15076,
    //                             "name": "salmon",
    //                             "image": "salmon.png"
    //                         },
    //                         {
    //                             "id": 9089,
    //                             "name": "figs",
    //                             "image": "figs-fresh.jpg"
    //                         }
    //                     ],
    //                     "equipment": [
    //                         {
    //                             "id": 404784,
    //                             "name": "oven",
    //                             "image": "oven.jpg"
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "number": 5,
    //                     "step": "Drizzle with desired amount of green goddess dressing and enjoy.",
    //                     "ingredients": [],
    //                     "equipment": []
    //                 }
    //             ]
    //         }
    //     ],
    //     "creditsText": "The Roasted Root"
    // },
    {
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
    }
];