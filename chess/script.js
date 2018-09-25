var tmpID, picked, picked_tmp;
var white_figures=['','&#9817;','&#9816;','&#9815;','&#9814;','&#9813;','&#9812;'];
var black_figures=['','&#9823;','&#9822;','&#9821;','&#9820;','&#9819;','&#9818;'];
var figures_names_en=['','pawn','knight','bishop','tower','queen','king'];
var figures_names_ru=['','пешка','конь','слон','ладья','ферзь','король'];
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

/*подсветка клетки при наведении курсора - сделано через CSS
var board_table=document.getElementById('board');
board_table.onmouseover=board_table.onmouseout=function(event) {
    var target=event.target;
    if (target.tagName=='TD') {
        target.classList.toggle('highlight');
    }
}
*/

var board_table=document.getElementById('board');
var info_board

board_table.onclick=function(event) {
    var target=event.target;
    picked=target.innerHTML;

    if (target.tagName=='TD' && target.id!='') {    //рисуем рамку вокруг выбранной клетки
        if (!tmpID) {
            tmpID=target.id;
        } else {
            document.getElementById(tmpID).classList.toggle('inner_border');
        }
        target.classList.toggle('inner_border');
        //tmpID=event.target.id;

        if (picked) {    //если выбрана фигура пишем её название и цвет
            if (white_figures.indexOf(picked)!=-1) {
                print('info', 'white ' + figures_names_en[white_figures.indexOf(picked)] +' on '+target.id);
                picked_tmp=picked;
            } else {
                print('info', 'black ' + figures_names_en[black_figures.indexOf(picked)] +' on '+target.id);
                picked_tmp=picked;
            }
            
        } else if (picked_tmp) {
            target.innerHTML=picked_tmp;
            if (white_figures.indexOf(picked_tmp)!=-1) {
                print('info', 'white ' + figures_names_en[white_figures.indexOf(picked_tmp)] +' go on '+target.id);
                print(tmpID,'');
                picked_tmp='';
            } else {
                print('info', 'black ' + figures_names_en[black_figures.indexOf(picked_tmp)] +' go on '+target.id);
                print(tmpID,'');
                picked_tmp='';
            }
        } else {
                print('info',target.id);
        }
        tmpID=event.target.id;
    }
}

function print(id,str) {
    var target=document.getElementById(id);
    target.innerHTML=str;
}

function showContent(id) {
    var target=document.getElementById(id);
    alert(target.innerHTML);
}

function drawBoard(id) {    //создаём доску
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

function drawFigures() {    //расставляем фигуры в исходное положение
    var placeID='';
    for (var j=1; j<9; j++) {
        for (var i=1; i<9; i++) {
            placeID=index_x[i]+index_y[j];
            var target=document.getElementById(placeID);
            if (j<5) {
                target.innerHTML=black_figures[start_position[j][i]];
                black_figures[start_position[j][i]]=target.innerHTML;
            } else {
                target.innerHTML=white_figures[start_position[j][i]];
                white_figures[start_position[j][i]]=target.innerHTML;
            }
        }
    }
}
