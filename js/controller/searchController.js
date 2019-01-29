var SearchController = function(container, model, controller) {
    container.searchButton.click(function() {
        model.setFilterName(container.searchInput.val());
        model.setFilterType(container.dishType.val().toLowerCase());
        model.notifyObserver();

    })

    container.menuWrapper.click(function(e) {
    	var id= $(e.target)["0"].alt;
    	model.setCurrentDishId(id);
        model.getFullMenu();
        model.setFilterName("");
        model.setFilterType("all");
        container.dishType.prop("selectedIndex", 0);
        controller.goToPage('detail');
        model.notifyObserver();
      
    })


}