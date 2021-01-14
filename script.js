/* global createCanvas colorMode background HSB button createButton textAlign 
textSize fill text CENTER width square player1 ellipse line rect color keyCode
collideRectCircle UP_ARROW DOWN_ARROW RIGHT_ARROW LEFT_ARROW collideLineRect collideRectRect random 
loadSound resetSketch*/

// prints "hi" in the browser's dev tools console
let backgroundColor, balls, coins, song, fails, remove;
var changeDirection, player1, Obstacles1;
var canvasHeight, canvasWidth, x, textColor, player1;
var gameStartFlag;
var c, volume, reSrt;

function setup() {
  canvasHeight = 1000;
  canvasWidth = 500;
  createCanvas(canvasHeight, canvasWidth);

  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  background(backgroundColor);

  song = loadSound(
    "https://cdn.glitch.com/7319debb-d91e-4b62-871a-27f914c026b2%2FThe%20World's%20Hardest%20Game%20-%20Soundtrack%20HQ.mp3?v=1595974423319"
  );

  gameStartFlag = false;
  c = "yellow";
  //coins
  coins = [];
  for (let c = 0; c < 4; c++) {
    coins.push(new Coins());
  }

  //Obstacles1 = new Obstacles;
  balls = [];
  let offset = 0;
  for (let i = 0; i < 4; i++) {
    let obstacles = new Obstacles();
    offset += 58;
    obstacles.y += offset;
    balls.push(obstacles);
  }

  fails = 0;
  remove = 4;
  

  button = createButton("Start");
  button.position(500, 250);
  button.style("font-size", "30px");
  button.style("background-color", "red");
  button.mousePressed(startBtn);
  button.size(100, 50);

  player1 = new Player();

  // player1 = new Player(20, 20, 20);
}

function draw() {
  background("lightgrey");

  // player1.show();
  //Obstacles1.show();
  //Obstacles1.move();
  // square(300, 250, 15)
  //   square(300, 230, 25)

  if (gameStartFlag == true) {
    map1();
    player1.show();

    for (let c = 0; c < coins.length; c++) {
      coins[c].show();
      // coins[c].checkCoins();
    }

    for (let i = 0; i < balls.length; i++) {
      balls[i].show();
      balls[i].move();
      // balls[i].checkObstacles();
    }
  } else {
    fill("black");
    textAlign(CENTER, CENTER);
    textSize(40);
    text("World's Hardest Game", 0, 200, width);
  }
  
  if (collideRectRect(750, 75, 150, 350, player1.x, player1.y, 20, 20)){
    if(remove == 0){
      fill("yellow");
      text("Win!", 500, 250);
      // stop.keyPressed();
      song.stop();
    }
    
  }
}

function startBtn() {
  background(backgroundColor);
  button.remove();
  
  gameStartFlag = true;

  volume = createButton("Unmute/Mute");
  volume.position(130, 50);
  volume.style("font-size", "30px");
  volume.style("background-color", "lightblue");
  volume.mousePressed(muteBtn);
  volume.size(210, 50);
  
  reSrt = createButton("restart");
  reSrt.position(780, 465);
  reSrt.style("font-size", "30px");
  reSrt.style("background-color", "magenta");
  reSrt.size(110, 50);
  reSrt.mousePressed(resetSketch);
  
}

function map1() {
  // if (keyIsDown(UP_ARROW)) {
  //   this.y -= 2;
  // }
  // if (keyIsDown(DOWN_ARROW)) {
  //   this.y += 2;
  // }
  // if (keyIsDown(RIGHT_ARROW)) {
  //   this.x += 2;
  // }
  // if (keyIsDown(LEFT_ARROW)) {
  //   this.x -= 2;
  // }
  textSize(40);
  fill("Black");
  text(`Fails: ${fails}`, 710, 50);
  fill("red");
  text(`Coins: ${remove}`, 500, 50);
  line(100, 75, 100, 425);
  line(100, 425, 350, 425);
  line(350, 425, 350, 375);
  line(350, 375, 700, 375);
  line(700, 375, 700, 125);
  line(700, 125, 750, 125);
  line(750, 125, 750, 425);
  line(750, 425, 900, 425);
  line(900, 425, 900, 75);
  line(900, 75, 650, 75);
  line(650, 75, 650, 125);
  line(650, 125, 300, 125);
  line(300, 125, 300, 375);
  line(300, 375, 250, 375);
  line(250, 375, 250, 75);
  line(250, 75, 100, 75);

  fill(108, 75, 61);
  rect(100, 75, 150, 350);
  rect(750, 75, 150, 350);
  
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    player1.up();
    player1.hitWall();
  }
  if (keyCode === DOWN_ARROW) {
    player1.down();
    player1.hitWall();
  }
  if (keyCode === RIGHT_ARROW) {
    player1.right();
    player1.hitWall();
  }
  if (keyCode === LEFT_ARROW) {
    player1.left();
    player1.hitWall();
  }
}

class Player {
  constructor() {
    this.y = 75;
    this.x = 100;
    this.move = 10;
  }

  show() {
    fill("red");
    rect(this.x, this.y, 20, 20);
    
    if (keyIsDown(UP_ARROW)) {
    this.y -= 1.25;
      player1.hitWall();
  }
  if (keyIsDown(DOWN_ARROW)) {
    this.y += 1.25;
    player1.hitWall();
  }
  if (keyIsDown(RIGHT_ARROW)) {
    this.x += 1.25;
    player1.hitWall();
  }
  if (keyIsDown(LEFT_ARROW)) {
    this.x -= 1.25;
    player1.hitWall();
  }
  }

  up() {
    this.y -= this.move;
  }

  down() {
    this.y += this.move;
  }

  left() {
    this.x -= this.move;
  }

  right() {
    this.x += this.move;
  }

  hitWall() {
    if (collideLineRect(100, 75, 100, 425, this.x, this.y, 20, 20)) {
      this.x = 100;
    }
    if (collideLineRect(100, 425, 350, 425, this.x, this.y, 20, 20)) {
      this.y = 405;
    }
    if (collideLineRect(350, 425, 350, 375, this.x, this.y, 20, 20)) {
      this.x = 330;
    }
    if (collideLineRect(350, 375, 700, 375, this.x, this.y, 20, 20)) {
      this.y = 355;
    }
    if (collideLineRect(700, 375, 700, 125, this.x, this.y, 20, 20)) {
      this.x = 680;
    }
    if (collideLineRect(700, 125, 750, 125, this.x, this.y, 20, 20)) {
      this.y = 105;
    }
    if (collideLineRect(750, 125, 750, 425, this.x, this.y, 20, 20)) {
      this.x = 750;
    }
    if (collideLineRect(750, 425, 900, 425, this.x, this.y, 20, 20)) {
      this.y = 405;
    }
    if (collideLineRect(900, 425, 900, 75, this.x, this.y, 20, 20)) {
      this.x = 880;
    }
    if (collideLineRect(900, 75, 650, 75, this.x, this.y, 20, 20)) {
      this.y = 75;
    }
    if (collideLineRect(650, 75, 650, 125, this.x, this.y, 20, 20)) {
      this.x = 650;
    }
    if (collideLineRect(650, 125, 300, 125, this.x, this.y, 20, 20)) {
      this.y = 125;
    }
    if (collideLineRect(300, 125, 300, 375, this.x, this.y, 20, 20)) {
      this.x = 300;
    }
    if (collideLineRect(300, 375, 250, 375, this.x, this.y, 20, 20)) {
      this.y = 375;
    }
    if (collideLineRect(250, 375, 250, 75, this.x, this.y, 20, 20)) {
      this.x = 230;
    }
    if (collideLineRect(250, 75, 100, 75, this.x, this.y, 20, 20)) {
      this.y = 75;
    }
    
  }
}

class Obstacles {
  constructor() {
    this.x = 320;
    this.x2 = 680;
    this.y = 95;
    this.horizontalSpeed = 3;
    this.horizontalSpeed2 = -3;
  }

  show() {
    fill("blue");
    ellipse(this.x, this.y, 20);

    ellipse(this.x2, this.y + 29, 20);
    if (collideRectCircle(player1.x, player1.y, 20, 20, this.x, this.y, 20)) {
      player1.x = 100;
      player1.y = 75;
      fails ++;
    }
    if (collideRectCircle(player1.x, player1.y, 20, 20, this.x2, this.y+29, 20)) {
      player1.x = 100;
      player1.y = 75;
      fails ++;
    }
  }

  move() {
    this.x += this.horizontalSpeed;
    this.x2 += this.horizontalSpeed2;
    if (this.x > 680 || this.x < 320) {
      this.horizontalSpeed *= -1;

      if (this.x2 > 680 || this.x2 < 320) {
        this.horizontalSpeed2 *= -1;
      }
    }
  }

  // checkObstacles() {
  //   if (collideRectCircle(this.x, this.y, 20, this.x, this.y, 20)) {
  //     this.x = 100;
  //     this.y = 75;
  //   }
  // }
}

class Coins {
  constructor() {
    // this.x = random(width - this.size);
    // this.y = random(height - this.size);
    this.x = random(320, 680);
    this.y = random(150, 300);
  }

  show() {
    fill(c);
    ellipse(this.x, this.y, 10);
     if (collideRectCircle(player1.x, player1.y, 20, 20, this.x, this.y, 10)) {
      this.x = 800;
      this.y = 1800;
      remove --;
    }
  }

}

function muteBtn() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
  } else {
    song.play();
    song.loop();
  }
}

function resetSketch() {
  song.stop();
  canvasHeight = 1000;
  canvasWidth = 500;
  createCanvas(canvasHeight, canvasWidth);

  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  background(backgroundColor);

  song = loadSound(
    "https://cdn.glitch.com/7319debb-d91e-4b62-871a-27f914c026b2%2FThe%20World's%20Hardest%20Game%20-%20Soundtrack%20HQ.mp3?v=1595974423319"
  );

  gameStartFlag = false;
  c = "yellow";
  //coins
  coins = [];
  for (let c = 0; c < 4; c++) {
    coins.push(new Coins());
  }

  //Obstacles1 = new Obstacles;
  balls = [];
  let offset = 0;
  for (let i = 0; i < 4; i++) {
    let obstacles = new Obstacles();
    offset += 58;
    obstacles.y += offset;
    balls.push(obstacles);
  }

  fails = 0;
  remove = 4;
  
button = createButton("Start");
  button.position(500, 250);
  button.style("font-size", "30px");
  button.style("background-color", "red");
  button.mousePressed(startBtn);
  button.size(100, 50);

  volume.remove();
  reSrt.remove();
  
  player1 = new Player();
}