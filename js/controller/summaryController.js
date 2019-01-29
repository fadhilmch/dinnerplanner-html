var SummaryController = function(view, model, generalController) {

    view.totalGuest.change((e) => {
        model.setNumberOfGuests($(e.target).val());
        model.notifyObserver();

    })

    view.printReceipt.click(() => {
        generalController.goToPage('print');
    })

    view.editfromSummary.click(() => {
        generalController.goToPage('search');

    })



}