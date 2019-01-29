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
	var dishItem = $('#item-dish');

	//instantiate all views
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

	// Initialize General Controller
	var generalController = new GeneralController(dishView);

	//Initialize First Page
	var generalController = new GeneralController(dishView);
	generalController.goToPage('home');
	
	// Initialize View and Controller
	var sidebarView = new SidebarView(sidebar, model);
	var sidebarController = new SidebarController(sidebarView, model, generalController);
	
	var searchView = new SearchView(search, model);
	var searchController = new SearchController(searchView, model, generalController);

	var homeView = new HomeView(welcome,model);
	var homeController = new HomeController(homeView, model, generalController);

	var selectView = new SelectView(select, model);

	var detailView = new DetailView(detail, model);
	var detailController = new DetailController(detailView, model, generalController);

	var summaryView = new SummaryView(summary, model);
	var summaryController = new SummaryController(summaryView, model, generalController);

	var printView = new PrintView(print, model);
	var printController = new PrintController(printView, model, generalController);
	


	/**
	 * IMPORTANT: app.js is the only place where you are allowed to
	 * use the $('someSelector') to search for elements in the whole HTML.
	 * In other places you should limit the search only to the children 
	 * of the specific view you're working with (see exampleView.js).
	 */

});