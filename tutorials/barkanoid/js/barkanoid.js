var game = new Phaser.Game(
  800, 600,
  Phaser.AUTO,
  "barkanoid",
  {
    preload: phaserPreload,
    create: phaserCreate,
    update: phaserUpdate
  }
);

var ball;
var paddle;
var tiles;
var livesText;
var introText;
var background;

var ballOnPaddle = true;
var lives = 3;
var score = 0;

var defaultTextOptions = {
  font: "20px Arial",
  align: "left",
  fill: "#ffffff"
};

var boldTextOptions = {
  font: "20px Arial",
  fill: "#ffffff",
  align: "center"
};

function phaserPreload(){
  game.load.image("background", "assets/background.png");

  game.load.image("tile0", "assets/tile0.png");
  game.load.image("tile1", "assets/tile1.png");
  game.load.image("tile2", "assets/tile2.png");
  game.load.image("tile3", "assets/tile3.png");
  game.load.image("tile4", "assets/tile4.png");
  game.load.image("tile5", "assets/tile5.png");

  game.load.image("paddle", "assets/paddle.png");
  game.load.image("ball", "assets/ball.png");
}

function phaserCreate(){
  // Use arcade style physics no collision on bottom of screen
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.checkCollision.down = false;

  background = game.add.tileSprite(0, 0, 800, 600, "background");

  tiles = game.add.group();
  tiles.enableBody = true;
  tiles.physicsBodyType = Phaser.Physics.ARCADE;

  for (var y = 0; y < 4; y++){
    for (var x = 0; x < 15; x++){
      var randomTileNumber = Math.floor(Math.random() * 6);
      var tile = tiles.create(120 + (x * 36), 100 + (y * 52), "tile" + randomTileNumber);
      tile.body.bounce.set(1);
      tile.body.immovable = true;
    }
  }

  paddle = game.add.sprite(game.world.centerX, 500, "paddle");
  paddle.anchor.setTo(0.5, 0.5);
  game.physics.enable(paddle, Phaser.Physics.ARCADE);
  paddle.body.collideWorldBounds = true;
  paddle.body.bounce.set(1);
  paddle.body.immovable = true;

  ball = game.add.sprite(game.world.centerX, paddle.y - 16, "ball");
  ball.anchor.set(0.5);
  ball.checkWorldBounds = true;
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1);
  ball.events.onOutOfBounds.add(helpers.death, this);
}

function phaserUpdate(){

  if (paddle.x < 24){
    paddle.x = 24;
  } else if (paddle.x > game.width - 24){
    paddle.x = game.width - 24;
  }

  if (ballOnPaddle){
    ball.body.x = paddle.x;
  } else {
    game.physics.arcade.collide(ball, paddle, helpers.ballCollideWithPaddle, null, this);
    game.physics.arcade.collide(ball, tiles, helpers.ballCollideWithTiles, null, this);
  }
}

var helpers = {

  release: function(){
    if (ballOnPaddle) {
      ballOnPaddle = false;
      ball.body.velocity.y = -300;
      ball.body.velocity.x = -75;
      introText.visible = false;
    }
  },

  death: function() {
    lives--;
    livesText.text = "lives: " + lives;

    if (lives === 0) {
      helpers.gameOver();
    } else {
      ballOnPaddle = true;
      ball.reset(paddle.body.x + 16, paddle.y - 16);
    }
  },

  gameOver: function() {
    ball.body.velocity.setTo(0, 0);
    introText.text = "Game Over!";
    introText.visible = true;
  },

  ballCollideWithTile: function(ball, tile){
    tile.kill();

    score += 10;
    scoreText = "score: " + score;

    if (tiles.countLiving() <= 0){
      score += 1000;
      scoreText.text = "score: " + score;
      introText.text = "- Next Level -";

      ballOnPaddle = true;
      ball.body.velocity.set(0);
      ball.x = paddle.x + 16;
      ball.y = paddle.y - 16;

      tiles.callAll("revive");
    }
  },

  ballCollideWithPaddle: function(ball, paddle){
    var diff = 0;

    if (ball.x < paddle.x){
      diff = paddle.x - ball.x;
      ball.body.velocity.x = (-10 * diff);
    } else if (ball.x > paddle.x){
      diff = ball.x -paddle.x;
      ball.body.velocity.x = (10 * diff);
    } else {
      ball.body.velocity.x = 2 + Math.random() * 8;
    }
  }
};
