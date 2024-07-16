const board = document.getElementById('board');
const squares = document.getElementsByClassName('square');
const players = ['X', 'O'];
let currentPlayer = players[0];
const statusMessage = document.getElementById('statusMessage');
let gameActive = true; // Flag to track game status

const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', () => {
        if (!gameActive || squares[i].textContent !== '') {
            return;
        }
        squares[i].textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            statusMessage.textContent = `Game over! ${currentPlayer} wins!`;
            highlightWinningCombo(winning_combinations.find(combo => {
                const [a, b, c] = combo;
                return squares[a].textContent === currentPlayer &&
                    squares[b].textContent === currentPlayer &&
                    squares[c].textContent === currentPlayer;
            }));
            gameActive = false; // Set the game to inactive
            return;
        }
        if (checkTie()) {
            statusMessage.textContent = `Game is tied!`;
            gameActive = false; // Set the game to inactive
            return;
        }
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
        statusMessage.textContent = `Player ${currentPlayer}'s turn!`;
        if (currentPlayer === players[1]) {
            setTimeout(aiMove, 500);
        }
    });
}

function checkWin(currentPlayer) {
    for (let combo of winning_combinations) {
        const [a, b, c] = combo;
        if (squares[a].textContent === currentPlayer &&
            squares[b].textContent === currentPlayer &&
            squares[c].textContent === currentPlayer) {
            return true;
        }
    }
    return false;
}

function checkTie() {
    for (let square of squares) {
        if (square.textContent === '') {
            return false;
        }
    }
    return true;
}

document.getElementById('restartButton').addEventListener('click', restartGame);

function restartGame() {
    for (let square of squares) {
        square.textContent = "";
        square.style.backgroundColor = ''; // Remove background color
        square.style.color = ''; // Remove text color
    }
    statusMessage.textContent = `Player X's turn!`;
    currentPlayer = players[0];
    gameActive = true; // Reset the game status
}

function aiMove() {
    if (!gameActive) return; // Ensure AI moves only if the game is active
    let emptySquares = [];
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].textContent === '') {
            emptySquares.push(i);
        }
    }
    if (emptySquares.length === 0) {
        return;
    }
    let randomIndex = Math.floor(Math.random() * emptySquares.length);
    let aiSquare = emptySquares[randomIndex];
    squares[aiSquare].textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        statusMessage.textContent = `Game over! ${currentPlayer} wins!`;
        highlightWinningCombo(winning_combinations.find(combo => {
            const [a, b, c] = combo;
            return squares[a].textContent === currentPlayer &&
                squares[b].textContent === currentPlayer &&
                squares[c].textContent === currentPlayer;
        }));
        gameActive = false; // Set the game to inactive
        return;
    }
    if (checkTie()) {
        statusMessage.textContent = `Game is tied!`;
        gameActive = false; // Set the game to inactive
        return;
    }
    currentPlayer = players[0];
    statusMessage.textContent = `Player X's turn!`;
}

function highlightWinningCombo(combo) {
    for (let index of combo) {
        squares[index].style.backgroundColor = '#2A2A28';
        squares[index].style.color = 'white';
    }
}

function goHome() {
    window.location.href = 'index.html'; // Adjust the URL as needed
}
