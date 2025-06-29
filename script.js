let turn = 0;

const cells = document.querySelectorAll('.cell');

// hover
cells.forEach(cell => {
  cell.addEventListener('mouseenter', () => {
    if (cell.classList.contains('black') || cell.classList.contains('purple')) {
      return;
    }

    if (turn === 0) {
      cell.classList.remove('o');
      cell.classList.add('x');
    } else {
      cell.classList.remove('x');
      cell.classList.add('o');
    }
  });
});


// click
cells.forEach(cell => {
  cell.addEventListener('click', () => {
        if (cell.classList.contains('black') || cell.classList.contains('purple')) {
      return;
    }


    if (turn === 0) {
        cell.classList.remove('x');
        cell.classList.add('black');
        cell.classList.add('notAllowed')
        turn = 1;
    } else {
      cell.classList.remove('o');
        cell.classList.add('purple');
        cell.classList.add('notAllowed')
        turn = 0;
    }
  });
});



