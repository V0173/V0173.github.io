function reset(id) {
	var target=document.getElementById(id);
	write(id,'');
}

function check(id) {
	var target=document.getElementById(id);
	var str=target.value;
	var num=str*1;
	var d=2;
	while (num%d!=0) {
		d++;
	}
	if (d==num) print("info",'It\'s simple!'); else print("info",'It\'s not simple! Divisor: '+d);
}

function find(id1,id2){
	var sNumbers=[];
	var target1=document.getElementById(id1);
	var sNum=target1.value*1;
	var target2=document.getElementById(id2);
	var fNum=target2.value*1;

//	for (sNum; sNum<=fNum; sNum++) {
//		var d=2;
//		while (sNum%d!=0) {
//			d++;
//		}
//		if (d==sNum) sNumbers.push(sNum);
//	print("info",'Process: '+sNum+' -> '+fNum);
//	}

	while (sNum<=fNum) {
		var d=2;
		while (d*d<sNum && sNum%d!=0) {
			d++;
		}
		if (d*d>sNum) sNumbers.push(sNum);
		print("info",'Process: '+sNum+' -> '+fNum);
		sNum++;
	}

	print("result",sNumbers.join(', '));
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
