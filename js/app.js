/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //vertical
    [0, 4, 8], [2, 4, 6]             //diagonal
];
const player1 = '🩷';
const player2 = '💙';

/*---------------------------- Variables (state) ----------------------------*/
let board;   //the state of the squares on the board
let turn;    //the current player's turn
let winner;  //represents if there is a winner or not
let tie;     //represents if there is a tie



/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
console.log(squareEls)
const messageEl = document.getElementById('message');
console.log(messageEl);
const resetBtnEl = document.getElementById('reset');

/*-------------------------------- Functions --------------------------------*/

function init() {
    board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    turn = player1;
    winner = false;
    tie = false;
    render();
}

function render() {
    updateBoard();
    updateMessage();
}

function updateBoard() {
    board.forEach(function(value, index) {
        squareEls[index].textContent = value;
    });
}

function updateMessage() {
    if (winner) {
        messageEl.textContent = `${turn} wins!`;
    } else if (tie) {
        messageEl.textContent = `It's a tie!`;
    } else {
        messageEl.textContent = `${turn}'s turn`;
    }
}

function handleClick(event) {
    console.log(event.target);
    const squareIndex = parseInt(event.target.id);
    if (board[squareIndex] || winner) return;   //immediately return if square is already taken
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    console.log(squareIndex);
    console.log("tie", tie);
    render();
}

function placePiece(squareIndex) {
    board[squareIndex] = turn;
    console.log(board);
    render();
    
}

function checkForWinner() {
    winningCombos.forEach(function (combo) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
            winner = true;
            console.log('winner');
        }
    });
    
}

function checkForTie() {
    if (winner) return;
    if (board.includes('')) return;
    tie = true;
}

function switchPlayerTurn() {
    if (winner || tie) return;  //if there is a winner or tie, do not switch player turn
    turn = turn === player1 ? player2 : player1;
}


/*----------------------------- Event Listeners -----------------------------*/

document.querySelector('.board').addEventListener('click', handleClick);
resetBtnEl.addEventListener('click', init);

/*--------------------------------- Initialize -------------------------------*/
init();



