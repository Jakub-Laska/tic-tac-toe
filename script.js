let turn = 0;

const winCombinations = [
    [0, 1 ,2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6] 
]


const cells = document.querySelectorAll('.cell');

// hover
cells.forEach(cell => {
  cell.addEventListener('mouseenter', () => {
    if (cell.classList.contains('x-mark') || cell.classList.contains('o-mark')) {
      return;
    }

    if (turn === 0) {
      cell.classList.remove('o-hover');
      cell.classList.add('x-hover');
      cell.style.setProperty('--x-hover', playerOneColor);
    } else {
      cell.classList.remove('x-hover');
      cell.classList.add('o-hover');
      cell.style.setProperty('--o-hover', playerTwoColor);
    }
  });
});


// click
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (cell.classList.contains('x-mark') || cell.classList.contains('o-mark')) {
      return;
    }

    if (turn === 0) {
      cell.classList.remove('x-hover');
      cell.classList.add('x-mark', 'notAllowed');
      cell.style.setProperty('--x-color', playerOneColor);
      turn = 1;
    } else {
      cell.classList.remove('o-hover');
      cell.classList.add('o-mark', 'notAllowed');
      cell.style.setProperty('--o-color', playerTwoColor);
      turn = 0;
    }

    checkWin();
  });
});

function checkWin() {
      for (let player of ['x', 'o']) {
    for (let [a, b, c] of winCombinations) {
      if (
        cells[a].classList.contains(`${player}-mark`) &&
        cells[b].classList.contains(`${player}-mark`) &&
        cells[c].classList.contains(`${player}-mark`)
      ) {
        winMessage(player);
        return player;
      }
    }
  }

  // Check for draw
  const isDraw = [...cells].every(cell =>
    cell.classList.contains('x-mark') || cell.classList.contains('o-mark')
  );

  if (isDraw) {
    drawMessage();
    return true;
  }

  return false;
}

// post game

const modal = document.querySelector('.post-modal');
const postGameMessage = document.getElementById('win-message');

function winMessage(player) {
        modal.classList.toggle('hidden');

        if (player == 'x') {
        postGameMessage.textContent = `${playerOneName} wins!`;
        postGameMessage.style.color = playerOneColor;
        const playerOneWins = document.getElementById('playerOneStatsWins');
        let currentWins = parseInt(playerOneWins.textContent) || 0;
        playerOneWins.textContent = currentWins + 1;
        } else {
        postGameMessage.textContent = `${playerTwoName} wins!`;
        postGameMessage.style.color = playerTwoColor;
        const playerTwoWins = document.getElementById('playerTwoStatsWins');
        let currentWins = parseInt(playerTwoWins.textContent) || 0;
        playerTwoWins.textContent = currentWins + 1;
        }
}

function drawMessage() {
        modal.classList.toggle('hidden');
        postGameMessage.textContent = 'It is a draw!';
        postGameMessage.style.color = '#fff';
}

const restartBtn = document.getElementById('restart-btn');
restartBtn.addEventListener('click', () => {
    modal.classList.toggle('hidden');
    cells.forEach(cell => {
        cell.classList.remove('x-hover', 'o-hover', 'x-mark', 'o-mark', 'notAllowed');
    })

    turn = 0;
})

const menuBtn = document.getElementById('menu-btn');
menuBtn.addEventListener('click', () => {
    modal.classList.toggle('hidden');
    preModal.classList.toggle('hidden');
    playerOneMenu.classList.toggle('menu-overlay');
    playerTwoMenu.classList.toggle('menu-overlay');
        cells.forEach(cell => {
        cell.classList.remove('x-hover', 'o-hover', 'x-mark', 'o-mark', 'notAllowed');
    })
        const playerOneWins = document.getElementById('playerOneStatsWins');
        playerOneWins.textContent = 0;
        const playerTwoWins = document.getElementById('playerTwoStatsWins');
        playerTwoWins.textContent = 0;


    turn = 0;
})

//pre game 
const playerOneReady = document.getElementById('player-one-ready');
const playerOneMenu = document.getElementById('player-one-menu');
const playerTwoMenu = document.getElementById('player-two-menu');
playerOneReady.addEventListener('click', () => {

    playerOneMenu.classList.toggle('menu-overlay');
    playerTwoMenu.classList.toggle('menu-overlay');

})

const backBtn = document.getElementById('back');

backBtn.addEventListener('click', () => {
    playerOneMenu.classList.toggle('menu-overlay');
    playerTwoMenu.classList.toggle('menu-overlay');
})

const startBtn = document.getElementById('start-btn');


let playerOneColor = '#000000';
let playerTwoColor = '#000000';
let playerOneName = 'Player X';
let playerTwoName = 'Player O';


    const preModal = document.querySelector('.pre-modal');

startBtn.addEventListener('click', () => {
    const playerOneNameInput = document.getElementById('player-one-name');
    if (playerOneNameInput.value.trim() !== '') {
        playerOneName = playerOneNameInput.value;
    }
    const playerOneColorInput = document.getElementById('player-one-color');
    playerOneColor = playerOneColorInput.value;

    const playerTwoNameInput = document.getElementById('player-two-name');
    if (playerTwoNameInput.value.trim() !== '') {
        playerTwoName = playerTwoNameInput.value;
    }
    const playerTwoColorInput = document.getElementById('player-two-color');
    playerTwoColor = playerTwoColorInput.value;

    const playerOneStatsName = document.getElementById('playerOneStatsName');

    playerOneStatsName.textContent = `Player: ${playerOneName}`;
    playerOneStatsName.style.color = playerOneColor;

    const playerTwoStatsName = document.getElementById('playerTwoStatsName');

    playerTwoStatsName.textContent = `Player: ${playerTwoName}`;
    playerTwoStatsName.style.color = playerTwoColor;


    preModal.classList.add('hidden');
})

