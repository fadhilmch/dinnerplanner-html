'use strict';

var SearchController = function(view, model, generalController) {
    model.searchQuery.addObserver(view);

    var searchQuery = () => {
        let query = view.searchInput.val().toLowerCase();
        let type = view.dishType.val().toLowerCase();
        model.setSearchQuery({query, type});
    };

    view.searchButton.click(() => { searchQuery() });

    view.dishType.on('change', () => { searchQuery() });

    view.searchInput.on('keypress',(e) => {
        if(e.which == 13) {
            searchQuery();
        }
    });

    view.menuWrapper.click((e) => {
        var id = e.target.accessKey;
        console.log(e.target.accessKey);
        model.setCurrentDishId(id);
        model.setSearchQuery();
        if(id != ""){
             generalController.goToPage('detail');
        }

    })


}