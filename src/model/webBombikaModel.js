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

  //calculating mines
  for (let rowLoop = 0; rowLoop < row; rowLoop++) {
    for (let columnLoop = 0; columnLoop < column; columnLoop++) {
      if (board[rowLoop][columnLoop].value === "x") {
        continue;
      }
      //gore
      if (rowLoop > 0 && board[rowLoop - 1][columnLoop].value === "x") {
        board[rowLoop][columnLoop].value++;
      }

      //gore desno
      if (
        rowLoop > 0 &&
        columnLoop < column - 1 &&
        board[rowLoop - 1][columnLoop + 1].value === "x"
      ) {
        board[rowLoop][columnLoop].value++;
      }

      //desno
      if (
        columnLoop < column - 1 &&
        board[rowLoop][columnLoop + 1].value === "x"
      ) {
        board[rowLoop][columnLoop].value++;
      }

      //desno dole
      if (
        columnLoop < column - 1 &&
        rowLoop < row - 1 &&
        board[rowLoop + 1][columnLoop + 1] === "x"
      ) {
        board[rowLoop][columnLoop].value++;
      }

      //dole
      if (rowLoop < row - 1 && board[rowLoop + 1][columnLoop].value === "x") {
        board[rowLoop][columnLoop].value++;
      }

      //dole levo
      if (
        rowLoop < row - 1 &&
        columnLoop > 0 &&
        board[rowLoop + 1][columnLoop - 1].value === "x"
      ) {
        board[rowLoop][columnLoop].value++;
      }

      //levo
      if (columnLoop > 0 && board[rowLoop][columnLoop - 1].value === "x") {
        board[rowLoop][columnLoop].value++;
      }

      //gore levo
      if (
        columnLoop > 0 &&
        rowLoop > 0 &&
        board[rowLoop - 1][columnLoop - 1].value === "x"
      ) {
        board[rowLoop][columnLoop].value++;
      }
    }
  }

  console.log(board);
  console.log(mineLocation);
};

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
