'use strict';

var HomeView = function(container, model) {
    //initialize component
    
    this.render = () => {
      container.append(`
      <div id="welcomeView" class="center container" style="padding-top:30px">
      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <button id="create-dinner" class="btn btn-warning center" type="submit">Create new dinner</button>
      </div>
      `)
    }
    
    this.render();
    this.createDinner = container.find("#create-dinner");

}