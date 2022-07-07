export default (row, column, numberOfBombs) => {
  let board = [];
  let mineLocation = [];

  for (let x = 0; x < row; x++) {
    let subcolumn = [];
    for (let y = 0; y < column; y++) {
      subcolumn.push({
        isFlagged: false,
        value: 0,
        isRevealed: false,
        x: x,
        y: y,
      });
    }
    board.push(subcolumn);
  }

  let bombCount = 0;

  while (bombCount < numberOfBombs) {
    let x = getRandomNumberBetween(0, row - 1);
    let y = getRandomNumberBetween(0, column - 1);

    if (board[x][y].value === 0) {
      board[x][y].value = "x";
      mineLocation.push(board[x][y]);
      bombCount++;
    }
  }

  console.log(board);
  console.log(mineLocation);
};

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
