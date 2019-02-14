'use strict';

var SearchView = function (container, model, gc) {
    var self = this;

    // Initialize Component
    this.dishType = container.find('#dishType');
    this.menuWrapper = container.find('#menu-wrapper');
    this.searchButton = container.find('#search-btn');
    this.searchTitle = container.find('#search-title');
    this.searchInput = container.find('#search-input');
    this.searchComponent = container.find('#searchComponent');
    this.loading = container.find('#loading');


    // Get from model
    var arrDishes2 = model.getDishType();
    arrDishes2.splice(0,0,'all');


    // Dropdown Select for Dishes Type
    var renderDropdownType = () => {
        self.dishType.children().remove();
        // arrDishes2 = model.getDishType2();
        arrDishes2 = ['appetizer', 'breakfast', 'dessert','dinner', 'drink', 'lunch' , 'main course', 'main dish','sauce', 'side dish',  'snack']
        arrDishes2.splice(0,0,'all');
        arrDishes2 = arrDishes2.map(dish => {
            return dish.replace(
                /\w\S*/g,
                (txt) => {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        });

        for (var i = 0; i < arrDishes2.length; i++) {
            self.dishType.append(`<option ${(arrDishes2[i].toLowerCase()===model.getSearchQuery().type)?'selected':''}>${arrDishes2[i]} </option>`);
        }
    }

    var renderError = (err) => {
        container.prepend(`
            <div id='error-search' class="alert alert-danger" role="alert">
                ${err}
            </div>
        `)
    }



    var renderDishesChoice = (type = 'all', filter = '') => {
        let allDishes = model.getAllDishes(type, filter);
        self.menuWrapper.children().remove();
        allDishes.forEach(dish => {
            self.menuWrapper.append(`   
                <div id="${dish.id}" class="col-sm-6 col-md-3 col-lg-2 dishItem" style="padding-top:10px">
                    <div class="card" style="height: 100%" >
                    <div class='card-img-top image-wrapper'>
                    <img src="https://spoonacular.com/recipeImages/${dish.image}" style={}>
                    </div>
                    <div class="card-text" style="align-text:center">
                        <p>${dish.title}</p>
                    </div>
                    </div>
                    </div>
                `);
            });
        };
       
    var renderSearchTitle = () => {
        self.searchTitle.children().remove();
        if (model.getFullMenu().length > 0)
            self.searchTitle.append(`<h4 class="left col-md-12">Add Another Dish</h4>`);
        else
            self.searchTitle.append(`<h4 class="left col-md-12">Find a Dish</h4>`);
    }

    var renderLoading = () => {
        this.loading.show();
        self.searchComponent.hide();
    }

    var hideLoading = ()=>{
        this.loading.hide();
        self.searchComponent.show();
    }

    if(model.getLoading()){
        renderLoading();

    } else {
        hideLoading();
        renderDropdownType();
        renderSearchTitle();
        renderDishesChoice();
    }
    
    //update observer
    this.update = (data) => {
        let queryFilter = model.getSearchQuery();
        let error = container.find("#error-search");
        error.remove();
        if (model.err.getValue() !== ""){
            console.log('error '+model.err.getValue())
            renderError(model.err.getValue());
        } 
        if(model.getLoading()){
           renderLoading();
        } else {
            hideLoading();
            renderDropdownType();
            renderSearchTitle();
            renderDishesChoice(queryFilter.type, queryFilter.query);
        }
    }
}