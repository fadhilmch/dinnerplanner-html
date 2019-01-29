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
    var DetailView = function(container, model) {

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

        var self = this;
        // Dummy Data

        var cur = model.getCurrentDishId();


        // Get from model
        var arrDishes = model.getDishType();
        var allDishes = model.getAllDishes();
        var allMenu = model.getFullMenu();
        var totalPrice = model.getTotalMenuPrice();
        var totalGuests = model.getNumberOfGuests();
        var total = 0;

        //Initialize Component
        this.detailDish = container.find("#dish-wrapper");
        this.ingredientsDish = container.find("#ingredients-wrapper");
        this.preparationTip = container.find("#dish-preparation");
        this.totalPeople = container.find(".guest");
        this.people = container.find("#guestIngredients");
        this.btnBack = container.find('#backtoSearch');
        this.addToMenu = container.find('#addToMenu');


        //LOAD DETAIL SELECTED MENU
        var loadSelectedDish = function() {
            var id = model.getCurrentDishId();
            var dish = model.getDish(id);
            self.detailDish.children().remove();
            self.detailDish.append(`<div>
                    <h4>${dish.name.toUpperCase()}</h4>
                    
                        <img class="fitImage" alt="Responsive image" src="images/${dish.image}">
                        <div>
                            <p>${dish.description} </p>  </div>
                            
                    </div>
                </div>`)

        }

        //LOAD INGREDIENTS OF SELECTED MENU
        var loadIngredients = function() {
            var id = model.getCurrentDishId();
            var dishItem = model.getDish(id);
            self.ingredientsDish.children().remove();
            dishItem.ingredients.forEach(dish => {
                self.ingredientsDish.append(`<tr>
              <th scope="row">${dish.quantity*model.getNumberOfGuests() + " "+ dish.unit}</th>
              <td>${dish.name}</td>
              <td>${(Number(dish.price)*model.getNumberOfGuests()*dish.quantity).toFixed(2)}</td>
              <td>SEK</td>
            </tr>`)
            })
        }


        var loadPreparation = function() {
            var id = model.getCurrentDishId();
            var dish = model.getDish(id);
            self.preparationTip.children().remove();
            self.preparationTip.append(` <p>${dish.description} </p>`)
        }

        var getGuest = function() {
            self.people.children().remove();
            self.people.append(`<h5 class="left" style="padding-left: 10px"> INGREDIENTS FOR ${model.getNumberOfGuests()}  PEOPLE</h5></div>`);
        }

        getGuest();
        model.getCurrentDishId();



        //update observer
        this.update = function(data) {
            model.getCurrentDishId();
            model.getNumberOfGuests();
            getGuest();
            loadSelectedDish();
            loadIngredients();
            loadPreparation();
        }

        // register observer
        model.addObserver(this);







    }