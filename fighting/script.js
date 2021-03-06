//Параметры игрока:
//Имя - name, Уровень - lvl, Опыт - exp, Очки характеристик - sps,
//Сила - str, Ловкость - dex, Инстинкт - ins, Живучесть - vit,
//Здоровье - hps, Энергия - nrg, Урон - dmg, Защита - def, Точноть - acr,
//Всего попаданий - hits, Всего нанесенного урона - sdmg,
//Оружие - wpn, Броня - arm, Навыки - sks, Эффекты - efs;

//player[i].hit=attack(pN);
//player[i].hit(pN);
//function attack(pN) {
//
//}


var player=[{},{},{}];
var logID='log';
initPlayer();
//initFrame(logID);
drawInfo();

function getTime () {
	var time=new Date();
	var options = {hour: 'numeric', minute: 'numeric', second: 'numeric'};
	//return ('['+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()+'] ');
	//return ('['+time.toTimeString()+'] ');
	return ('['+time.toLocaleString('ru', options)+'] ');
}

function initPlayer () {
	player=[{},{},{}];
	player[1]=createPlayer(player[1],1);
	player[2]=createPlayer(player[2],2);
}

function start() {
	calcParams(player[1],1);
	calcParams(player[2],2);
	drawInfo();
	print('info','FIGHT!');
	clearLog();
	printLog(getTime()+player[1].name+' vs. '+player[2].name);

	blockInput('wpn1');
	blockInput('wpn2');
	blockInput('arm1');
	blockInput('arm2');
}

function blockInput (name) {
	var x=document.getElementsByName(name);
	for (var i=0; i<x.length; i++) {
		x[i].disabled='disabled';
	}
}

function createPlayer(obj,x) {
	//obj.name=read('pN'+x,'text');
	obj.name='Player_'+x;
	obj.lvl=1;
	obj.exp=0;
	obj.sps=8;
	obj.str=1;
	obj.dex=1;
	obj.ins=1;
	obj.vit=1;
	obj.hits=0;
	obj.sdmg=0;
	obj=calcParams(obj,x);
	return(obj);
}

function calcParams(obj,x) {
	obj.wpn=addItems('wpn',x);
	obj.arm=addItems('arm',x);
	var str=obj.str+obj.wpn.str+obj.arm.str;
	var dex=obj.dex+obj.wpn.dex+obj.arm.dex;
	var ins=obj.ins+obj.wpn.ins+obj.arm.ins;
	var vit=obj.vit+obj.wpn.vit+obj.arm.vit;
	obj.hps=vit*10;
	obj.nrg=vit*5;
	obj.dmg=Math.round(str*2+dex/3);
	obj.dmg+=obj.wpn.dmg+obj.arm.dmg;
	obj.def=Math.round((str/2+dex/3+vit)/2);
	obj.def+=obj.wpn.def+obj.arm.def;
	obj.acr=(Math.round(((Math.sqrt((dex/(str+vit))/10)+0.45)/2)*100))/100;
	obj.acr+=obj.wpn.acr+obj.arm.acr;
	return(obj);
}

function addItems(item,x) {
	var target=document.getElementsByName(item+x);
	for (var i=0; i<target.length; i++) {
		if (target[i].checked) {
			switch (i) {
				case 0:
					return({str:0,dex:0,ins:0,vit:0,hps:0,nrg:0,dmg:0,def:0,acr:0});
				break;
				case 1:
					if (item=='wpn') { return({str:0,dex:3,ins:0,vit:0,hps:0,nrg:0,dmg:1,def:0,acr:0.1}); }
					if (item=='arm') { return({str:0,dex:3,ins:0,vit:1,hps:0,nrg:0,dmg:0,def:0,acr:0}); }
				break;
				case 2:
					if (item=='wpn') { return({str:0,dex:0,ins:0,vit:0,hps:0,nrg:0,dmg:3,def:1,acr:0}); }
					if (item=='arm') { return({str:0,dex:0,ins:0,vit:2,hps:0,nrg:0,dmg:0,def:3,acr:0}); }
				break;
			}
		}
	}
}

function changeStats(pN,stat,x) {
	if (x>0 && player[pN].sps>0) {
		player[pN][stat]+=1;
		player[pN].sps-=1;
	} else if (x<0 && player[pN][stat]>1) {
		player[pN][stat]-=1;
		player[pN].sps+=1;
	}
	calcParams(player[pN],pN);
	drawInfo();
}

function changeName(pN) {
	var str=prompt('Enter Player name:','Player');
	if (str!='' && str!=null) {
		player[pN].name=str;
	}
	print('pN'+pN,player[pN].name);
}

function drawInfo() {
	for (var i=1; i<3; i++) {
		var str=player[i].str+player[i].wpn.str+player[i].arm.str;
		var dex=player[i].dex+player[i].wpn.dex+player[i].arm.dex;
		var ins=player[i].ins+player[i].wpn.ins+player[i].arm.ins;
		var vit=player[i].vit+player[i].wpn.vit+player[i].arm.vit;
		print('pN'+i,player[i].name);
		print('lvl'+i,player[i].lvl);
		print('exp'+i,player[i].exp);
		print('str'+i,player[i].str+' ['+str+']');
		print('dex'+i,player[i].dex+' ['+dex+']');
		print('ins'+i,player[i].ins+' ['+ins+']');
		print('vit'+i,player[i].vit+' ['+vit+']');
		print('hps'+i,player[i].hps);
		print('nrg'+i,player[i].nrg);
		print('dmg'+i,player[i].dmg);
		print('def'+i,player[i].def);
		print('acr'+i,player[i].acr);
		print('sps'+i,player[i].sps);
	}
}

function attack(pNa,pNd) {
	var slip=0;
	var crit=0;
	if (player[pNd].dex/player[pNa].dex-0.2>1) {
		if (Math.random()>0.65) {
			slip=1;
			printLog(getTime()+player[pNa].name+' attack but '+player[pNd].name+' have slipped!');
		}
	} else { crit=1; }

	if (player[pNa].acr+Math.random()>0.75 && slip==0) {
		var damage=player[pNa].dmg;
		if (crit==1 && Math.random()>0.85) {
			damage=damage*2-player[pNd].def;
			if (damage<0) {damage=0};
			player[pNd].hps-=damage;
			player[pNa].hits+=1;
			player[pNa].sdmg+=damage;
			printLog(getTime()+player[pNa].name+' do critical strike. Damage: '+damage+'.');
		} else {
			damage=damage-player[pNd].def;
			if (damage<0) {damage=0};
			player[pNd].hps-=damage;
			player[pNa].hits+=1;
			player[pNa].sdmg+=damage;
			printLog(getTime()+player[pNa].name+' attacks and do damage of '+damage+'.');
		}
	} else {
		if (slip==0) printLog(getTime()+player[pNa].name+' attacks but have missed!');
	}

	if (player[pNd].hps<1) {
		print('info',player[pNa].name+' WON!<br>Hits: '+player[pNa].hits+'. Damage: '+player[pNa].sdmg+'.');
	}

	drawInfo();
}

function wait(pN) {
	//Regeneration of health and energy (10%)
		var vitSum=player[pN].vit+player[pN].wpn.vit+player[pN].arm.vit;
	var hpsRegen=vitSum;
	var nrgRegen=Math.round(vitSum/2);

	var x=0;
	for (var i=0; i<hpsRegen; i++) {
		if (player[pN].hps<vitSum*10) {
			player[pN].hps+=1;
			x+=1;
		}
	}

	x=0;
	for (var i=0; i<nrgRegen; i++) {
		if (player[pN].nrg<vitSum*5) {
			player[pN].nrg+=1;
			x+=1;
		}
	}
	nrgRegen=x;

	printLog(player[pN].name+' waiting. hps: +'+hpsRegen+', nrg: +'+nrgRegen+'.');
	drawInfo();
}

function reset() {
	window.location.reload();
}

function initFrame (id) {
	var iframe=document.getElementById(id);
	iframe.contentWindow.document.body.innerHTML='';
}

function printLog(str) {
	var target=document.getElementById(logID);
	target=target.contentWindow.document.body;
	target.innerHTML=str+'<br>'+target.innerHTML;
}

function clearLog() {
	var target=document.getElementById(logID);
	target=target.contentWindow.document.body;
	target.innerHTML='';
}

function print(id,str) {
	var target=document.getElementById(id);
	target.innerHTML=str;
}

function println(id,str) {
	var target=document.getElementById(id);
	target.innerHTML+=str+'<br>';
}

function write(id,str,style) {
	var target=document.getElementById(id);
	target.value=str;
	target.style=style;
}

function read(id,type) {
	var x;
	var target=document.getElementById(id);
	switch (type) {
		case 'text':
			x=target.innerHTML;
		break;
		case 'data':
			x=target.value;
		break;
	}
	return (x);
}