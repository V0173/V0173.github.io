var white_figures=['','&#9817;','&#9816;','&#9815;','&#9814;','&#9813;','&#9812;'];
var black_figures=['','&#9823;','&#9822;','&#9821;','&#9820;','&#9819;','&#9818;'];
var index_x=['','A','B','C','D','E','F','G','H',''];
var index_y=['','8','7','6','5','4','3','2','1',''];
var start_position=[
    [0,0,0,0,0,0,0,0,0,0],
    [0,4,2,3,5,6,3,2,4,0],
    [0,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,0],
    [0,4,2,3,5,6,3,2,4,0],
    [0,0,0,0,0,0,0,0,0,0],
    ];

drawBoard('chess_board');
drawFigures();

/*cell highlighting on mouseover
var board_table=document.getElementById('board');
board_table.onmouseover=board_table.onmouseout=function(event) {
    var target=event.target;
    if (target.tagName=='TD') {
        target.classList.toggle('highlight');
    }
}
*/

function print(id,str) {
    var target=document.getElementById(id);
    target.innerHTML=str;
}

function showContent(id) {
    var target=document.getElementById(id);
    alert(target.innerHTML);
}

function drawBoard(id) {
var color='white';
var str='';
    str='<table id="board">';
    for (var j=0; j<10; j++) {
        str+='<tr>';
        if (color=='black') {color='white';} else {color='black';}
        for (var i=0; i<10; i++) {
            if (color=='black') {color='white';} else {color='black';}
            if (j==0 || j==9) {
                str+='<td class="board_border">'+index_x[i]+'</td>';
            } else {
                if (i==0 || i==9) {
                    str+='<td class="board_border">'+index_y[j]+'</td>';
                } else {
                    str+='<td id="'+index_x[i]+index_y[j]+'" class="'+color+'" name="cell"></td>';
                }
            }
        }
        str+='</tr>';
    }
    str+='</table>';
    print(id,str);
}

function drawFigures() {
    var placeID='';
    for (var j=1; j<9; j++) {
        for (var i=1; i<9; i++) {
            placeID=index_x[i]+index_y[j];
            var target=document.getElementById(placeID);
            target.innerHTML=black_figures[start_position[j][i]];
        }
    }
}
