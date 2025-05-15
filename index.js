// Tic Tac Toe Game

const cells = Array.from(document.querySelectorAll('.cell'));
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.new-game');

let currentPlayer;
let gameState;
let isGameActive;
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
function initGame(){
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    newGameBtn.classList.remove('active');
    gameInfo.textContent = `Current Player - ${currentPlayer}`;
    isGameActive = true;
    cells.forEach( (cell) => {
        cell.classList.remove('win');
        cell.textContent = '';
    } )

}
initGame();

cells.forEach((cell,index)=>{
    cell.addEventListener('click',()=>{
        handleClick(cell, index);
    })
})

function handleClick(cell,index){
    if(gameState[index]!=='' || !isGameActive){
        return;
    }
    cell.textContent = currentPlayer;
    gameState[index] = currentPlayer;
    handleResultValidation();

}
function handleResultValidation(){
    let roundWon = false;
    for(let i =0;i<winningConditions.length;i++){
        const winCond = winningConditions[i];
        const a = gameState[winCond[0]];
        const b = gameState[winCond[1]];
        const c = gameState[winCond[2]];

        if(a==='' || b==='' || c===''){
            continue;
        }
        if(a===b && b===c){
            roundWon = true;
            winCond.forEach((index)=>{
                cells[index].classList.add('win');
            })
            break;
        }
        
    }
    if(roundWon){
            gameInfo.textContent = `Player ${currentPlayer} has won!`;
            newGameBtn.classList.add('active');
            isGameActive = false;
            return;
        }
    if(!gameState.includes('')){
        gameInfo.textContent = "It's a draw!";
        newGameBtn.classList.add('active');
        isGameActive = false;
        return;
    }
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    }
    else {
        currentPlayer = 'X';
    }
    gameInfo.textContent = `Current Player - ${currentPlayer}`;
}

newGameBtn.addEventListener('click',initGame);

