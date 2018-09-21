var cnvs;
var ctx;
var cellSize=5;
var field_W=200;
var field_H=200;
var field=[];
var count=0;
var delaySize=50;
var timer=0;
var cellCount=0;
var started=0;
var fieldHistory=[0,1,2];

function main() {
	cnvs=document.getElementById("canvas");
	ctx=cnvs.getContext('2d');
	createField(); // Создание массива игрового поля
	drawInfo();

cnvs.onclick=function(event) {
	var x=event.offsetX;
	var y=event.offsetY;
	x=Math.floor(x/cellSize);
	y=Math.floor(y/cellSize);
	field[x][y]=1;
	drawField();
	//console.log('Added point: ',x,y);
	}

cnvs.onmousemove=function(event) {
	drawField();
	var x=event.offsetX;
	var y=event.offsetY;
	x=Math.floor(x/cellSize);
	y=Math.floor(y/cellSize);
	ctx.fillRect(x*cellSize,y*cellSize,cellSize,cellSize);
	}

cnvs.onmouseout=function(event) {
	drawField();
	}

input=document;
input.onclick=function(event) {
	var target=event.target;
	target.style='';
	target.value='';
	}

}

function checkInput(input,id) {
	if (input*1!=input || input=='' || input==0) {
		write(id,'Wrong input!','color:red');
		return 1;
	}
}

function createField() {
	field_W=Math.floor(cnvs.width/cellSize);
	field_H=Math.floor(cnvs.height/cellSize);
	cnvs.width=field_W*cellSize;
	cnvs.height=field_H*cellSize;
	field=[];
	for (var i=0; i<field_W; i++) {
		field[i]=[];
		for (var j=0; j<field_H; j++) {
			field[i][j]=0;
		}
	}
	//console.log('Field is created');
}

function drawField() {
	ctx.clearRect(0,0,cnvs.width,cnvs.height);
	cellCount=0;
	for (var i=0; i<field.length; i++) {
		for (var j=0; j<field.length; j++) {
			if (field[i][j]==1) {
				ctx.fillRect(i*cellSize,j*cellSize,cellSize,cellSize);
				cellCount++;
			}
		}
	}
print("population",cellCount);
}

function drawInfo() {
	print('cell',cellSize+'x'+cellSize+' px');
	print('field',field_W*cellSize+'x'+field_H*cellSize+' px');
	print('delay',delaySize+' ms');
	print("generation",count);
	print("population",cellCount);
}

function changeSize(keyword) {
	switch (keyword) {
		case 'cell':
			var cs=document.getElementById("cellSize");
			if (checkInput(cs.value,'cellSize')) break;
			cellSize=cs.value*1;
		break;
		case 'field':
			var fw=document.getElementById("field_W");
			var fh=document.getElementById("field_H");
			if (!checkInput(fw.value,'field_W')) cnvs.width=fw.value*1;
			if (!checkInput(fh.value,'field_H')) cnvs.height=fh.value*1;
		break;
	}
	createField(); // Пересоздание нового массива
	print('cell',cellSize+'x'+cellSize+' px');
	print('field',field_W*cellSize+'x'+field_H*cellSize+' px');
}

function game(keyword) {
	switch (keyword) {
		case 'start':
		if (!timer) {
		timer=setInterval(evolution,delaySize);
		started=true;
		break;
		} else {
			game('stop');
			started=false;
			break;
		}
	case 'stop':
		if (timer) clearInterval(timer);
		timer=0;
		break;
	case 'reset':
		game('stop');
		createField();
		drawField();
		write("cellSize",'');
		write("field_W",'');
		write("field_H",'');
		write("delaySize",'');
		count=0;
		print("generation",count);
	break;
	case 'delay':
		var ds=document.getElementById("delaySize");
	   	if (checkInput(ds.value,'delaySize')) break;
		game('stop');
		delaySize=ds.value;
		if (started) game('start');
		print('delay',delaySize+' ms');
	break;
	case 'rules':
		alert('Правила игры:\n\n1. Игра происходит на поле состоящим из клеток, каждая из которых может быть живой или мёртвой.\n2. Каждая клетка имеет 8 соседних клеток.\n3. Первое поколение клеток задаётся, а последующие генерируются по правилам:.\nа) новая клетка создаётся если у неё есть ровно 3 "соседки"\nб) клетка продолжает жить если у неё есть 2 или 3 "соседки", иначе клетка умирает\n\nИгра заканчивается если:\n\nа) на поле не остаётся ни одной живой клетки\nб) ни одна клетка не меняет своего расположения\nв) расположение клеток в точности повторяется\n\nПримечание: Вы можете изменить размер клеток, размер игрового поля и время задержки между новыми поколениями.');
	break;
	}
}

function evolution() {
	//console.log('Evolution cycles: ',count);
	checkRules();
	drawField();
	count++;
	print("generation",count);
	// Если не осталось клеток или статичное положение или мигалка, то игра окончена
	if (cellCount==0 || fieldHistory[2]==fieldHistory[1] || fieldHistory[2]==fieldHistory[0]) gameOver();
}

function gameOver() {
	game('stop');
	var target=document.getElementById("cellSize");
	write("cellSize",'Game over!','color:red');
}

function checkRules() {
	var vitality=[];
	for (var i=0; i<field.length; i++) {
		vitality[i]=[];
		for (var j=0; j<field.length; j++) {
			var sideCells=0;
			if (field[mOne(i)][j]==1) sideCells++; // Слева
			if (field[i][mOne(j)]==1) sideCells++; // Сверху
			if (field[pOne(i)][j]==1) sideCells++; // Справа
			if (field[i][pOne(j)]==1) sideCells++; // Снизу
			if (field[mOne(i)][mOne(j)]==1) sideCells++; // Слева вверху
			if (field[pOne(i)][mOne(j)]==1) sideCells++; // Справа вверху
			if (field[pOne(i)][pOne(j)]==1) sideCells++; // Справа внизу
			if (field[mOne(i)][pOne(j)]==1) sideCells++; // Слева внизу
			
	if (field[i][j]==0) {
		sideCells==3 ? vitality[i][j]=1 : vitality[i][j]=0;
	} else {
		(sideCells<2 || sideCells>3) ? vitality[i][j]=0 : vitality[i][j]=1;
	}
			}
		}
	if (count==0) { // Запись в историю первого положения
		fieldHistory.push(JSON.stringify(field));
		fieldHistory.shift();
	}
	fieldHistory.push(JSON.stringify(vitality));
	fieldHistory.shift();
	field=vitality;
}

function mOne (a) { // Минус один
	if (a==0) return (field.length-1); else return (a-1);
}
function pOne (a) { // Плюс один
	if (a==field.length-1) return (0); else return (a+1);
}

function print(id,str) {
	var target=document.getElementById(id);
	target.innerHTML=str;
}

function write(id,str,style) {
	var target=document.getElementById(id);
	target.value=str;
	target.style=style;
}
