var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'game');

var PhaserGame = function (game) {

  this.tank = null;
  this.turret = null;
  this.flame = null;
  this.bullet = null;

  this.background = null;
  this.targets = null;

  this.power = 300;
  this.powerText = null;

  this.cursors = null;
  this.fireButton = null;

};

PhaserGame.prototype = {

  init: function() {
    /* keep pixel art nice and crisp */
    this.game.renderer.renderSession.roundPixels = true;

    this.game.world.setBounds(0, 0, 992, 480);

    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.gravity.y = 200;

  },

  preload: function() {

     // Load from Amazon
     this.load.baseURL = 'http://files.phaser.io.s3.amazonaws.com/codingtips/issue001/';
     this.load.crossOrigin = 'anonymous';

     this.load.image('tank', 'assets/tank.png');
     this.load.image('turret', 'assets/turret.png');
     this.load.image('bullet', 'assets/bullet.png');
     this.load.image('background', 'assets/background.png');
     this.load.image('flame', 'assets/flame.png');
     this.load.image('target', 'assets/target.png');
  },

  create: function(){

    this.background = this.add.sprite(0,0, 'background');

    this.targets = this.add.group(this.game.world, 'targets', false, true, Phaser.Physics.ARCADE);

    this.targets.create(300, 390, 'target');
    this.targets.create(500, 390, 'target');
    this.targets.create(700, 380, 'target');
    this.targets.create(900, 390, 'target');

    // Defy gravity!
    this.targets.setAll('body.allowGravity', false);

    // The Silver Bullet
    this.bullet = this.add.sprite(0,0,'bullet');
    this.bullet.exists = false;
    this.physics.arcade.enable(this.bullet);

    // tank body
    this.tank = this.add.sprite(24, 383, 'tank');

    // turret (rotates)
    this.turret = this.add.sprite(this.tank.x + 30, this.tank.y + 14, 'turret');

    // Flame sprite
    this.flame = this.add.sprite(0,0,'flame');
    this.flame.anchor.set(0.5);
    this.flame.visible = false;

    // Display shot power
    this.power = 300;
    this.powerText = this.add.text(8, 8, 'Power: 300', { font: "18px Arial", fill: "#ffffff" });
    this.powerText.setShadow(1, 1,'rgba(0, 0, 0, 0.8)', 1);
    this.powerText.fixedToCamera = true;

    // controls
    this.cursors = this.input.keyboard.createCursorKeys();

    this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.fireButton.onDown.add(this.fire, this);
  },

  /**
   * Should I comment like this
   * Called by fireBUtton.onDown
   *
   * @method fire
   */

  fire: function () {

    if (this.bullet.exists)
    {
      return;
    }

    this.bullet.reset(this.turret.x, this.turret.y);

    // Find the end of the turret
    var p = new Phaser.Point(this.turret.x, this.turret.y);
    p.rotate(p.x, p.y, this.turret.rotation, false, 34);

    this.flame.x = p.x;
    this.flame.y = p.y;
    this.flame.alpha = 1;
    this.flame.visible = true;

    // BOOOM!?!
    this.add.tween(this.flame).to( { alpha: 0 }, 100, "Linear", true);

    // To see what happens when bullet leaves
    this.camera.follow(this.bullet);

    // launch trajectory
    this.physics.arcade.velocityFromRotation(this.turret.rotation, this.power, this.bullet.body.velocity);

  },

  /**
   * I'm totally going to comment like this from now
   * Called by physics.arcade.overlap if bullet and target overlap
   *
   * @method hitTarget
   * @param {Phaser.Sprite} bullet - A reference to the bullet (same as this.bullet)
   * @param {Phaser.Sprite} target - the target the bullet hit
   */
  hitTarget: function(bullet, target){

    target.kill();
    this.removeBullet();

  },

  /**
   * Remove bullet, reset camera
   * Called... in a lot of places
   *
   * @method removeBullet
   */
  removeBullet: function() {

    this.bullet.kill();
    this.camera.follow();
    this.add.tween(this.camera).to( { x: 0 }, 1000, "Quint", true, 1000);

  },


  /**
   * Core update loop.
   *
   * @method update
   */
  update: function () {

    if (this.bullet.exists)
    {
      if (this.bullet.y > 420)
      {
        // if it hit the ground
        this.removeBullet();
      }
      else
      {
        this.physics.arcade.overlap(this.bullet, this.targets, this.hitTarget, null, this);
      }
    }
    else
    {
      // set power
      if (this.cursors.left.isDown && this.power > 100)
      {
        this.power -= 2;
      }
      else if (this.cursors.right.isDown && this.power < 600)
      {
        this.power += 2;
      }

      if (this.cursors.up.isDown && this.turret.angle > -90)
      {
        this.turret.angle--;
      }
      else if (this.cursors.down.isDown && this.turret.angle < 0)
      {
        this.turret.angle++;
      }

      // Update text
      this.powerText.text = "Power: " + this.power;
    }


  }
};

game.state.add('Game', PhaserGame, true);
