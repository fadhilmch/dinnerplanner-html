'use strict';

var SearchController = function(view, model, generalController) {
    model.searchQuery.addObserver(view);
    model.fetchedDishes.addObserver(view);
    

    var searchQuery = () => {
        let query = view.searchInput.val().toLowerCase();
        let type = view.dishType.val().toLowerCase();
        model.setSearchQuery({query, type});
    };

    view.searchButton.click(() => { searchQuery() });

    // view.dishType.on('change', () => { searchQuery() });

    view.searchInput.on('keypress',(e) => {
        if(e.which == 13) {
            searchQuery();
        }
    });

    // view.searchInput.on('input',(e) => {
    //     searchQuery();
    // });


    view.menuWrapper.on('click', '.dishItem', function(){
        var id =$(this).attr('id');
        console.log(id);
        model.setCurrentDishId(id);
        model.setSearchQuery()
        generalController.goToPage('detail');
        
    });


}