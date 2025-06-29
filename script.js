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

function winMessage(player) {
        const modal = document.getElementById('modal');
        modal.classList.toggle('hidden');
        alert(`player: ${player.toUpperCase()} wins!`);
}

function drawMessage() {
        const modal = document.getElementById('modal');
        modal.classList.toggle('hidden');
        alert('it is a draw');
}