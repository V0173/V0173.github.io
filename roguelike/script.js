var timer=0;

var sellSize=16;
var fontSize=sellSize/2+sellSize/8;
    fontSize+='pt';

var player = {
    name: "digger",
    health: 40,
    wealth: 0,
    damage: 5,
    shield: 0,
    x: 1,
    y: 1,
    equip: { }
};

var monster = {
    name: "spider",
    health: 10,
    damage: 1,
    shield: 0,
};

var map = {
    w: 10, // width
    h: 10, // height
    data: [
    ['w','w','w','w','w','w','w','w','w','w'],
    ['$','r','w','r','r','r','w','w','w','w'],
    ['w','r','w','r','w','r','r','w','r','r'],
    ['w','r','@','r','w','r','r','w','d','w'],
    ['w','w','w','w','w','r','w','w','r','w'],
    ['w','w','r','r','r','r','w','r','r','w'],
    ['w','r','r','?','w','w','w','r','w','w'],
    ['w','r','w','w','r','$','w','r','r','w'],
    ['w','r','r','r','r','r','r','r','r','w'],
    ['w','w','w','w','w','w','w','w','w','w']
    ],
};

var cnvs=document.getElementById("cnvs");
var ctx=cnvs.getContext("2d");

function initCanvas(w,h) {
    ctx.fillStyle="white";
    ctx.strokeStyle="black";
    cnvs.width=w;
    cnvs.height=h;
    ctx.fillRect(0,0,cnvs.width,cnvs.height);

    fontSize=sellSize/2+sellSize/8;
    fontSize+='pt';
}

cnvs.onmousemove=function(event) {
    var x=event.offsetX;
    var y=event.offsetY;
    print("cursor_x",x);
    print("cursor_y",y);
}

window.onkeydown=function(event) {
    switch (event.keyCode) {
        case 37: //moveLeft
            print("action","Moving Left");
            checkMap(-1,0);
        break;
        case 38: //moveUp
            print("action","Moving Up");
            checkMap(0,-1);
        break;
        case 39: //moveRight
            print("action","Moving Right");
            checkMap(+1,0);
        break;
        case 40: //moveDown
            print("action","Moving Down");
            checkMap(0,+1);
        break;
        default:
            drawMsg("Wrong enter!");
        break;
    }
    printInfo();
}

function checkMap(dx,dy) {
    switch (map.data[player.y+dy][player.x+dx]) {
        case 'r':
            go(dx,dy);
        break;
        case 'w':
            drawError();
        break;
        case '@':
            attackMonster(player.y+dy,player.x+dx);
        break;
        case '$':
            player.wealth+=10;
            go(dx,dy);
            drawMsg("Gold found!");
        break;
        case '?':
            player.equip.key=true;
            go(dx,dy);
            drawMsg("Key found!");
        break;
        case '%':
            go(dx,dy);
            drawMsg("Bones found!");
        break;
        case 'd':
            if (player.equip.key==true) {
                go(dx,dy);
                drawMsg("Door opening!");
            } else {
                drawMsg("Door closed!");
            }
        break;

    }
}

function go(dx,dy) {
    map.data[player.y+dy][player.x+dx]='r';
    player.x+=dx;
    player.y+=dy;
    drawMap();
}

function attackMonster(x,y) {
    drawMsg("You attacking "+monster.name+"!");
    monster.health-=player.damage;
    if (monster.health<1) {
        drawMsg("You killed "+monster.name+"!",1000);
        map.data[x][y]="%";
    }
    player.health-=monster.damage;
    if (player.health<1) {
        drawMsg("You was killed by "+monster.name+"!",3000);
        map.data[player.y][player.x]="%";
    }
}

function drawMap() {
    for (var i=0; i<map.w; i++) {
        for (var j=0; j<map.h; j++) {
            switch (map.data[j][i]) {
                case 'w':
                     drawWall(i*sellSize,j*sellSize,sellSize);
                break;
                case 'r':
                     drawRoad(i*sellSize,j*sellSize,sellSize);
                break;
                case '$':
                     drawGold(i*sellSize,j*sellSize,sellSize);
                break;
                case '@':
                     drawMonster(i*sellSize,j*sellSize,sellSize);
                break;
                case '%':
                     drawBones(i*sellSize,j*sellSize,sellSize);
                break;
                case 'd':
                     drawDoor(i*sellSize,j*sellSize,sellSize);
                break;
                case '?':
                     drawKey(i*sellSize,j*sellSize,sellSize);
                break;
            }
        }
    }
    if (player.health>0) {
        drawPlayer(player.x*sellSize,player.y*sellSize,sellSize);
    }
}

function drawWall(x,y,sell) {
    ctx.fillStyle="red";
    ctx.fillRect(x,y,sell,sell);

    ctx.fillStyle="brown";
    ctx.fillRect(x,y+sell/2-sell/8,sell,sell/16);
    ctx.fillRect(x,y+sell-sell/8,sell,sell/16);
    ctx.fillRect(x+sell/2-sell/8,y,sell/16,sell/2);
    ctx.fillRect(x+sell-sell/8,y+sell/2,sell/16,sell/2);

    ctx.fillStyle="grey";
    ctx.fillRect(x,y+sell/2-sell/16,sell,sell/16);
    ctx.fillRect(x,y+sell-sell/16,sell,sell/16);
    ctx.fillRect(x+sell/2-sell/16,y,sell/16,sell/2);
    ctx.fillRect(x+sell-sell/16,y+sell/2,sell/16,sell/2);
}

function drawRoad(x,y,sell) {
    ctx.fillStyle="black";
    ctx.fillRect(x,y,sell,sell);
}

function drawDoor(x,y,sell) {
    ctx.fillStyle="maroon";
    ctx.fillRect(x,y,sell,sell);
    ctx.fillStyle="gold";
    ctx.fillRect(x+sell/8,y+sell/8,sell/8,sell/8);
    ctx.fillRect(x+3*(sell/4),y+sell/8,sell/8,sell/8);
    ctx.fillRect(x+sell/8,y+3*(sell/4),sell/8,sell/8);
    ctx.fillRect(x+3*(sell/4),y+3*(sell/4),sell/8,sell/8);
}

function drawPlayer(x,y,sell) {
    var dot=sellSize/8;
    ctx.fillStyle="black";
    ctx.fillRect(x,y,sell,sell);
    ctx.fillStyle="white";
    ctx.fillRect(x+3*dot,y+1*dot,2*dot,5*dot);
    ctx.fillRect(x+1*dot,y+4*dot,1*dot,1*dot);
    ctx.fillRect(x+2*dot,y+3*dot,1*dot,1*dot);
    ctx.fillRect(x+5*dot,y+3*dot,1*dot,1*dot);
    ctx.fillRect(x+6*dot,y+4*dot,1*dot,1*dot);
    ctx.fillRect(x+2*dot,y+6*dot,1*dot,1*dot);
    ctx.fillRect(x+5*dot,y+6*dot,1*dot,1*dot);
/*
    ctx.fillRect(x+3*(sell/8),y+1*(sell/8),2*(sell/8),5*(sell/8));
    ctx.fillRect(x+1*(sell/8),y+4*(sell/8),1*(sell/8),1*(sell/8));
    ctx.fillRect(x+2*(sell/8),y+3*(sell/8),1*(sell/8),1*(sell/8));
    ctx.fillRect(x+5*(sell/8),y+3*(sell/8),1*(sell/8),1*(sell/8));
    ctx.fillRect(x+6*(sell/8),y+4*(sell/8),1*(sell/8),1*(sell/8));
    ctx.fillRect(x+2*(sell/8),y+6*(sell/8),1*(sell/8),1*(sell/8));
    ctx.fillRect(x+5*(sell/8),y+6*(sell/8),1*(sell/8),1*(sell/8));
*/
}

function drawGold(x,y,sell) {
    ctx.fillStyle="black";
    ctx.fillRect(x,y,sell,sell);
    ctx.fillStyle="yellow";
    ctx.font=fontSize+' bold fixedsys';
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.fillText('$',x+sell/2,y+sell/2);
}

function drawMonster(x,y,sell) {
    ctx.fillStyle="black";
    ctx.fillRect(x,y,sell,sell);
    ctx.fillStyle="red";
    ctx.font=fontSize+' bold fixedsys';
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.fillText('@',x+sell/2,y+sell/2);
}

function drawBones(x,y,sell) {
    ctx.fillStyle="black";
    ctx.fillRect(x,y,sell,sell);
    ctx.fillStyle="gray";
    ctx.font=fontSize+' bold fixedsys';
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.fillText('%',x+sell/2,y+sell/2);
}

function drawKey(x,y,sell) {
    ctx.fillStyle="black";
    ctx.fillRect(x,y,sell,sell);
    ctx.fillStyle="lime";
    ctx.font=fontSize+' bold fixedsys';
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.fillText('?',x+sell/2,y+sell/2);
}

function drawText(str,x,y) {
    ctx.fillStyle="yellow";
    ctx.strokeStyle="dodgerblue";
    ctx.font=fontSize+' bold fixedsys';
    ctx.textBaseline="bottom";
    ctx.textAlign="center";
    ctx.fillText(str,x,y);
    //ctx.strokeText(str,x,y);
}

function drawMsg(msg,delay) {
    if (delay===undefined) {
        delay=500;
    }
    if (timer!=0) {
        clearTimeout();
        timer=0;
    }
    drawMap();
    drawText(msg,map.w*sellSize/2,map.h*sellSize/2);
    timer=setTimeout(drawMap,delay);
}

function drawError() {
    drawText("!!",player.x*sellSize+sellSize/2,player.y*sellSize);
    setTimeout(drawMap,200);
}

function printInfo() {
    var infoTable='';
        infoTable+='Health: '+player.health+'<br>';
        infoTable+='Wealth: '+player.wealth+'<br>';
        infoTable+='Damage: '+player.damage+'<br>';
        infoTable+='Shield: '+player.shield+'<br>';
    print("info",infoTable);
}

function print(id,str) {
    var target=document.getElementById(id);
    target.innerHTML=str;
}

function scale(m) {
    if (m=="+" && sellSize<64) {
        sellSize*=2;
    }
    if (m=="-" && sellSize>16) {
        sellSize/=2;
    }
    initCanvas(map.w*sellSize,map.h*sellSize);
    drawMap();
}

function control(key) {
    switch (key) {
        case 'left': //moveLeft
            print("action","Moving Left");
            checkMap(-1,0);
        break;
        case 'up': //moveUp
            print("action","Moving Up");
            checkMap(0,-1);
        break;
        case 'right': //moveRight
            print("action","Moving Right");
            checkMap(+1,0);
        break;
        case 'down': //moveDown
            print("action","Moving Down");
            checkMap(0,+1);
        break;
    }
    printInfo();
}

function showHelp() {
    alert('Hello world! :)');
}

initCanvas(map.w*sellSize,map.h*sellSize);
drawMap();
printInfo();