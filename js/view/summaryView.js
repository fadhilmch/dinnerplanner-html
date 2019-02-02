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

    //LOAD DATA MENU OVERVIEW
    var loadAllMenuOverview = () => {
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
                `);
        });
    };


    //LOAD TOTAL GUEST
    var getTotalGuests = () => {
        self.totalGuest.children().remove();
        self.totalGuest.append(`<h5 class="navbar-header" style="display: flex;" style="align-items: flex-start;">My Dinner: ${totalGuests} People </h5>`);
    };


    //LOAD TOTAL PRICE OF SELECTED MENU ON OVERVIEW
    var getTotalMenuPrice = () => {
        self.priceAcc.children().remove();
        self.priceAcc.append(`<div id ="totalPrice" class="col-md-4" style="text-align: left">
                                    <div class="flex-container">
                                        <h6>Total: </h6>
                                        <h6 class="text-danger">${Number(totalPrice).toFixed(2)}SEK </h6>
                                    </div>
                                </div>
        `);
    };

    loadAllMenuOverview();
    getTotalMenuPrice();
    getTotalGuests();

    this.update = (data) => {
        totalGuests = model.getNumberOfGuests();
        totalPrice = model.getTotalMenuPrice();
        allMenu = model.getFullMenu();
        getTotalGuests();
        loadAllMenuOverview();
        getTotalMenuPrice();
    };
};