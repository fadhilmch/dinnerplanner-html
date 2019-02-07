'use strict';

var SummaryController = function(view, model, generalController) {
    model.selectedDish.addObserver(view);
    model.totalGuests.addObserver(view);

    view.printReceipt.click(() => {
        generalController.goToPage('print');
    })

    view.editfromSummary.click(() => {
        generalController.goToPage('search');

    })

     view.selectedMenu.on('click', '.dishItem', function(){
        var id =$(this).attr('id');
        console.log(id);
        model.getRecipeInfo(id);
        model.setCurrentDishId(id);
        model.setSearchQuery()
        generalController.goToPage('detail');
        
    });

}