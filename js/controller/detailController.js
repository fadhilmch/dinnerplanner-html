'use strict';

var DetailController = function(view, model, generalController) {
    model.totalGuests.addObserver(view);
    model.dishId.addObserver(view);

    view.btnBack.click(() => {
        generalController.goToPage('search');
        model.getFullMenu();
    })

    view.addToMenu.click(() => {
        var cur = model.getCurrentDishId();
        model.addDishToMenu(Number(cur));
    })



}