'use strict';

var SearchController = function(view, model, generalController) {
    // model.searchQuery.addObserver(view);
    model.fetchedDishes.addObserver(view);
    model.selectedDish.addObserver(view);
    model._isLoading.addObserver(view);


    var searchQuery = () => {
        let query = view.searchInput.val().toLowerCase();
        let type = view.dishType.val().toLowerCase();
        model.setSearchQuery({type, query});
        model.fetchSearch(type,query)
            .catch(err => {
                alert('No Internet: '+err)
            })
    };

    view.searchButton.click(() => { searchQuery() });

    view.dishType.on('change', () => { searchQuery() });

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
        model.getRecipeInfo(id).
        catch(err => {
            alert(err);
            })
        
        model.setSearchQuery()
        generalController.goToPage('detail');
        
    });


}