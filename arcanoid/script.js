var timerID=0;
var game_over=false;
var game_stop=false;
var bgcolor='black';

var infoBar = {
    width: 0,
    height: 50,
    color: 'dimgray' };

var wall = {
    width: 11,
    height: 5,
    data: [] };

var block = {
    x: 0,
    y: 0,
    width: 40,
    height: 20,
    color: 'dodgerblue',
    indent: 2,
    crashed: false,
    bonus: 'n' };

var player = {
    x: 0,
    y: 0,
    score: 0,
    lives: 3,
    width: 80,
    height: 10, 
    color: 'teal',
    indent: 2,
    bonus: 'n' };

var ball = {
    x: 0,
    y: 0,
    r: 5,
    dx: 0,
    dy: 0,
    speed: 5, //more -> slower moving
    color: 'goldenrod' };

var map = {
    width: 0,
    height: 0 };

    map.width=wall.width*block.width;
    map.height=4*(wall.height*block.height)+player.height+infoBar.height;
    infoBar.width=map.width;
    player.x=map.width/2;
    player.y=map.height;
    ball.x=player.x;
    ball.y=player.y-(player.height+ball.r);

var fontSize=16;
    fontSize+='pt';

var cnvs=document.getElementById('cnvs');
var ctx=cnvs.getContext('2d');

function copyObject(to,from) {
    for (var key in from) {
        to[key]=from[key];
    }
}

function generateWall () {
   var x=0;
   var y=infoBar.height;
   for (var i=0; i<wall.height; i++) {
       wall.data[i]=[];
       if (i%2==0) { block.color='crimson'; } else { block.color='dodgerblue'; }
       for (var j=0; j<wall.width; j++) {
           block.x=x;
           block.y=y;
           wall.data[i][j]={};
           copyObject(wall.data[i][j],block);
           x+=block.width;
           //console.log(wall.data[i][j].x+':'+wall.data[i][j].y+'; ');
           //console.log(wall.data[i][j].color);
       }
       x=0;
       y+=block.height
   }
}

function initCanvas(w,h) {
    cnvs.width=w;
    cnvs.height=h;
    ctx.fillStyle=bgcolor;
    ctx.fillRect(0,0,w,h);
}

cnvs.onmousemove=function(event) {
    if (game_over==false) {
        var x=event.offsetX;
        var y=event.offsetY;
        player.x=x;
        if (timerID==0) { 
            ball.x=player.x; 
            drawMap();
            drawText('click to start',map.width/2,map.height/2);
        }
    }
}

cnvs.onclick=function(event) {
    if (timerID==0 && game_over==false) {
        timerID=setInterval(moveBall,ball.speed);
    } else if (timerID!=0 && game_over) {
        resetGame();
    } else if (game_stop) {
        resetBall();
    }
}

function toStartPosition() {
    player.x=map.width/2;
    player.y=map.height;
    ball.x=player.x;
    ball.y=player.y-(player.height+ball.r);
    ball.dy=-2;
    ball.dx=2;
}

function resetBall() {
    toStartPosition();
    game_stop=false;
    timerID=0;
    drawMap();
    drawText('click to continue',map.width/2,map.height/2);
}

function resetGame() {
    generateWall();
    toStartPosition();
    player.lives=3;
    player.score=0;
    game_over=false;
    timerID=0;
    drawMap();
    drawText('click to start',map.width/2,map.height/2);
}

function moveBall() {
    ball.x+=ball.dx;
    ball.y+=ball.dy;

    if (ball.y+ball.r>=player.y-player.height && (ball.x+ball.r>=player.x-player.width/2 && ball.x-ball.r<=player.x+player.width/2)) {
        ball.dy=-ball.dy;
    }

    if (ball.x+ball.r>map.width) { //from right border
        ball.dx=-ball.dx;
    } else if (ball.x-ball.r<0) { //from left border
        ball.dx=-ball.dx;
    } else if (ball.y-ball.r<0) { //from top border
        ball.dy=-ball.dy;
    } else if (ball.y+ball.r>map.height) {
        clearInterval(timerID);
        player.lives--;
        if (player.lives==0) {
            game_over=true;
            drawText('GAME OVER',map.width/2,map.height/2,'bottom');
            drawText('click to reset',map.width/2,map.height/2,'hanging');
        } else {
            game_stop=true;
            drawText('click to continue',map.width/2,map.height/2);
        }
    }

    for (var i=0; i<wall.height; i++) {
        for (var j=0; j<wall.width; j++) {
            if (wall.data[i][j].crashed==false) {
                checkHit(wall.data[i][j]);
            }
        }
    }

    if (game_over==false) {
        drawMap();
    }
}

function hit(blk,dxy) {
    if (dxy=='dx') {
        ball.dx=-ball.dx;
    } else if (dxy=='dy') {
        ball.dy=-ball.dy;
    }
    blk.crashed=true;
    player.score+=10;
}

function checkHit(blk) {
    var x=blk.x+blk.width/2; //x of block center
    var y=blk.y+blk.height/2; //y of block center
    var block_ls=x-(blk.width/2-blk.indent); //x of block left side
    var block_rs=x+(blk.width/2-blk.indent); //x of block right side
    var block_ts=y-(blk.height/2-blk.indent); //y of block top side
    var block_bs=y+(blk.height/2-blk.indent); //y of block bottom side
    var ball_ls=ball.x-ball.r; //x of ball left side
    var ball_rs=ball.x+ball.r; //x of ball right side
    var ball_ts=ball.y-ball.r; //y of ball top side
    var ball_bs=ball.y+ball.r; //y of ball bottom side

    if ((ball_rs>block_ls && ball_ls<block_rs) && (ball_ts<=block_bs && ball.y>y)) { hit(blk,'dy'); } //hit from bottom
    if ((ball_rs>block_ls && ball_ls<block_rs) && (ball_bs>=block_ts && ball.y<y)) { hit(blk,'dy'); } //hit from top
    if ((ball_ts<block_bs && ball_bs>block_ts) && (ball_rs>=block_ls && ball.x<x)) { hit(blk,'dx'); } //hit from left
    if ((ball_ts<block_bs && ball_bs>block_ts) && (ball_ls<=block_rs && ball.x>x)) { hit(blk,'dx'); } //hit from right
}

function drawInfoBar() {
   ctx.fillStyle=infoBar.color;
   ctx.fillRect(0,0,infoBar.width,infoBar.height);
   drawText('Score: '+player.score,map.width/4,infoBar.height/2);
   drawText('Lives: '+player.lives,map.width/2+map.width/4,infoBar.height/2);
}

function drawWall() {
   for (var i=0; i<wall.height; i++) {
       for (var j=0; j<wall.width; j++) {
           drawBlock(wall.data[i][j]);
           //drawBlock(wall.data[i][j].x,wall.data[i][j].y);
           //drawBlock(x,y,width,height,color,indent);
           //console.log(wall.data[i][j].x+':'+wall.data[i][j].y+'; ');
       }
   }
}

function drawPlayer() {
    ctx.fillStyle=player.color;
    ctx.fillRect(player.x-player.width/2,player.y-player.height,player.width,player.height);
    ctx.strokeStyle=bgcolor;
    ctx.lineWidth=player.indent;
    ctx.strokeRect(player.x-player.width/2,player.y-player.height,player.width,player.height);
};

function drawBall() {
    ctx.beginPath();
    ctx.fillStyle=ball.color;
    ctx.arc(ball.x,ball.y,ball.r,0,2*Math.PI,false);
    //.arc(centerX, centerY, radius, sAngle, eAngle, clockwise)
    ctx.fill();
    ctx.closePath();
}

function drawBlock(blk) {
    if (blk.crashed==false) {
        ctx.fillStyle=blk.color;
        ctx.fillRect(blk.x,blk.y,blk.width,blk.height);
        ctx.strokeStyle=bgcolor;
        ctx.lineWidth=blk.indent;
        ctx.strokeRect(blk.x,blk.y,blk.width,blk.height);
    }
}

function drawMap() {
    ctx.clearRect(0,0,map.width,map.height);
    ctx.fillStyle=bgcolor;
    ctx.fillRect(0,0,map.width,map.height);
    drawInfoBar();
    drawWall();
    drawPlayer();
    drawBall();
}

function drawText(str,x,y,valign) {
    if (valign===undefined) { valign='middle'; }
    ctx.fillStyle='yellow';
    //ctx.strokeStyle='dodgerblue';
    ctx.font=fontSize+' bold fixedsys';
    ctx.textBaseline=valign;
    ctx.textAlign='center';
    ctx.fillText(str,x,y);
    //ctx.strokeText(str,x,y);
}

initCanvas(map.width,map.height);
resetGame();