var SearchController = function(view, model, generalController) {
    view.searchButton.click(() => {
        model.setFilterName(view.searchInput.val());
        model.setFilterType(view.dishType.val().toLowerCase());
        model.notifyObserver();

    })

    view.menuWrapper.click((e) => {
        var id = e.target.accessKey;
        console.log(e.target);
        model.setCurrentDishId(id);
        model.getFullMenu();
        model.setFilterName("");
        model.setFilterType("all");
        view.dishType.prop("selectedIndex", 0);
        model.notifyObserver();
        if(id != null){
             generalController.goToPage('detail');
        }

    })


}