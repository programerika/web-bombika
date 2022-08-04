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
    for (let x = 0; x < this.gameState.row; x++) {
      let subcolumn = [];
      for (let y = 0; y < this.gameState.col; y++) {
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
        this.gameState.col - 1,
        this.gameState.row - 1
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
    x > 0 && cellsAroundField.push(board[y][x - 1]);
    //2 gore desno
    x > 0 && y < board.length - 1 && cellsAroundField.push(board[y + 1][x - 1]);
    //3 desno
    y < board.length - 1 && cellsAroundField.push(board[y + 1][x]);
    //4 desno dole
    y < board.length - 1 &&
      x < board[0].length - 1 &&
      cellsAroundField.push(board[y + 1][x + 1]);
    //5 dole
    x < board[0].length - 1 && cellsAroundField.push(board[y][x + 1]);
    //6 dole levo
    x < board[0].length - 1 &&
      y > 0 &&
      cellsAroundField.push(board[y - 1][x + 1]);
    //7 levo
    y > 0 && cellsAroundField.push(board[y - 1][x]);
    //8 gore levo
    x > 0 && y > 0 && cellsAroundField.push(board[y - 1][x - 1]);
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
    // this.playerGameState.isFinished = true;
  };

  #calculateNeighborBombs = () => {
    for (let rowLoop = 0; rowLoop < this.gameState.row; rowLoop++) {
      for (let columnLoop = 0; columnLoop < this.gameState.col; columnLoop++) {
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
    console.log("Player game state: ", this.playerGameState);
    console.log("game state: ", this.gameState.minefield);
  };

  newGame = () => {
    this.#createBoard();
    this.#populateWithBombs();
    this.#calculateNeighborBombs();
    this.#setPlayerGameState(this.gameState);
    return this.playerGameState;
  };

  #openAllCells = () => {
    for (let i = 0; i < this.gameState.row; i++) {
      for (let j = 0; j < this.gameState.col; j++) {
        if (this.gameState.minefield[i][j].flag == true) {
          this.gameState.minefield[i][j].closed = true;
        } else {
          this.gameState.minefield[i][j].closed = false;
        }
      }
    }
  };

  #processFieldWithBombsAround = (x, y) => {
    this.gameState.minefield[x][y].closed = false;
  };

  #processFieldWithBomb = () => {
    this.gameState.isFinished = true;
    this.#gameEndUnsuccessful();
  };

  #manipulateFlag = (x, y) => {
    if (this.gameState.minefield[x][y].flag == true) {
      this.gameState.minefield[x][y].flag = false;
      //Treba dodati povecavanje i smanjivanje brojaca zastavica
    } else {
      this.gameState.minefield[x][y].flag = true;
    }
  };
  addFlag = (x, y) => {
    this.#manipulateFlag(x, y);
    this.#setPlayerGameState(this.gameState);
    console.log("Dodata zastavica na ", x, y);
    return this.playerGameState;
  };

  removeFlag = (x, y) => {
    this.#manipulateFlag(x, y);
    this.#setPlayerGameState(this.gameState);
    console.log("Sklonjena zastavica sa ", x, y);
    return this.playerGameState;
  };

  openField = (x, y) => {
    if (this.gameState.minefield[x][y].closed == false) {
      throw "Polje je vec otvoreno!";
    }

    if (this.gameState.minefield[x][y].bomb == true) {
      console.log("BOMBAAA");
      this.#processFieldWithBomb();
    } else if (this.gameState.minefield[x][y].bombAroundCount > 0) {
      this.#processFieldWithBombsAround(x, y);
    }

    this.#setPlayerGameState(this.gameState);
    return this.playerGameState;
  };
}
