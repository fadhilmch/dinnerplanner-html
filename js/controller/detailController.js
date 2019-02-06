'use strict';

var DetailController = function(view, model, generalController) {
    model.totalGuests.addObserver(view);
    model.dishId.addObserver(view);
    model.recipeInfo.addObserver(view);

    view.btnBack.click(() => {
        generalController.goToPage('search');
        model.getFullMenu();
    })

    view.addToMenu.click(() => {
        // var cur = model.getCurrentDishId();
       
        var cur = model.getInfo();
        console.log(cur);
        model.addDishToMenu2(Number(cur.id));
        generalController.goToPage('search');
        model.getFullMenu();
    })



}