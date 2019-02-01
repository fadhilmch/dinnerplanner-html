'use strict';

var SummaryView = function(container, model) {
    var self = this;

    //Get data from Model
    var totalGuests = model.getNumberOfGuests();
    var allMenu = model.getFullMenu();
    var totalPrice = model.getTotalMenuPrice();

    //Initialize Component
    this.selectedMenu = container.find("#selected-wrapper");
    this.priceAcc = container.find("#totalPrice");
    this.totalGuest = container.find("#guestOverview");
    this.printReceipt = container.find("#btnPrint");
    this.editfromSummary = container.find("#btnEditSummary");


    /**
     * When we want references to some view elements to be available from outside of view, we 
     * define them as this.someName. We don't need this in Lab 1 yet, but in Lab 2 it 
     * will be important for assigning listeners to these buttons, because the listeners
     * should not be assigned in the view, but rather in controller.
     * 
     * We can then, in some other code, use exampleView.plusButton to reference the 
     * this button and do something with it (see Lab 2).
     * 
     */

    //LOAD DATA MENU OVERVIEW
    var loadAllMenuOverview = function() {
        self.selectedMenu.children().remove();
        allMenu.forEach(dish => {
            self.selectedMenu.append(`
            <div class="col-sm-6 col-md-3">             
                    <div class="menu">
                        <img src="images/${dish.image}" alt="${dish.name}">
                        <div class="caption">
                            <h5>${dish.name}</h5>
                        </div>
                    </div>
                
                        <div class="caption" style="padding-top: 5px">
                            <h6 class="text-danger" style="text-align: right;">${
                        Number(
                            dish.ingredients.map(ingredient => {
                                return ingredient.quantity * ingredient.price;
                            })
                            .reduce((acc, cur) => {
                                return acc + cur;
                            })
                        ).toFixed(2)*totalGuests
                    } SEK</h6>
                        </div>
                    </div>
                `)

        })
    }


    //LOAD TOTAL GUEST
    var getTotalGuests = function() {
        self.totalGuest.children().remove();
        self.totalGuest.append(`<h5 class="navbar-header" style="display: flex;" style="align-items: flex-start;">My Dinner: ${totalGuests} People </h5>`);
    }


    //LOAD TOTAL PRICE OF SELECTED MENU ON OVERVIEW
    var getTotalMenuPrice = function() {
        self.priceAcc.children().remove();
        self.priceAcc.append(`<div id ="totalPrice" class="col-md-4" style="text-align: left">
                                    <div class="flex-container">
                                        <h6>Total: </h6>
                                        <h6 class="text-danger">${Number(totalPrice).toFixed(2)}SEK </h6>
                                    </div>
                                </div>
        `);
    }

    loadAllMenuOverview();
    getTotalMenuPrice();
    getTotalGuests();



    this.update = function(data) {
        totalGuests = model.getNumberOfGuests();
        totalPrice = model.getTotalMenuPrice();
        allMenu = model.getFullMenu();
        getTotalGuests();
        loadAllMenuOverview();
        getTotalMenuPrice();

    }
}