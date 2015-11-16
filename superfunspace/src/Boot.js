// I remember this from aweirdlovegame, not sure about it though
var SuperFunSpace = {};

SuperFunSpace.Boot = function (game) {

  this.ready = false;
};

// what does prototype mean?
SuperFunSpace.Boot.prototype = {

    init: function () {
      // has to do with multitouch?
      this.input.maxPointer = 1; // Not memory pointers!

      // Auto pause when user leaves tab
      this.stage.disableVisibilityChange = true;

      if (this.game.device.desktop)
      {
          // Desktop settings
          this.scale.pageAlignHorizontally = true;
      }
      else
      {
        // Mobile settings
        // Not sure what they all do, check later
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setMinMax(480, 260, 1024, 768);
        this.scale.forceLandscape = true;
        this.scale.pageAlignHorizontally = true;
      }

    },

    preload: function () {
      // preload assets for preloader? Loading screen

    },

    create: function () {
      // start the real preloader
      this.ready = true;
      this.state.start('Preloader');

    }

};
