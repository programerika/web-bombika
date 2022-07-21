import GameFieldStep from "./GameFieldStep";
import GameState from "./gameState";
import PlayerGameState from "./PlayerGameState";

export default class WebBombikaModel {
  constructor(randomProvider) {
    this.playerGameState = new PlayerGameState();
    this.gameState = new GameState();
    this.randomProvider = randomProvider;
  }

  #createBoard = () => {
    for (let x = 0; x < this.gameState.row; x++) {
      let subcolumn = [];
      for (let y = 0; y < this.gameState.col; y++) {
        subcolumn.push(new GameFieldStep());
      }
      this.gameState.minefield.push(subcolumn);
    }
  };

  //zakucana vrednost (0,9) - ispravljeno, ali se i RandomProvider promenio
  #populateWithBombs = () => {
    let bombCount = 0;
    // let mineLocation = [];

    while (bombCount < this.gameState.numberOfBombs) {
      let koordinate = this.randomProvider.nextCoordinates(
        this.gameState.col - 1,
        this.gameState.row - 1
      );

      let x = koordinate.x;
      let y = koordinate.y;

      if (this.gameState.minefield[x][y].bomb == false) {
        this.gameState.minefield[x][y].bomb = true;
        // this.mineLocation.push(this.gameState.minefield[x][y]);
        bombCount++;
        console.log("Bomba je na: " + x + "," + y);
        console.log(this.gameState.minefield[x][y]);
      }
    }
  };
  //throw exception kad je vec otvoreno- ali u prvi if (!= true)- ispravljeno
  openField = (x, y) => {
    console.log(this.gameState.minefield[x][y]);
    if (this.gameState.minefield[x][y].closed == false) {
      throw "Polje je vec otvoreno!";
    }

    if (this.gameState.minefield[x][y].closed == true) {
      if (this.gameState.minefield[x][y].bomb) {
        this.#gameFinished();
      } else if (this.gameState.minefield[x][y].bombAroundCount > 0) {
        this.gameState.minefield[x][y].closed = false;
      }
    }
    // else {
    //   return "Celija je vec otvorena";
    // }
  };

  #gameFinished = () => {
    this.playerGameState.isFinished = true;
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

  #calculateNeighborBombs = () => {
    for (let rowLoop = 0; rowLoop < this.gameState.row; rowLoop++) {
      for (let columnLoop = 0; columnLoop < this.gameState.col; columnLoop++) {
        if (this.gameState.minefield[rowLoop][columnLoop].bomb == true) {
          continue;
        }

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

        this.gameState.minefield[rowLoop][columnLoop].bombAroundCount =
          numberOfBombs;
        if (numberOfBombs > 0)
          console.log(
            "polje (" + rowLoop + ", " + columnLoop + "," + numberOfBombs
          );
      }
    }
  };

  createBoard = () => {
    this.#createBoard();
  };

  #setPlayerGameState = () => {};

  newGame = () => {
    this.#createBoard();
    this.#populateWithBombs();
    this.#calculateNeighborBombs();
    //this.openField(5, 4);
    //this.openField(5, 4);
    //pozovem metodu setPlayerGame
    return new PlayerGameState();
  };
}
