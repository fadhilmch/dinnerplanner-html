var SidebarController = function(view, model, generalController){
  // console.log(view.numberOfGuests[1])
  view.numberOfGuests.change((e) =>{
    model.setNumberOfGuests($(e.target).val());
    model.notifyObserver();
   
  })

  view.confirmButton.click(() => {
    generalController.goToPage('summary');
  })

}