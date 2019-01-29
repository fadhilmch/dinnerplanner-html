var SidebarView = function(container, model) {
    var self = this;

    // Dummy Data
    //model.addDishToMenu(1);
    //model.addDishToMenu(100);

    // Get from model
    var allMenu = model.getFullMenu();
    var totalPrice = model.getTotalMenuPrice();
    var totalGuests = model.getNumberOfGuests();

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
        if(allMenu.length>0){
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

    console.log(allMenu);

    // Table Sidebar
    var showSidebar = function() {
        self.menuTable.children().remove();
        if(allMenu.length >0){
        allMenu.forEach(dish => {
            self.menuTable.append(`                         
                <tr>
                    <td>${dish.name}</td>
                    <td>${
                        Number(
                            dish.ingredients.map(ingredient => {
                                return ingredient.quantity * ingredient.price;
                            })
                            .reduce((acc, cur) => {
                                return acc + cur;
                            })
                        ).toFixed(2)*totalGuests
                    }
                    </td>
                </tr>
            `);
        })
        }
    }


    initialize();
    showSidebar();
    calculateTotalCost();
    console.log(allMenu);
    
    this.update = function(data){
        totalGuests = model.getNumberOfGuests();
        totalPrice = model.getTotalMenuPrice();
        allMenu = model.getFullMenu();
        setConfimButtonStatus();
        showSidebar();
        calculateTotalCost();
       
        }
        
    model.addObserver(this);
}