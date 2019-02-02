'use strict';

var DetailView = function(container, model) {
    var self = this;

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
        if(dish){
            self.detailDish.children().remove();
            self.detailDish.append(`<div>
                    <h4>${dish.name.toUpperCase()}</h4>
                    
                        <img class="fitImage" alt="Responsive image" src="images/${dish.image}">
                        <div>
                            <p>${dish.description} </p>  </div>
                            
                    </div>
                </div>`);
        };
    };

    //LOAD INGREDIENTS OF SELECTED MENU
    var loadIngredients = () => {
        var id = model.getCurrentDishId();
        var dishItem = model.getDish(id);
        if(dishItem){
            self.ingredientsDish.children().remove();
            dishItem.ingredients.forEach(dish => {
                self.ingredientsDish.append(`
                <tr>
                    <th scope="row">${ numberPrint(dish.quantity*model.getNumberOfGuests()) + " "+ dish.unit}</th>
                    <td>${dish.name}</td>
                    <td>${ numberPrint(Number(dish.price)*model.getNumberOfGuests())}</td>
                    <td>SEK</td>
                </tr>`
                );
            });
        };
    };

    var numberPrint = (num) => {
        return (num%1===0)?num:num.toFixed(2);
    };

    var loadPreparation = () => {
        var id = model.getCurrentDishId();
        var dish = model.getDish(id);
        if(dish){
            self.preparationTip.children().remove();
            self.preparationTip.append(` <p>${dish.description} </p>`)
        }
    }

    var getGuest = () => {
        self.people.children().remove();
        self.people.append(`<h5 class="left" style="padding-left: 10px"> INGREDIENTS FOR ${model.getNumberOfGuests()}  PEOPLE</h5></div>`);
    }

    getGuest();
    loadSelectedDish();
    loadIngredients();
    loadPreparation();

    //update observer
    this.update = function(data) {
        getGuest();
        loadSelectedDish();
        loadIngredients();
        loadPreparation();
    }

}