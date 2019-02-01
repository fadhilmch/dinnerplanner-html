'use strict';

var SidebarView = function(container, model) {
    var self = this;

    // Get from model
    var allMenu = model.getFullMenu();
    var totalPrice = model.getTotalMenuPrice();

    // Initialize variable

    //Initialize Component
    this.numberOfGuests = container.find(".guest");
    this.totalCost = container.find('.totalCost');
    this.confirmButton = container.find('.btn-confirm');
    this.menuTable = container.find('.menu-table');
    this.navPrice = container.find('#nav-price');

    // Initialize Function
    var initialize = function() {
        // Show options on select for guest number
        for (var i = 1; i < 10; i++) {
            self.numberOfGuests.append(`<option value="${i}" ${(i===1)?"selected":""}>${i}</option>`);
        };
        setConfimButtonStatus();
    };

    // Total Cost
    var calculateTotalCost = function() {
        if (allMenu.length > 0) {
            self.totalCost.html(`SEK ${Number(totalPrice).toFixed(2)}`);
            self.navPrice.html(`SEK ${Number(totalPrice).toFixed(2)}`);
        }
    }

    // Confirm button
    var setConfimButtonStatus = function() {
        if (allMenu.length > 0) {
            self.confirmButton.prop('disabled', false);
        }

    }


    // Table Sidebar
    var showSidebar = function() {
        self.menuTable.children().remove();
        if (allMenu.length > 0) {
            allMenu.forEach(dish => {
                self.menuTable.append(`                         
                <tr>
                    <td>${dish.name}</td>
                    <td>${model.dishPrice(dish.id)}</td>
                </tr>
            `);
            })
        }
    }


    initialize();
    showSidebar();
    calculateTotalCost();

    this.update = function(data) {
        // totalGuests = model.getNumberOfGuests();
        totalPrice = model.getTotalMenuPrice();
        allMenu = model.getFullMenu();
        console.log(allMenu);
        setConfimButtonStatus();
        showSidebar();
        calculateTotalCost();

    }

}