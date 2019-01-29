/** ExampleView Object constructor
 * 
 * This object represents the code for one specific view (in this case the Example view). 
 * 
 * It is responsible for:
 * - constructing the view (e.g. if you need to create some HTML elements procedurally) 
 * - populating the view with the data
 * - updating the view when the data changes
 * 
 * You should create a view Object like this for every view in your UI.
 * 
 * @param {jQuery object} container - references the HTML parent element that contains the view.
 * @param {Object} model - the reference to the Dinner Model
 */
var SummaryView = function(container, model) {

    /**
     * We use the @method find() on @var {jQuery object} container to look for various elements 
     * inside the view in orther to use them later on. For instance:    
     * 
     * @var {jQuery object} numberOfGuests is a reference to the <span> element that 
     * represents the placeholder for where we want to show the number of guests. It's
     * a reference to HTML element (wrapped in jQuery object for added benefit of jQuery methods)
     * and we can use it to modify <span>, for example to populate it with dynamic data (for now 
     * only 'Hello world', but you should change this by end of Lab 1).
     * 
     * We use variables when we want to make the reference private (only available within) the
     * ExampleView.
     * 
     * IMPORTANT: Never use $('someSelector') directly in the views. Always use container.find
     * or some other way of searching only among the containers child elements. In this way you
     * make your view code modular and ensure it dosn't break if by mistake somebody else
     * in some other view gives the same ID to another element.
     * 
     */
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

    model.addObserver(this);

}