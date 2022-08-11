import GameFieldStep from "./GameFieldStep";
import GameState from "./gameState";
import PlayerGameState from "./PlayerGameState";

export default class WebBombikaModel {
  constructor(randomProvider) {
    this.gameState = new GameState();
    this.playerGameState = new PlayerGameState();
    this.randomProvider = randomProvider;
  }

  #createBoard = () => {
    let board = [];
    for (let x = 0; x < this.gameState.rows; x++) {
      let subcolumn = [];
      for (let y = 0; y < this.gameState.cols; y++) {
        subcolumn.push(new GameFieldStep());
      }
      board.push(subcolumn);
      this.gameState.minefield = board;
    }
  };

  #populateWithBombs = () => {
    let bombCount = 0;

    while (bombCount < this.gameState.numberOfBombs) {
      let koordinate = this.randomProvider.nextCoordinates(
        this.gameState.cols - 1,
        this.gameState.rows - 1
      );

      let x = koordinate.x;
      let y = koordinate.y;

      if (this.gameState.minefield[x][y].bomb == false) {
        this.gameState.minefield[x][y].bomb = true;
        bombCount++;
      }
    }
  };

  #sorroundingFields = (board, x, y) => {
    let cellsAroundField = [];
    //1 gore
    x > 0 && cellsAroundField.push(board[x - 1][y]);
    //2 gore desno
    x > 0 &&
      y < board[0].length - 1 &&
      cellsAroundField.push(board[x - 1][y + 1]);
    //3 desno
    y < board[0].length - 1 && cellsAroundField.push(board[x][y + 1]);
    //4 desno dole
    x < board.length - 1 &&
      y < board[0].length - 1 &&
      cellsAroundField.push(board[x + 1][y + 1]);
    //5 dole
    x < board.length - 1 && cellsAroundField.push(board[x + 1][y]);
    //6 dole levo
    x < board.length - 1 && y > 0 && cellsAroundField.push(board[x + 1][y - 1]);
    //7 levo
    y > 0 && cellsAroundField.push(board[x][y - 1]);
    //8 gore levo
    x > 0 && y > 0 && cellsAroundField.push(board[x - 1][y - 1]);
    return cellsAroundField;
  };

  #countNeighbourBombs = (rowLoop, columnLoop) => {
    let numberOfBombs = 0;
    let sorraundFields = this.#sorroundingFields(
      this.gameState.minefield,
      rowLoop,
      columnLoop
    );

    for (let i = 0; i < sorraundFields.length; i++) {
      if (sorraundFields[i].bomb == true) {
        numberOfBombs++;
      }
    }
    return numberOfBombs;
  };

  #gameEndUnsuccessful = () => {
    this.#openAllCells();
  };

  // #calculatePoints = () => {
  //   this.gameState.score - 5;
  // };

  #gameEndSuccessfully = () => {
    this.gameState.score = 100;
    let startTime = this.gameState.startTime;
    this.gameState.isFinished = true;
    let endTime = Date.now();
    let seconds = (endTime - startTime) / 1000;

    console.log("Trajanje igre:", seconds, "sec");

    if (seconds > 180) {
      this.gameState.score = 1;
    } else {
      for (let i = 0; i <= seconds; i += 10) {
        this.gameState.score -= 5;
      }
    }
    console.log("Osvojeno:", this.gameState.score, "poen/a");

    //setInterval(this.#calculatePoints, 10000);

    // if (seconds > 180) {
    //   this.gameState.score = 1;
    // }
    //this.gameState.isFinished = true;
    this.#setPlayerGameState(this.gameState);
    console.log(this.playerGameState);
    console.log(this.gameState);
  };

  #checkIfAllFieldsAreOpen = () => {
    let brojac = 0;
    for (let i = 0; i < this.gameState.rows; i++) {
      for (let j = 0; j < this.gameState.cols; j++) {
        if (
          this.gameState.minefield[i][j].bomb != true &&
          this.gameState.minefield[i][j].closed == false
        ) {
          brojac++;
        }
      }
    }
    if (brojac == 90) {
      return true;
    } else {
      return false;
    }
  };

  #calculateNeighborBombs = () => {
    for (let rowLoop = 0; rowLoop < this.gameState.rows; rowLoop++) {
      for (let columnLoop = 0; columnLoop < this.gameState.cols; columnLoop++) {
        if (this.gameState.minefield[rowLoop][columnLoop].bomb == true) {
          continue;
        }
        this.gameState.minefield[rowLoop][columnLoop].bombAroundCount =
          this.#countNeighbourBombs(rowLoop, columnLoop);
      }
    }
  };

  #setPlayerGameStateMinefield = (gameMinefield) => {
    let newMinefield = [];
    gameMinefield.forEach((row) => {
      let minefieldCols = [];
      row.forEach((col) => {
        let newStepForPlayer = {
          flag: col.flag,
          closed: col.closed,
        };
        if (!col.closed)
          newStepForPlayer.bombsAroundCount = col.bombAroundCount;
        minefieldCols.push(newStepForPlayer);
      });
      newMinefield.push(minefieldCols);
    });
    return newMinefield;
  };

  #setPlayerGameState = (gameState) => {
    this.playerGameState.numberOfBombs = gameState.numberOfBombs;
    this.playerGameState.isFinished = gameState.isFinished;
    this.playerGameState.score = gameState.score;
    this.playerGameState.startTime = gameState.startTime;
    this.playerGameState.minefield = this.#setPlayerGameStateMinefield(
      gameState.minefield
    );
    //console.log("Player game state: ", this.playerGameState.minefield);
    //console.log("game state: ", this.gameState.minefield);
  };

  #prepareGame = () => {
    this.gameState.isFinished = false;
    this.gameState.startTime = Date.now();
  };

  newGame = () => {
    this.#prepareGame();
    this.#createBoard();
    this.#populateWithBombs();
    this.#calculateNeighborBombs();
    this.#setPlayerGameState(this.gameState);
    return this.playerGameState;
  };

  #openAllCells = () => {
    for (let i = 0; i < this.gameState.rows; i++) {
      for (let j = 0; j < this.gameState.cols; j++) {
        if (this.gameState.minefield[i][j].flag == true) {
          this.gameState.minefield[i][j].closed = true;
        } else {
          this.gameState.minefield[i][j].closed = false;
        }
      }
    }
  };

  #processFieldWithBombsAround = (x, y) => {
    //na 10 sekundi 5 poena
    this.gameState.minefield[x][y].closed = false;
  };

  #processFieldWithBomb = () => {
    this.gameState.isFinished = true;
    this.#gameEndUnsuccessful();
  };

  addFlag = (x, y) => {
    if (this.gameState.minefield[x][y].flag) {
      throw "Vec ima zastavica";
    }
    if (!this.gameState.minefield[x][y].closed) {
      throw "Polje je otvoreno!";
    }
    this.gameState.minefield[x][y].flag = true;
    this.gameState.numberOfBombs--;
    this.#setPlayerGameState(this.gameState);
    console.log("Dodata zastavica na ", x, y);
    return this.playerGameState;
  };

  removeFlag = (x, y) => {
    if (!this.gameState.minefield[x][y].closed) {
      throw "Polje je otvoreno!";
    }
    if (!this.gameState.minefield[x][y].flag) {
      throw "Polje nema zastavicu";
    }
    this.gameState.minefield[x][y].flag = false;
    this.gameState.numberOfBombs++;
    this.#setPlayerGameState(this.gameState);
    console.log("Sklonjena zastavica sa ", x, y);
    return this.playerGameState;
  };

  #checkFieldsAroundEmptyCell = (board, x, y) => {
    x > 0 &&
      board[x - 1][y].closed &&
      !board[x - 1][y].flag &&
      this.openField(x - 1, y);

    x > 0 &&
      y < board[0].length - 1 &&
      board[x - 1][y + 1].closed &&
      !board[x - 1][y + 1].flag &&
      this.openField(x - 1, y + 1);

    y < board[0].length - 1 &&
      board[x][y + 1].closed &&
      !board[x][y + 1].flag &&
      this.openField(x, y + 1);

    x < board.length - 1 &&
      y < board[0].length - 1 &&
      board[x + 1][y + 1].closed &&
      !board[x + 1][y + 1].flag &&
      this.openField(x + 1, y + 1);

    x < board.length - 1 &&
      board[x + 1][y].closed &&
      !board[x + 1][y].flag &&
      this.openField(x + 1, y);

    x < board.length - 1 &&
      y > 0 &&
      board[x + 1][y - 1].closed &&
      !board[x + 1][y - 1].flag &&
      this.openField(x + 1, y - 1);

    y > 0 &&
      board[x][y - 1].closed &&
      !board[x][y - 1].flag &&
      this.openField(x, y - 1);

    y > 0 &&
      x > 0 &&
      board[x - 1][y - 1].closed &&
      !board[x - 1][y - 1].flag &&
      this.openField(x - 1, y - 1);
  };

  #processFieldwithoutBombsAround = (x, y) => {
    if (!this.gameState.minefield[x][y].closed) {
      this.#checkFieldsAroundEmptyCell(this.gameState.minefield, x, y);
    } else {
      this.gameState.minefield[x][y].closed = false;
      this.#checkFieldsAroundEmptyCell(this.gameState.minefield, x, y);
    }
  };

  openField = (x, y) => {
    if (this.gameState.minefield[x][y].flag) {
      throw "Polje ima zastavicu";
    }
    if (this.gameState.minefield[x][y].closed == false) {
      throw "Polje je vec otvoreno!";
    }

    if (this.gameState.minefield[x][y].bomb == true) {
      console.log("BOMBAAA");
      this.#processFieldWithBomb();
    } else if (this.gameState.minefield[x][y].bombAroundCount > 0) {
      this.#processFieldWithBombsAround(x, y);
    } else if (this.gameState.minefield[x][y].bombAroundCount == 0) {
      this.#processFieldwithoutBombsAround(x, y);
    }

    if (this.#checkIfAllFieldsAreOpen() && !this.gameState.isFinished) {
      this.#gameEndSuccessfully();
    }

    this.#setPlayerGameState(this.gameState);
    return this.playerGameState;
  };
}
