'use strict';

var GeneralController = function(arrViews) {
    this.goToPage = function(name) {
        // Hide all views
        Object.keys(arrViews).forEach(view => {
            arrViews[view].hide();
        })

        switch (name) {
            case 'home':
                arrViews['welcome'].show()
                break
            case 'search':
                arrViews['select'].show();
                arrViews['search'].show();
                arrViews['sidebar'].show();
                break;
            case 'detail':
                arrViews['detail'].show();
                arrViews['sidebar'].show();
                break;
            case 'summary':
                arrViews['summary'].show();
                break;
            case 'print':
                arrViews['print'].show();
                break;
        }
    }
}