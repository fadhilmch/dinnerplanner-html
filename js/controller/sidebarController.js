'use strict';

var SidebarController = function(view, model, generalController) {
    model.totalGuests.addObserver(view);
    model.selectedDish.addObserver(view);
    
    view.numberOfGuests.change((e) => {
        model.setNumberOfGuests($(e.target).val());
    })

    view.confirmButton.click(() => {
        generalController.goToPage('summary');
        model.setSearchQuery();
    })

     view.menuTable.on('click', '.dishItem', function(){
        var id =$(this).attr('id');
        console.log(id);
        model.getRecipeInfo(id);
        model.setCurrentDishId(id);
        model.setSearchQuery()
        generalController.goToPage('detail');
        
    });


}