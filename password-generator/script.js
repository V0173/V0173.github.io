var abcEnL='abcdefghijklmnopqrstuvwxyz';
var abcEnU=abcEnL.toUpperCase();
var digits='1234567890';
var simbols='!@#$%^&*()-_=+';
var abcRu='абвгдеёжзийклмнопрстуфхцчшщъыьэюя';

var simStr='';
var passLen=16;
var password='';

function reset(id) {
	target=document.getElementById(id);
	write(id,'');
}

function getStr(id) {
	target=document.getElementsByName(id);
	for (var i=0; i<4; i++) {
		if (target[i].checked==true) {
			switch (target[i].id) {
				case 's1':
					simStr+=abcEnL;
				break;
				case 's2':
					simStr+=abcEnU;
				break;
				case 's3':
					simStr+=digits;
				break;
				case 's4':
					simStr+=simbols;
				break;
			}
		}
	}
}

function getLen(id) {
	target=document.getElementById(id);
	if (target.value!='' && target.value*1==target.value) {
		passLen=target.value;
	} else {
		write(id,'Must be a number!');
		alert('Default length is 16.');
	}
}

function shuffleStr(str) {
	var i,ct,j1,j2;
	var arr=[];
	for (i=0; i<str.length; i++) {
		arr[i]=str[i];
	}
	for (i=0; i<999; i++) {
		j1=Math.floor(Math.random()*str.length);
		j2=Math.floor(Math.random()*str.length);
		ct=arr[j1];
		arr[j1]=arr[j2];
		arr[j2]=ct;
	}
//	str=JSON.stringify(arr.join(''));
	str='';
	for (i=0; i<arr.length; i++) {
		str+=arr[i];
	}
	return str;
}

function genPassword (pass,len,str,id) {
	for (var i=0; i<len; i++) {
		pass+=str[Math.floor(Math.random()*str.length)];
	}
	write(id,pass);
}

function go() {
	simStr='';
	password='';
	getStr("simbols");
	getLen("pwlen");
	simStr=shuffleStr(simStr);
	genPassword(password,passLen,simStr,"result");
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
