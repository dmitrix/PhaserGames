// I have no idea why this is like this.
SuperFunSpace.MainMenu = function(game){


};

// why prototype?
SuperFunSpace.MainMenu.prototype = {

  // Prepreloaded



  create: function(){
    this.add.sprite(0, 0, 'background');
    this.add.text( 20, 20, 'SuperFunSpace!');

    startButton = this.add.button(300, 200, 'start', function(){this.state.start("Game")}, this);
  },

  update: function(){

  }


};
