'use strict';

var PrintView = function(container, model) {
    // Get from model
    var allMenu = model.getFullMenu();

    //Initialize Component
    var totalGuestPrint = container.find("#guestPrint");
    var printMenu = container.find("#printOut");
    this.editfromPrint = container.find("#btnEditPrint");

    //LOAD DATA OF TOTAL GUEST
    var getTotalGuests = function() {
        totalGuestPrint.children().remove();
        totalGuestPrint.append(`<h5 class="navbar-header" style="display: flex;" style="align-items: flex-start;"> My Dinner: ${model.getNumberOfGuests()}  People</h5>`);
    }

    //LOAD DATA OF MENU ON PRINT OUT
    var loadPrintMenu = function() {
        printMenu.children().remove();
        allMenu.forEach(dish => {
            printMenu.append(`<br>
            <div class="row">
                <div class="col-md-6" style="padding-bottom: 10px">
                    <div class="row">
                        <div class="col-md-6 center" style="padding-bottom: 10px">
                            <img class="fitImage" src="images/${dish.image}">
                        </div>

                        <div class="col-md-6" >
                            <h5>${dish.name.toUpperCase()}</h5>
                            <p>
                            ${dish.description}
                            </p>
                        </div>
                    </div>
                </div>  
                <div class="col-md-6">
                    <h5>PREPARATION</h5>
                    <p>
                    ${dish.description}
                    </p>
                
                </div>
                </div>
            
            <br>
            <br>`)
        })
    }

    loadPrintMenu();
    getTotalGuests();

    this.update = function(data) {
        allMenu = model.getFullMenu();
        getTotalGuests();
        loadPrintMenu();
    }
}