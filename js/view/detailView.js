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

    console.log(model.getCurrentDishId());
    model.getRecipeInfo(model.getCurrentDishId())
    .then(data => {
        model.getCurrentDishId();
        console.log(data);
    })
    .catch(err => {
            console.log('Error: ' + err);
    })

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

    var loadSelectedDish2 = function() {
        var id = model.getCurrentDishId();
        console.log(id);
        var dish = model.getRecipeInfo(id)
        console.log(dish);
        //var dish = model.getDish2(id);
        if(dish){
            self.detailDish.children().remove();
            self.detailDish.append(`<div>
                    <h4>${dish.title.toUpperCase()}</h4>
                        <img class="fitImage" alt="Responsive image" src="${dish.image}">
                        <div>
                            <p>${dish.sourceName} </p>  </div>
                            
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
                    <th scope="row">${numberPrint(dish.quantity*model.getNumberOfGuests()) + " "+ dish.unit}</th>
                    <td>${dish.name}</td>
                    <td>${ numberPrint(Number(dish.price)*model.getNumberOfGuests())}</td>
                    <td>SEK</td>
                </tr>`
                );
            });
        };
    };

    var loadIngredients2 = () => {
        var id = model.getCurrentDishId();
        var dishItem = model.getDish2(id);
        var price = 1;
        if(dishItem){
            self.ingredientsDish.children().remove();
            dishItem.extendedIngredients.forEach(dish => {
                self.ingredientsDish.append(`
                <tr>
                    <th scope="row">${ numberPrint(dish.amount*model.getNumberOfGuests()) + " "+ dish.unit}</th>
                    <td>${dish.name}</td>
                    <td>${price*model.getNumberOfGuests()}</td>
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

     var loadPreparation2 = () => {
        var id = model.getCurrentDishId();
        var dish = model.getDish2(id);
        if(dish){
            self.preparationTip.children().remove();
            self.preparationTip.append(` <p>${dish.instructions} </p>`)
        }
    }

    var getGuest = () => {
        self.people.children().remove();
        self.people.append(`<h5 class="left" style="padding-left: 10px"> INGREDIENTS FOR ${model.getNumberOfGuests()}  PEOPLE</h5></div>`);
    }

    getGuest();
    loadSelectedDish2();
    loadIngredients2();
    loadPreparation2();

    //update observer
    this.update = function(data) {
        getGuest();
        loadSelectedDish2();
        loadIngredients2();
        loadPreparation2();
        model.getRecipeInfo(model.getCurrentDishId());
    }

}