var SearchView = function(container, model) {
    var self = this;
    // Get from model
    var allDishes = model.getAllDishes();
    var arrDishes = model.getDishType();
    var allMenu = model.getFullMenu();
  //  var filterMenu = model.getAllDishes('starter', 'toast');

    // Initialize Component
    this.dishType = container.find('#dishType');
    this.menuWrapper = container.find('#menu-wrapper');
    this.searchButton = container.find('#search-btn');
    this.searchInput = container.find('#search-input');
    this.searchTitle = container.find('#search-title');
    


    // this.searchInput= document.getElementById("#search-input");
    //this.dishType.value ="starter";


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
    }

    for (var i = 0; i < arrDishes.length; i++) {
        self.dishType.append(`<li class="dropdown-item">${arrDishes[i]}</a></li>`);
    }

    // Menu Wrapper
    var showDishesChoice = function() {
        allDishes.forEach(dish => {
        self.menuWrapper.append(`
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

    //Show filter dishes
    var showFilterDishes = function(starter){
        console.log(model.getAllDishes(starter));
        model.getAllDishes(starter).forEach(dish => {
        self.menuWrapper.append(`
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


    var setSearchTitle = function() {
        self.searchTitle.html('Find a Dish');
        if (allMenu.length === 0)
            self.searchTitle.html('Find a Dish');
        else
            self.searchTitle.html('Add another dish');
    }

   


    initialize();
    showDishesChoice();
    // // showFilterDishes();


    //update observer
    this.update = function(data) {
        console.log(data)
    }

  // register observer
    model.addObserver(this);

}