var GeneralController = function(arrViews) {
  var goToPage = function (name) {
    // Hide all views
    arrViews.forEach(view => {
      view.hide();
    })
    
    switch(name){
      case 'home':
        arrViews['homeView'].show();
    }
  }
}