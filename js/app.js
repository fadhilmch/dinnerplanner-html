$(function() {
	//We instantiate our model
	var model = new DinnerModel();

	var sbView = $('#sidebarView');
	var welView = $('#welcomeView');
	var sView = $('#searchView');
	var selView = $('#selectView');
	var detView = $('#detailView');
	var smryView = $('#summaryView');
	var pView = $('#printView');
	

	
	// And create the instance of ExampleView
	var sidebarView = new SidebarView($("#sidebarView"), model);
	
	var searchView = new SearchView($("#searchView"), model);
	
	var homeView = new HomeView($("#homeView"),model);

	var selectView = new SelectView($("#selectView"), model);

	var detailView = new DetailView($("#detailView"), model);

	var summaryView = new SummaryView($("#summaryView"), model);

	var printView = new PrintView($("#printView"), model);

	
	//home view
	var showHomeView = function(){
		welView.show();
		sbView.hide();
		sView.hide();
		selView.hide();
		detView.hide();
		smryView.hide();
		pView.hide();
		
	}

	// showHomeView();

	//detail view
	var showDetailView = function(){
		welView.hide();
		sbView.show();
		sView.hide();
		selView.hide();
		detView.show();
		smryView.hide();
		pView.hide();

	}

	// showDetailView()

	//show select view
	var showSelectView = function(){
		welView.hide();
		sbView.show();
		sView.show();
		selView.show();
		detView.hide();
		smryView.hide();
		pView.hide();
	}

	showSelectView();


	//show print  view 
	var showPrintView = function(){
		welView.hide();
		sbView.hide();
		sView.hide();
		selView.hide();
		detView.hide();
		smryView.hide();
		pView.show();
	}

	// showPrintView();
	/**
	 * IMPORTANT: app.js is the only place where you are allowed to
	 * use the $('someSelector') to search for elements in the whole HTML.
	 * In other places you should limit the search only to the children 
	 * of the specific view you're working with (see exampleView.js).
	 */

});