'use strict';

var DetailController = function(view, model, generalController) {
    model.totalGuests.addObserver(view);
    model.dishId.addObserver(view);
    model.recipeInfo.addObserver(view);
    model._isLoading.addObserver(view);

    view.btnBack.click(() => {
        generalController.goToPage('search');
        model.isLoading = true;
        model.getFullMenu();
    })

    view.addToMenu.click(() => {
        var cur = model.getInfo();
        model.addDishToMenu2(Number(cur.id));
        generalController.goToPage('search');
        model.getFullMenu();
    })



}