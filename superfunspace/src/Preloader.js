SuperFunSpace.Preloader = function (game) {

  // Not completely sure about these
  //this.background = null;
  //this.preloadBar = null

  //this.ready = false;
};

SuperFunSpace.Preloader.prototype = {

  preload: function () {
    // preloads within preloads. So meta!

    this.load.image('background', 'res/background.png');
    this.load.image('start', 'res/start.png');
  },

  create: function () {

  },

  update:function () {

      this.state.start('MainMenu');
  }
};
