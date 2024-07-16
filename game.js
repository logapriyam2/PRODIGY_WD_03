const squares = document.querySelectorAll('.square');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');

const players = ['X', 'O'];
let currentPlayer = players[0];
let gameActive = true;
let moves = 0;

// Winning combinations
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

// Initialize event listeners for each square
squares.forEach((square, index) => {
    square.addEventListener('click', () => {
        if (!gameActive || square.textContent !== '') {
            return;
        }

        square.textContent = currentPlayer;
        moves++;

        if (checkWin(currentPlayer)) {
            statusMessage.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (moves === squares.length) {
            statusMessage.textContent = `Game is tied!`;
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
        statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    });
});

// Function to check if a player has won
function checkWin(currentPlayer) {
    for (let combo of winning_combinations) {
        let [a, b, c] = combo;
        if (
            squares[a].textContent === currentPlayer &&
            squares[b].textContent === currentPlayer &&
            squares[c].textContent === currentPlayer
        ) {
            highlightWinningCombo(combo);
            disableBoard(); // Disable further moves
            return true;
        }
    }
    return false;
}

// Highlight the winning combination
function highlightWinningCombo(combo) {
    for (let index of combo) {
        squares[index].style.backgroundColor = '#2A2A28';
        squares[index].style.color = 'white';
    }
}

// Function to disable further moves on the board
function disableBoard() {
    gameActive = false;
    squares.forEach(square => {
        square.removeEventListener('click', handleSquareClick);
    });
}

// Event listener for the restart button
restartButton.addEventListener('click', resetBoard);

// Function to reset the board
function resetBoard() {
    gameActive = true;
    moves = 0;
    currentPlayer = players[0];
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    squares.forEach(square => {
        square.textContent = '';
        square.style.backgroundColor = '#f0f0f0';
        square.style.color = 'black';
        square.addEventListener('click', handleSquareClick);
    });
}

// Function to handle square clicks
function handleSquareClick(event) {
    if (!gameActive || event.target.textContent !== '') {
        return;
    }

    event.target.textContent = currentPlayer;
    moves++;

    if (checkWin(currentPlayer)) {
        statusMessage.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (moves === squares.length) {
        statusMessage.textContent = `Game is tied!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
}
function goHome() {
    window.location.href = 'index.html';
}
