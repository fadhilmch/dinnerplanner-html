$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	
	// And create the instance of ExampleView
	var sidebarView = new SidebarView($("#sidebarView"), model);
	var searchView = new SearchView($("#searchView"), model);
	
	var homeView = new HomeView($("#homeView"),model);

	var selectView = new SelectView($("#selectView"), model);

	var detailView = new DetailView($("#detailView"), model);

	var summaryView = new SummaryView($("#summaryView"), model);

	var printView = new PrintView($("#printView"), model);
	/**
	 * IMPORTANT: app.js is the only place where you are allowed to
	 * use the $('someSelector') to search for elements in the whole HTML.
	 * In other places you should limit the search only to the children 
	 * of the specific view you're working with (see exampleView.js).
	 */

});