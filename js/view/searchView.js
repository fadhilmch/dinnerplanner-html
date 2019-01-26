var SearchView = function(container, model) {

    // Get from model
    var allDishes = model.getAllDishes();
    var arrDishes = model.getDishType();
    var allMenu = model.getFullMenu();

    // Initialize Component
    var dishType = container.find('#dishType');
    var menuWrapper = container.find('#menu-wrapper');
    var searchButton = container.find('#search-btn');
    var searchInput = container.find('search-input');
    var searchTitle = container.find('#search-title');

    // Initialize function
    var initialize = function() {
        showDropdownType();
        setSearchTitle();
    }

    this.dishItem = container;


    // register observer
    model.addObserver(this);

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
        dishType.append(`<li class="dropdown-item">${arrDishes[i]}</a></li>`);
    }

    // Menu Wrapper
    var showDishesChoice = function() {
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


    var setSearchTitle = function() {
        console.log('fdlsfj')
        searchTitle.html('Find a Dish');
        if (allMenu.length === 0)
            searchTitle.html('Find a Dish');
        else
            searchTitle.html('Add another dish');
    }

    initialize();
    showDishesChoice();

    //update observer
    // this.update = function(obj){

    // }


}