var ExampleView = function(container, model) {
    var numberOfGuests = container.find("#numberOfGuests");


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
    this.plusButton = container.find("#plusGuest");
    this.minusButton = container.find("#minusGuest");

    /**
     * Here we use @var {jQuery object} numberOfGuests that is a reference to <span>
     * in our view to dynamically set it's value to "Hello World".
     */





}