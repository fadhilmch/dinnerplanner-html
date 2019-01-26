$(function() {
	//We instantiate our model
	var model = new DinnerModel();

	var dishView = new Object() 

	//initialize component
	var welcome = $('#welcomeView');
	var sidebar = $('#sidebarView');
	var search = $('#searchView');
	var select = $('#selectView');
	var detail = $('#detailView');
	var summary = $('#summaryView');
	var print = $('#printView');
	

	// And create the instance of ExampleView
	var sidebarView = new SidebarView(sidebar, model);
	
	var searchView = new SearchView(search, model);
	
	var homeView = new HomeView(welcome,model);

	var selectView = new SelectView(select, model);

	var detailView = new DetailView(detail, model);

	var summaryView = new SummaryView(summary, model);

	var printView = new PrintView(print, model);

	//initialize all view
	var dinnerPlannerView = function(){
		dishView['welcome'] = welcome;
		dishView['sidebar'] = sidebar;
		dishView['search'] = search;
		dishView['select'] = select;
		dishView['detail'] = detail;
		dishView['summary'] = summary;
		dishView['print'] = print;
	}

	dinnerPlannerView();

	var generalController = new GeneralController(dishView);
	generalController.goToPage('home');


	/**
	 * IMPORTANT: app.js is the only place where you are allowed to
	 * use the $('someSelector') to search for elements in the whole HTML.
	 * In other places you should limit the search only to the children 
	 * of the specific view you're working with (see exampleView.js).
	 */

});