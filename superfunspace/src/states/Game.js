SuperFunSpace.Game = function(game){

};

SuperFunSpace.Game.prototype = {


    jumpTimer:'',
    platforms:'',
    player:'',
    cursors:'',
    sprite:'',
    jumpButton:'',
    yAxis: p2.vec2.fromValues(0,1),

    create: function() {
        // initialize stuff?
        jumpTimer = 0;

        // background
        this.add.sprite(0,0,'background');

        // Enable P2 Physics
        this.physics.startSystem(Phaser.Physics.P2JS);

        this.physics.p2.gravity.y = 350;
        this.physics.p2.world.defaultContactMaterial.friction = 0.3;
        this.physics.p2.world.setGlobalStiffness(1e5);

        // PLAYER
        player = this.add.sprite(200, 200, 'girl');

        // ANIMATIONS:

        // make default rectangle body
        this.physics.p2.enable(player);
        player.body.fixedRotation = true;
        player.body.damping = 0.5;

        // WORLD MATERIAL??? WHY AM I YELLING?
        var spriteMaterial = this.physics.p2.createMaterial('spriteMaterial', player.body);
        var worldMaterial = this.physics.p2.createMaterial('worldMaterial');

        // left, right, top, bottom
        this.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);

        // Contact material?
        var groundPlayerCM = this.physics.p2.createContactMaterial(spriteMaterial, worldMaterial, { friction: 0.0 });

        cursors = this.input.keyboard.createCursorKeys();
        jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        /* DEAL WITH WORLD LATER!!!!
        // WORLD
        world = this.add.group();
        // enable physics for group
        world.enableBody = true;
        world.physicsBodyType = Phaser.Physics.P2JS;
        var ground = world.create(0, this.world.height - 32, 'ground');
        ground.body.static = true;
        // Collision box?
        ground.body.setRectangle(1024,32);
        ground.body.setCollisionGroup(worldCollisionGroup)
        ground.body.collides([worldCollisionGroup, playerCollisionGroup]);
        */



    },


    update: function (){
      if (cursors.left.isDown)
      {
            player.body.moveLeft(200);



      }
      else if (cursors.right.isDown)
      {
          player.body.moveRight(200);

      }
      else
      {
          player.body.velocity.x = 0;

      }

      console.log(jumpTimer);

      if (jumpButton.isDown && this.time.now > jumpTimer/* && checkIfCanJump()*/)
      {
          player.body.moveUp(300);
          jumpTimer = this.time.now + 1500;

      }

    },

checkIfCanJump: function (){
  var result = false;

  for (var i=0; i < this.physics.p2.world.narrowphase.contactEquations.length; i++)
  {
    var c = this.physics.p2.world.narrowphase.contactEquations[i];

    if (c.bodyA === player.body.data || c.bodyB === player.body.data)
    {
      var d = p2.vec2.dot(c.normalA, yAxis);

      if (c.bodyA === player.body.data)
      {
        d *= -1;

      }

      if (d > 0.5)
      {

        result = true;
      }

    }

  }

  return result;

}
};
