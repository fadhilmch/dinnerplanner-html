var SearchController = function(container, model, controller) {
    container.searchButton.click(function() {
        // var filter = model.getAllDishes(container.dishType.val().toLowerCase(),container.searchInput.val());
        // model.notifyObserver();
        // console.log(filter);
        model.setFilterName(container.searchInput.val());
        model.setFilterType(container.dishType.val().toLowerCase());
        model.notifyObserver();


    })

    container.menuWrapper.click(function() {
        console.log("menu clicked");
    })

}