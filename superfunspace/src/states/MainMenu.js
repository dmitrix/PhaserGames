// I have no idea why this is like this.
SuperFunSpace.MainMenu = function(game){


};

// why prototype?
SuperFunSpace.MainMenu.prototype = {

  // Prepreloaded

  create: function(){
    this.add.sprite(0, 0, 'background');
    this.add.text( 20, 20, 'SuperFunSpace!');
  },

  update: function(){

  }


};
