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
    } else {
      cell.classList.remove('x-hover');
      cell.classList.add('o-hover');
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
        turn = 1;
    } else {
      cell.classList.remove('o-hover');
        cell.classList.add('o-mark', 'notAllowed');
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

const modal = document.querySelector('.modal');
const postGameMessage = document.getElementById('win-message');

function winMessage(player) {
        modal.classList.toggle('hidden');
        postGameMessage.textContent = `player: ${player.toUpperCase()} wins!`;
}

function drawMessage() {
        modal.classList.toggle('hidden');
        postGameMessage.textContent = 'It is a draw!';

}

const restartBtn = document.getElementById('restart-btn');
restartBtn.addEventListener('click', () => {
    modal.classList.toggle('hidden');
    cells.forEach(cell => {
        cell.classList.remove('x-hover', 'o-hover', 'x-mark', 'o-mark', 'notAllowed');
    })
    turn = 0;
})