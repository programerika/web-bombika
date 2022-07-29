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
      //console.log(row);
      let minefieldCols = [];
      row.forEach((col) => {
        let newStepForPlayer = {
          flag: col.flag,
          closed: col.closed,
        };
        minefieldCols.push(newStepForPlayer);
        //console.log(newStepForPlayer);
      });
      newMinefield.push(minefieldCols);
    });
    console.log("NewMinefield for PlayerGameState:", newMinefield);
    return newMinefield;
  };

  #setPlayerGameState = (gameState) => {
    this.playerGameState.numberOfBombs = gameState.numberOfBombs;
    this.playerGameState.isFinished = gameState.isFinished;
    this.playerGameState.score = gameState.score;
    this.playerGameState.startTime = gameState.startTime;
    //this.playerGameState.minefield = metodi koja prima gameState.minefield i filtrira ga
    this.playerGameState.minefield = this.#setPlayerGameStateMinefield(
      gameState.minefield
    );
    console.log(
      "setovan Playerstate.minefield",
      this.playerGameState.minefield
    );
    console.log("setovan gameState.minefield", gameState.minefield);
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
        this.gameState.minefield[i][j].closed = false;
      }
    }
  };

  openField = (x, y) => {
    if (this.gameState.minefield[x][y].closed == false) {
      throw "Polje je vec otvoreno!";
    }

    if (this.gameState.minefield[x][y].bomb == true) {
      this.gameState.isFinished = true;
      console.log("Bomb field [", x, y, "]");
      console.log("BOOOOOOOMBAAAAAAAAA <3 !?!?!?!?!?!?!??!");
      this.#openAllCells();
    } else if (this.gameState.minefield[x][y].bombAroundCount > 0) {
      console.log("otvoreno polje: [", x, y, "]");
      this.gameState.minefield[x][y].closed = false;
    }

    this.#setPlayerGameState(this.gameState);
    return this.playerGameState;
  };
}
