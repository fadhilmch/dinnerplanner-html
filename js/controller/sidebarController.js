'use strict';

var SidebarController = function(view, model, generalController) {
    model.totalGuests.addObserver(view);
    
    view.numberOfGuests.change((e) => {
        model.setNumberOfGuests($(e.target).val());
        // model.notifyObserver();
    })

    view.confirmButton.click(() => {
        generalController.goToPage('summary');
    })

}