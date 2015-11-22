SuperFunSpace.Preloader = function (game) {

  // Not completely sure about these
  //this.background = null;
  //this.preloadBar = null

  //this.ready = false;
};

SuperFunSpace.Preloader.prototype = {

  preload: function () {
    // preloads within preloads. So meta!

    // load images
    this.load.image('background', 'res/background.png');
    this.load.image('start', 'res/start.png');
    this.load.image('ground', 'res/ground.png');

    // load sprites
    this.load.spritesheet('girl', 'res/girl.png', 32, 64);
  },

  create: function () {

  },

  update:function () {

      this.state.start('MainMenu');
  }
};
