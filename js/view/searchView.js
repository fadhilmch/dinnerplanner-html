var SearchView = function(container, model) {
    var self = this;


    // Initialize Component
    this.dishType = container.find('#dishType');
    this.menuWrapper = container.find('#menu-wrapper');
    this.searchButton = container.find('#search-btn');
    this.searchTitle = container.find('#search-title');
    this.searchInput = container.find('#search-input');

    // Get from model
    var allDishes = model.getAllDishes(model.getFilterType(), model.getFilterName());
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
        self.menuWrapper.children().remove();
        allDishes.forEach(dish => {
            self.menuWrapper.append(`
          <div class="col-sm-6 col-md-3 col-lg-2" accessKey="${dish.id}">
            <div class="menu">
              <img src="images/${dish.image}" accessKey="${dish.id}">
              <div class="caption" alt="${dish.id}" >
                <h5 accessKey ="${dish.id}">${dish.name} </h5>
              </div>
            </div>
          </div>
        `)
        })
    }



    var setSearchTitle = function() {
        self.searchTitle.children().remove();
        if (model.getFullMenu().length > 0)
            self.searchTitle.append(`<h4 class="left col-md-12">Add Another Dish</h4>`);
        else
            self.searchTitle.append(`<h4 class="left col-md-12">Find a Dish</h4>`);

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
        allDishes = model.getAllDishes(model.getFilterType(), model.getFilterName());
        showDishesChoice();
        model.getFullMenu();
        setSearchTitle();

    }

    // register observer
    model.addObserver(this);

}