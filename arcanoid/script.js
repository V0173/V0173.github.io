var timeID=0;
var bgcolor='black';

var infoBar = {
    width: 0,
    height: 50,
    color: 'dimgray' };

var wall = {
    width: 11,
    height: 5 };

var block = {
    width: 40,
    height: 20,
    color: 'dodgerblue',
    indent: 2,
    bonus: 'n' };

var player = {
    x: 0,
    y: 0,
    score: 0,
    lives: 3,
    width: 80,
    height: 10, 
    color: 'dodgerblue',
    indent: 2,
    bonus: 'n' };

var ball = {
    x: 0,
    y: 0,
    r: 5,
    speed: 1,
    route: 0,
    color: 'red' };

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

function initCanvas(w,h) {
    cnvs.width=w;
    cnvs.height=h;
    ctx.fillStyle=bgcolor;
    ctx.fillRect(0,0,w,h);
}

cnvs.onclick=function(event) {
    var x=event.offsetX;
    var y=event.offsetY;
    //var str='X: '+x+'; Y: '+y+';';
    //alert(str);
}

cnvs.onmousemove=function(event) {
    var x=event.offsetX;
    var y=event.offsetY;
    player.x=x;
    drawMap();
}

window.onkeydown=function(event) {
    switch (event.keyCode) {
        case 37: //moveLeft

        break;
        case 38: //moveUp

        break;
        case 39: //moveRight

        break;
        case 40: //moveDown

        break;
        default:
            //
        break;
    }
}

function drawInfoBar() {
   ctx.fillStyle=infoBar.color;
   ctx.fillRect(0,0,infoBar.width,infoBar.height);
   drawText('Score: '+player.score,map.width/4,infoBar.height/2);
   drawText('Lives: '+player.lives,map.width/2+map.width/4,infoBar.height/2);
}

function drawWall() {
   var x=0;
   var y=infoBar.height;
   for (var i=0; i<wall.height; i++) {
       for (var j=0; j<wall.width; j++) {
           drawBlock(x,y);
           x+=block.width;
       }
       x=0;
       y+=block.height
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

function drawBlock(x,y) {
    ctx.fillStyle=block.color;
    ctx.fillRect(x,y,block.width,block.height);
    ctx.strokeStyle=bgcolor;
    ctx.lineWidth=block.indent;
    ctx.strokeRect(x,y,block.width,block.height);
}

function drawMap() {
   ctx.clearRect(0,0,map.width,map.height);
   ctx.fillStyle=bgcolor;
   ctx.fillRect(0,0,map.width,map.height);
/*
   drawInfoBar();
   drawWall();
*/
   drawPlayer();
//   drawBall();

}


function drawText(str,x,y) {
    ctx.fillStyle='yellow';
    //ctx.strokeStyle='dodgerblue';
    ctx.font=fontSize+' bold fixedsys';
    ctx.textBaseline='middle';
    ctx.textAlign='center';
    ctx.fillText(str,x,y);
    //ctx.strokeText(str,x,y);
}

function drawMsg(msg,delay) {
    if (delay===undefined) {
        delay=500;
    }
    if (timeID!=0) {
        clearTimeout();
        timeID=0;
    }
    drawMap();
    drawText(msg,map.width/2,map.height/2);
    timeID=setTimeout(drawMap,delay);
}

initCanvas(map.width,map.height);
//drawMap();
