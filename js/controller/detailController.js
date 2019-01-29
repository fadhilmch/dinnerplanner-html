var DetailController = function(view, model, generalController) {

    view.people.change((e) => {
        model.setNumberOfGuests($(e.target).val());
        model.notifyObserver();

    })
    view.btnBack.click(() => {
        generalController.goToPage('search');
        model.getFullMenu();
        model.notifyObserver();

    })

    view.addToMenu.click(() => {
        var cur = model.getCurrentDishId();
        model.addDishToMenu(Number(cur));
        model.notifyObserver();

    })



}