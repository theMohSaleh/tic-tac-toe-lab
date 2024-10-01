/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    // row combos
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // column combos
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal combos
    [0, 4, 8],
    [2, 4, 6],
]

/*---------------------------- Variables (state) ----------------------------*/

let board = [];
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const boardEl = document.querySelector(".board");
const resetBtnEl = document.querySelector("#reset");

/*-------------------------------- Functions --------------------------------*/

function init() {
    board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ]
    turn = 'X';
    winner = false;
    tie = false;
    render();
}

init(); // call init when app loads

function render() {
    updateBoard();
    updateMessage();
}

function updateBoard() {
    board.forEach((val, index) => {
        squareEls[index].textContent = val;
    })
}

function updateMessage() {
    let msg;

    if (!winner && !tie) {
        msg = `It's currently ${turn} turn!`;
    } else if (tie) {
        msg = `The game has ended in a tie.`;
    } else {
        msg = `${turn} Wins!
        Game Over.`;
    }

    messageEl.textContent = msg;
}

const handleClick = (event) => {
    // variables
    const squareIndex = event.target.id
    // check if user clicks on a square
    if (squareIndex >= 0 && squareIndex <= 8) {

        // exist if square is taken or if the game is already over
        if (!board[squareIndex] && !winner) {
            placePiece(squareIndex);
            checkForWinnder();
            checkForTie();
            switchPlayerTurn();
            render();
        } else {
            render();
            return;
        }
    } else {
        return;
    }
}

function placePiece(index) {
    board[index] = turn;
}

function checkForWinnder() {
    winningCombos.forEach((combo) => {
        const comIdx0 = combo[0];
        const comIdx1 = combo[1];
        const comIdx2 = combo[2];

        if (board[comIdx0] && board[comIdx0] === board[comIdx1] && board[comIdx0] === board[comIdx2]) {
            winner = true;
            return;
        }
    })
}

function checkForTie() {
    let count = 0;
    board.forEach((sqr) => {
        if (sqr === "X" || sqr === "O") {
            count++;
        }
        if (count === 9) {
            tie = true;
        }
    })
}

function switchPlayerTurn() {
    if (!winner) {
        if (turn === 'X') {
            turn = 'O'
        } else {
            turn = 'X'
        }
    } else {

    }
}

/*----------------------------- Event Listeners -----------------------------*/

boardEl.addEventListener('click', handleClick);
resetBtnEl.addEventListener('click', init);