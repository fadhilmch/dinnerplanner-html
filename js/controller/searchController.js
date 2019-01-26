var SearchController = function(container, model, controller) {

    model.addObserver(this);

    container.dishItem.click(function(evt) {
        console.log(evt.target.id);
    })


}