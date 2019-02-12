'use strict';

var SearchController = function(view, model, generalController) {
    // model.searchQuery.addObserver(view);
    model.fetchedDishes.addObserver(view);
    model.selectedDish.addObserver(view);
    model._isLoading.addObserver(view);
    model.err.addObserver(view);


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
        console.log(`This is the ID: ${id}`)
        model.getRecipeInfo(id)
        .then(() => {
            model.setSearchQuery();
            model.err.notifyObserver('');
            generalController.goToPage('detail');
        })
        .catch(err => {
            console.log(err);
            if(err.message === 'No Data'){
                model.err.notifyObserver('Error! There is no detail for this dish on database!');
            }  else {
                model.err.notifyObserver('Error! No Internet Connection!');
            }
            generalController.goToPage('search')
        })
        
       
        
    });


}