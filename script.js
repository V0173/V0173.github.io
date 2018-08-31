var simbols_list='!@#$%&(){}[]?1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

var target=document.getElementById('running_string');
var msg='Hello world!';
var attempts=10;

function printRunningString(str,delay) {
    var i=0, j=0, rs='', new_str='';
    target.innerHTML='';
    var timerID=setTimeout(function putLetter() {
        if (j<attempts) {
            rs=simbols_list[Math.floor(Math.random()*simbols_list.length)];
            new_str=str.substring(0,i-1)+rs;
            target.innerHTML=new_str;
            j++;
        } else {
            new_str=str.substring(0,i);
            new_str+=str[i];
            target.innerHTML=new_str;
            i++;
            j=0;
        }
        if (i<str.length) setTimeout(putLetter,delay);
    },delay);
};

printRunningString(msg,50);
