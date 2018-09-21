var cnvs,ctx;
var delayId;
var center=[0,0,0];
var points=false;
var delay=50;
var rx=0,ry=0,rz=0;
var drx=1,dry=1,drz=1;
var cube=["Cube",
[-50,-50,50],
[50,-50,50],
[50,-50,-50],
[-50,-50,-50],
[-50,50,50],
[50,50,50],
[50,50,-50],
[-50,50,-50]];

function main() {
init_canvas();
delayId=setInterval(
function () {
var objCopy=JSON.parse(JSON.stringify(cube));
showInfo(cube);
cls();
rotateObject(objCopy,rx,ry,rz);
changeCenter(objCopy,center);
drawObject(objCopy,points);
rx=(rx>359) ? rx-=360 : rx+=drx;
ry=(ry>359) ? ry-=360 : ry+=dry;
rz=(rz>359) ? rz-=360 : rz+=drz;
},delay);
}

function restart () {
clearInterval(delayId);
main();
}

function cntrl(p) {

switch(p) {
case 'stop_all':
	if (drx==0 && dry==0 && drz==0) {
	drx=1; 	dry=1; drz=1;
	} else { drx=0; dry=0; drz=0; }
	break;
case 'stop_x': 
	drx=(drx>0) ? drx=0 : drx=1; break;
case 'stop_y':
	dry=(dry>0) ? dry=0 : dry=1; break;
case 'stop_z':
	drz=(drz>0) ? drz=0 : drz=1; break;
case 'speed_up':
	if (delay>0) {
	delay-=10; restart(); } break;
case 'speed_down':
	if (delay<100) {
	delay+=10; restart(); } break;
case 'points':
	points=!points;	break;
	}
}

function rotateObject(obj,x,y,z) {
x=x*Math.PI/180;
y=y*Math.PI/180;
z=z*Math.PI/180;

var tmp;

for (var i=1; i<obj.length; i++) {

tmp=obj[i][1];
obj[i][1]= Math.round(obj[i][1]*Math.cos(x)+obj[i][2]*Math.sin(x));
obj[i][2]= Math.round(-tmp*Math.sin(x)+obj[i][2]*Math.cos(x));
tmp=obj[i][0];
obj[i][0]= Math.round(obj[i][0]*Math.cos(y)+obj[i][2]*Math.sin(y));
obj[i][2]= Math.round(-tmp*Math.sin(y)+obj[i][2]*Math.cos(y));
tmp=obj[i][0];
obj[i][0]= Math.round(obj[i][0]*Math.cos(z)-obj[i][1]*Math.sin(z));
obj[i][1]= Math.round(tmp*Math.sin(z)+obj[i][1]*Math.cos(z));

}
}

function showInfo(obj) {
var pnts=obj.length-1;
info=document.getElementById("info");
rxyz=document.getElementById("rxyz");
pause=document.getElementById("delay");
info.innerHTML='Object: '+obj[0]+'. Points: '+pnts+'.';
rxyz.innerHTML='rx = '+rx+', ry = '+ry +', rz = '+rz+'.';
pause.innerHTML='delay = '+delay;
}

function changeCenter(obj,c) {
for (var i=1; i<obj.length; i++) {
obj[i][0]+=c[0]; obj[i][1]+=c[1]; }
}

function drawObject(obj,p) {
var a,i;
ctx.beginPath();
for (i=1; i<5; i++) {
a=1; a=((i+a)>4) ? a=-3 : a=a;
ctx.moveTo(obj[i][0],obj[i][1]);
ctx.lineTo(obj[i+a][0],obj[i+a][1]);
a+=4;
ctx.lineTo(obj[i+a][0],obj[i+a][1]);
a+=1; a=((i+a)>8) ? a-=4 : a=a;
ctx.lineTo(obj[i+a][0],obj[i+a][1]);
}
ctx.strokeStyle="blue";
ctx.stroke();

if (p) {
for (i=1; i<obj.length; i++) {
drawPoint(obj[i][0],obj[i][1]); }
}
}

function init_canvas() {
cnvs=document.getElementById("cnvs");
ctx=cnvs.getContext("2d");
}

function cls() {
//ctx.clearRect(0,0,cnvs.width,cnvs.height);
ctx.fillStyle="grey";
ctx.fillRect(0,0,cnvs.width,cnvs.height);
center=[cnvs.width/2,cnvs.height/2,0];
}

function drawPoint(x,y) {
ctx.fillStyle="black";
ctx.fillRect(x-2,y-2,4,4);
}

function print(str) {
document.write(str,'<br>');
}
