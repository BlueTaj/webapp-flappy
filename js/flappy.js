// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)

var width = 790;
var height = 400;
var gameSpeed = 300;
var gameGravity = 500;
var jumpPower = 200;

var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);

var score = 0;
var labelScore;
var welcomeMessage;
var player;
var pipes = [];
var stone = [];
var pika = [];



/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  //  loading the image to be displayed
  game.load.image("playerImg", "../assets/pokeball.png");
  game.load.image("backgroundImg", "../assets/cave_background.png");
  game.load.image("playerImg2", "../assets/charizard.png");
  game.load.image("pipeBlock", "../assets/articuno.png");
  game.load.audio("roar", "../assets/charizard_roar.ogg");
  game.load.image("pika", "../assets/flying_pika.png");
  game.load.image("stone", "../assets/Firestone.png");
}

/*
 * Initialises the game. This function is only called once.
 */

 function create() {
 var background= game.add.image(0, 0, "backgroundImg");


  background.width= width;
  background.height= height;
 welcomeMessage =  game.add.text(285,160,"Click  ENTER to Start!", {font:"20px Helvetica", fill:"#0DABFF"});
 welcomeMessage =  game.add.text(250,190,"Click the SPACEBAR to Jump.", {font:"20px Helvetica", fill:"#0DABFF"});
 tartBall =  game.add.sprite(10, 10, "playerImg");
 startBall2 =  game.add.sprite(740, 10, "playerImg");
 startBall3 =  game.add.sprite(10, 350, "playerImg");
 startBall4 =  game.add.sprite(740, 350, "playerImg");
   game.input
       .keyboard.addKey(Phaser.Keyboard.ENTER)
           .onDown.add(Start);


player = game.add.sprite(290 , 190, "playerImg2");
game.physics.arcade.enable(player);
player.visible = false;

 }

var gamespeed= 0;

function Start () {

  game.physics.startSystem(Phaser.Physics.ARCADE);

       var backgroundVelocity = gamespeed / 20;
       var backgroundSprite = game.add.tileSprite(0,0,width,height,"backgroundImg");
       backgroundSprite.autoScroll(-50,backgroundVelocity);


    startBall =  game.add.sprite(10, 10, "playerImg");
    startBall2 =  game.add.sprite(740, 10, "playerImg");
    startBall3 =  game.add.sprite(10, 350, "playerImg");
    startBall4 =  game.add.sprite(740, 350, "playerImg");

    player = game.add.sprite(290 , 190, "playerImg2");
    player.anchor.setTo(0.5, 0.5);

    game.physics.arcade.enable(player);


  player.body.gravity.y = gameGravity;

  game.input
      .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
          .onDown.add(function (event) {
             welcomeMessage.visible = false;
             startBall.visible = false;
             startBall3.visible = false;
             startBall4.visible = false;
          });

  game.input
      .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
          .onDown.add(function() {
            player.body.velocity.y = - jumpPower;
          });

  labelScore = game.add.text(700, 20, "0");
    generatePipe();

    var pipeInterval = 1.70 * Phaser.Timer.SECOND;
    game.time.events.loop(
        pipeInterval,
        generateRoulette
    );

}



/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

  for (var i = stone.length - 1; i >= 0; i--) {
    game.physics.arcade.overlap(player,stone[i], function(){
        gameSpeed = gameSpeed - 100;
        stone[i].destroy();
        stone.splice(i,1);
    });
  }

  for (var e = pika.length - 1; e >= 0; e--) {
    game.physics.arcade.overlap(player,pika[e], function(){
        score = score + 5;
        pika[e].destroy();
        pika.splice(i,1);

    });
  }

game.physics.arcade.overlap(
player,
      pipes,
      gameOver);


      if (player.body.y < 0) {
          gameOver();
      }
      if(player.body.y > 400){
        gameOver();
      }

player.rotation = Math.atan(player.body.velocity.y / gameSpeed);


}

function gameOver(){
    game.sound.play("roar");
    registerScore(score);
    score = 0;
    game.state.restart();
    gameGravity = 500;


}



function changeScore() {
  score = score + 1;
  labelScore.setText(score.toString());
}


function generatePipe() {
  var gapStart = game.rnd.integerInRange(1, 2);
    for(var count=0; count<8; count++) {
        if(count != gapStart && count != gapStart + 1){
            addPipeBlock(750, count*50);
        }
    }
    changeScore();
}

function generateRoulette () {

  var diceRoll = game.rnd.integerInRange(1,10);
  if (diceRoll==1) {
      generatePika();
  } else if (diceRoll==2) {
      generateEnergyBoost();
  } else {
    generatePipe();
  }
}

function generatePika (){
  var bonus = game.add.sprite(width,height,"pika");
  pika.push(bonus);
  game.physics.arcade.enable(bonus);
  bonus.body.velocity.x = -gameSpeed;
  bonus.body.velocity.y = - game.rnd.integerInRange (60,100);

}

function generateEnergyBoost (){
  var bonus = game.add.sprite(width,0,"stone");
  stone.push(bonus);
  game.physics.arcade.enable(bonus);
  bonus.body.velocity.x = -gameSpeed;
  bonus.body.velocity.y = game.rnd.integerInRange (60,100);

}

function addPipeBlock (x, y){
  var pipeBlock = game.add.sprite(x,y,"pipeBlock");
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -gameSpeed;
}

function changeGravity(g) {
    gameGravity += g;
    player.body.gravity.y = gameGravity;
}
