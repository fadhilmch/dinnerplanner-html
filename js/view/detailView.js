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
    this.component = container.find('#detailComponent');
    this.loading = container.find('#loadingDetail');


    //LOAD DETAIL SELECTED MENU
    var loadSelectedDish = function() {
        var dish = model.getInfo();
        if (dish.id !== null && dish.id !== undefined) {
            self.detailDish.children().remove();
            self.detailDish.append(`<div>
                    <h4>${dish.title.toUpperCase()}</h4>
                        <img class="fitImage" alt="Responsive image" src="${dish.image}">
                        <div padding -top: '5px'>
                            <a href= "${dish.sourceUrl}">${dish.sourceUrl} </a>  </div>
                         </div>
                </div>`);
        };
    };

    //LOAD INGREDIENTS OF SELECTED MENU
    var loadIngredients = () => {
        var dish = model.getInfo();
        var price = 1;
        if (dish.id !== null && dish.id !== undefined) {
            self.ingredientsDish.children().remove();
            dish.extendedIngredients.forEach(ingredients => {
                self.ingredientsDish.append(`
                <tr>
                    <th scope="row">${ numberPrint(ingredients.amount*model.getNumberOfGuests()) + " "+ ingredients.unit}</th>
                    <td>${ingredients.name}</td>
                    <td>${price*model.getNumberOfGuests()}</td>
                    <td>SEK</td>
                </tr>`);
            });
        };
    };

    var numberPrint = (num) => {
        return (num % 1 === 0) ? num : num.toFixed(2);
    };

    var loadPreparation = () => {
        var dish = model.getInfo();
        if (dish.id !== null && dish.id !== undefined) {
            self.preparationTip.children().remove();
            self.preparationTip.append(` <p>${dish.instructions} </p>`)
        }
    }

    var getGuest = () => {
        self.people.children().remove();
        self.people.append(`<h5 class="left" style="padding-left: 10px"> INGREDIENTS FOR ${model.getNumberOfGuests()}  PEOPLE</h5></div>`);
    }

    var renderLoading = () => {
        self.loading.show();
        self.component.hide();
    }

    var hideLoading = () => {
        self.loading.hide();
        self.component.show();
    }

    if (model.getLoading()) {
        renderLoading();
    } else {
        hideLoading()
        getGuest();
        loadSelectedDish();
        loadIngredients();
        loadPreparation();
    }
    //update observer
    this.update = function(data) {
        if (model.getLoading()) {
            renderLoading();
        } else {
            hideLoading();
            getGuest();
            loadSelectedDish();
            loadIngredients();
            loadPreparation();
        }
    }

}