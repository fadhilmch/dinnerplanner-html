'use strict';

var SearchView = function(container, model) {
    var self = this;

    // Initialize Component
    this.dishType = container.find('#dishType');
    this.menuWrapper = container.find('#menu-wrapper');
    this.searchButton = container.find('#search-btn');
    this.searchTitle = container.find('#search-title');
    this.searchInput = container.find('#search-input');

    // Get from model
    var arrDishes = model.getDishType();

    // Dropdown Select for Dishes Type
    var renderDropdownType = () => {
        self.dishType.children().remove();
        arrDishes.splice(0, 0, 'all');
        arrDishes = arrDishes.map(dish => {
            return dish.replace(
                /\w\S*/g,
                (txt) => {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        });

        for (var i = 0; i < arrDishes.length; i++) {
            self.dishType.append(`<option ${(arrDishes[i]===model.getSearchQuery().type)?'selected':''}>${arrDishes[i]} </option>`);
        }
    }


    // Menu Wrapper
    var renderDishesChoice = (type='all', filter='') => {
        let allDishes = model.getAllDishes(type, filter);
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

    var renderSearchTitle = () => {
        self.searchTitle.children().remove();
        if (model.getFullMenu().length > 0)
            self.searchTitle.append(`<h4 class="left col-md-12">Add Another Dish</h4>`);
        else
            self.searchTitle.append(`<h4 class="left col-md-12">Find a Dish</h4>`);

    }

    renderDropdownType();
    renderSearchTitle();
    renderDishesChoice();
    
    //update observer
    this.update = (data) => {
        let queryFilter = model.getSearchQuery();
        renderSearchTitle();
        renderDishesChoice(queryFilter.type, queryFilter.query);
        renderDropdownType();
    }
}