const gridBox = ["","","","","","","","",""];
let totalInsert = 0;
let winnerDecided = false;
// row: 012 , 345 , 678
// col: 036, 147, 258
// dig: 048 , 246
// player:'X', "O"

const stat = document.getElementById('status');

function checkWinner(player){
   if(gridBox[0]==player&&gridBox[1]==player&&gridBox[2]==player)
    return true;
   else if(gridBox[3]==player&&gridBox[4]==player&&gridBox[5]==player)
    return true;
   else if(gridBox[6]==player&&gridBox[7]==player&&gridBox[8]==player)
    return true;
   else if(gridBox[0]==player&&gridBox[3]==player&&gridBox[6]==player)
    return true;
   else if(gridBox[1]==player&&gridBox[4]==player&&gridBox[7]==player)
    return true;
   else if(gridBox[0]==player&&gridBox[4]==player&&gridBox[8]==player)
    return true;
   else if(gridBox[2]==player&&gridBox[4]==player&&gridBox[6]==player)
    return true;
   else if(gridBox[2]==player&&gridBox[5]==player&&gridBox[8]==player)
    return true;
   else 
    false;
}


const board = document.getElementById('board');
let turn = 'X';

board.addEventListener('click',(e)=>{
    // console.log(e.target.id);
    // if winner decide or game draw
    if(winnerDecided || totalInsert==9 || gridBox[e.target.id]!=""){
        return;
    }
    
    // console.log("hello");
    const box = e.target;
    box.textContent = turn;
    const index = box.id;

    gridBox[index] = turn;
    totalInsert++;

    if(checkWinner(turn)){
        stat.textContent = `Player ${turn} won the game`;
        winnerDecided = true;
        return;
    }

    if(totalInsert==9){
        stat.textContent = `Game is Draw`;
        return;
    }

    if(turn=='X')
        turn = 'O'
    else
        turn = 'X';

     stat.textContent = `Player ${turn}'s Turn`;
   
})

const button = document.getElementById('resetBtn');

button.addEventListener('click',()=>{
    for(let i=0;i<9;i++){
        document.getElementById(i).textContent = "";
        gridBox[i] = "";
    }

    totalInsert = 0;
    winnerDecided = false;
    stat.textContent = "Player X's turn";
})
