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
}