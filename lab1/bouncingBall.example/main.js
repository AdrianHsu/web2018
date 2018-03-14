// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

// ctx.fillStyle = "rgba(0,0,0,0.25)";
// ctx.fillRect (0,0,width, height);


function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Ball(x, y, vx, vy, color, r) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.color = color;
  this.r = r;
}

// 增加一個 ball 的 draw method
// 給起始點，什麼顏色
// 圓心 (x, y) 半徑 r, 從0~2pi 所以是圓
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.move = function() {    
  if(this.x + this.vx < 0 || this.x + this.vx > width) {
    this.vx = -this.vx;
  }
  if(this.y + this.vy < 0 || this.y + this.vy > height) {
    this.vy = -this.vy;
  }  
  this.x += this.vx;
  this.y += this.vy;
}
Ball.prototype.checkCollision = function(m) {
  for(let i = 0; i < m; i++) {
    // if(i === m) continue;
    me = balls[i];
    var dx_pow = Math.pow(this.x - me.x, 2);
    var dy_pow = Math.pow(this.y - me.y, 2);
    var dis = Math.sqrt(dx_pow + dy_pow);
    console.log("dis:" + dis)
    console.log("r:" + this.r + me.r);
    if(dis < this.r + me.r){
      this.vx = -this.vx;
      this.vy = -this.vy;
      me.vx = -me.vx;
      me.vy = -me.vy;
      this.x += BUFFER;
      this.y += BUFFER; // 讓兩顆撞到的時候馬上分離一小段，
      // 才不會一直卡在一起
    }
  }
}
var BUFFER = 10;
var balls = []
var TOTAL_NUM = 30;
var i = 0;
for(i = 0; i < TOTAL_NUM; i++) {
  var ball = new Ball(random(0, width), random(0, height), random(-10, 10), random(-10, 10), "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")", random(5, 30));
  balls[i] = ball;

}

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);
  for(let i = 0; i < TOTAL_NUM; i++) {
    balls[i].draw();
    balls[i].move();
    balls[i].checkCollision(i);
  }
  requestAnimationFrame(loop);
}
loop();