var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

class Ball {
  constructor(x, y, vx, vy, color, r) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.r = r; 
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }
  static getDistance(me1, me2) {
    var dx_pow = Math.pow(me1.x - me2.x, 2);
    var dy_pow = Math.pow(me1.y - me2.y, 2);
    var dis = Math.sqrt(dx_pow + dy_pow);
    return dis;
  }
  move(){    
    if(this.x + this.vx < 0 || this.x + this.vx > width) {
      this.vx = -this.vx;
    }
    if(this.y + this.vy < 0 || this.y + this.vy > height) {
      this.vy = -this.vy;
    }  
    this.x += this.vx;
    this.y += this.vy;
  }
  set setVx(vx) {
    this.vx = vx;
  }
  set setVy(vy) {
    this.vy = vy;
  }
}

class RegBall extends Ball {
  checkCollision(m) {
    for(let i = 0; i < m; i++) {
      var me = balls[i];
      var dis = Ball.getDistance(this, me);
      if(dis < this.r + me.r){
        this.setVx = -this.vx;
        this.setVy = -this.vy;
        me.setVx = -me.vx;
        me.setVy = -me.vy;
        this.x += BUFFER;
        this.y += BUFFER; // to make sure that two balls separate right away
        // after they collided
      }
    }
  }
}
var audio = new Audio('eatBug.mp3');
var score = document.getElementById('score');
var event = new Event('eat');

score.addEventListener('eat', function(e) {
  total += 1;
  audio.play();
  this.innerText = "Score: " + total;
});

class EvilBall extends Ball {
  checkCollision(i) {
    var me = balls[i];
    var dis = Ball.getDistance(this, me);    
    if(dis < this.r + me.r){
      
      var ball = new RegBall(random(0, width), random(0, height), 
      random(-VELOCITY, VELOCITY), random(-VELOCITY, VELOCITY), "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")", random(5, 30));
      balls[i] = ball;

      score.dispatchEvent(event);
    }  
  }
}

var BUFFER = 10;
var VELOCITY = 10;
var balls = []
var TOTAL_NUM = 30;

var ADR_VEL = 10;
var total = 0;

var ADRIAN_BALL = new EvilBall(random(0, width), 
random(0, height), 0, 0, "rgb(255,255,255)", 50);

for(let i = 0; i < TOTAL_NUM; i++) {
  var ball = new RegBall(random(0, width), random(0, height), random(-VELOCITY, VELOCITY), random(-VELOCITY, VELOCITY), "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")", random(5, 30));
  balls[i] = ball;
}

function loop() {
  ctx.fillStyle = 'rgba(15,15,15,0.25)';
  ctx.fillRect(0,0,width,height);
  for(let i = 0; i < TOTAL_NUM; i++) {
    balls[i].draw();
    balls[i].move();
    balls[i].checkCollision(i);
    ADRIAN_BALL.checkCollision(i);
  }
  ADRIAN_BALL.draw();
  ADRIAN_BALL.move();
  requestAnimationFrame(loop);
}
loop();

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  var vy = 0;
  var vx = 0;
  switch (event.key) {
    case "ArrowDown":
      // code for "down arrow" key press.
      vy = +ADR_VEL;
      vx = 0;
      break;
    case "ArrowUp":
      // code for "up arrow" key press.
      vy = -ADR_VEL;
      vx = 0;
      break;
    case "ArrowLeft":
      // code for "left arrow" key press.
      vx = -ADR_VEL;
      vy = 0;
      break;
    case "ArrowRight":
      // code for "right arrow" key press.
      vx = +ADR_VEL;
      vy = 0;
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }
  ADRIAN_BALL.setVx = vx;
  ADRIAN_BALL.setVy = vy;

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);