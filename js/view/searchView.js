var SearchView = function(container, model) {
    var self = this;


    // Initialize Component
    this.dishType = container.find('#dishType');
    this.menuWrapper = container.find('#menu-wrapper');
    this.searchButton = container.find('#search-btn');
    this.searchTitle = container.find('#search-title');
    this.searchInput = container.find('#search-input');

    // Get from model
    var allDishes = model.getAllDishes(model.getFilterType(),model.getFilterName());
    // console.log(model.getFilterType + model.getFilterName + 'fdkfjdkj')
    var arrDishes = model.getDishType();
    var allMenu = model.getFullMenu();


    // Initialize function
    var initialize = function() {
        showDropdownType();
        setSearchTitle();
    }


    // Dropdown Select for Dishes Type
    var showDropdownType = function() {
        arrDishes.splice(0, 0, 'all');
        arrDishes = arrDishes.map(dish => {
            return dish.replace(
                /\w\S*/g,
                function(txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        });

        for (var i = 0; i < arrDishes.length; i++) {
            self.dishType.append(`<option>${arrDishes[i]} </option>`);
        }
    }


    // Menu Wrapper
    var showDishesChoice = function() {
    console.log('All DIshes')
    console.log(allDishes);
        self.menuWrapper.children().remove();
        allDishes.forEach(dish => {
            self.menuWrapper.append(`
          <div class="col-sm-6 col-md-3 col-lg-2">
            <div class="menu"}>
              <img src="images/${dish.image}" alt="${dish.id}">
              <div class="caption">
                <h5>${dish.name} </h5>
              </div>
            </div>
          </div>
        `)
        })
    }



    var setSearchTitle = function() {
        self.searchTitle.html('Find a Dish');
        if (allMenu.length === 0)
            self.searchTitle.html('Find a Dish');
        else
            self.searchTitle.html('Add another dish');
    }

    var selectDishType = function() {
        var type = self.dishType.value;
        console.log("type" + type);
    }
    //selectDishType();



    initialize();
    showDishesChoice();




    //update observer
    this.update = function(data) {
        allDishes = model.getAllDishes(model.getFilterType(),model.getFilterName());
        showDishesChoice();
        model.getCurrentDishId();
        console.log( model.getCurrentDishId());
        

    }

    // register observer
    model.addObserver(this);

}