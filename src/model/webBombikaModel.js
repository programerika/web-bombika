import GameFieldStep from "./GameFieldStep";
import GameState from "./gameState";
import PlayerGameState from "./PlayerGameState";
// import RandomProvider from "./RandomProvider";

export default class WebBombikaModel {
  constructor(randomProvider) {
    this.PlayerGameState = new PlayerGameState();
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
    // console.log(this.gameState.minefield);
  };

  #populateWithBombs = () => {
    let bombCount = 0;
    // let mineLocation = [];

    while (bombCount < this.gameState.numberOfBombs) {
      let koordinate = this.randomProvider.nextCoordinates(0, 9);

      let x = koordinate.x;
      let y = koordinate.y;

      if (this.gameState.minefield[x][y].bomb == false) {
        this.gameState.minefield[x][y].bomb = true;
        // this.mineLocation.push(this.gameState.minefield[x][y]);
        bombCount++;
        console.log(this.gameState.minefield[x][y]);
      }
    }
  };

  openField = (x, y) => {
    if (this.gameState.minefield[x][y].closed == true) {
      if (this.gameState.minefield[x][y].bomb) {
        this.#gameFinished();
      } else if (this.gameState.minefield[x][y].bombAroundCount > 0) {
        this.gameState.minefield[x][y].closed = false;
      }
    } else {
      return "Celija je vec otvorena";
    }
  };

  #gameFinished = () => {
    this.PlayerGameState.isFinished = true;
  };
  #calculateNeighborBombs = () => {
    //calculating mines
    for (let rowLoop = 0; rowLoop < this.gameState.row; rowLoop++) {
      for (let columnLoop = 0; columnLoop < this.gameState.col; columnLoop++) {
        if (this.gameState.minefield[rowLoop][columnLoop].bomb == true) {
          continue;
        }
        //gore
        if (
          rowLoop > 0 &&
          this.gameState.minefield[rowLoop - 1][columnLoop].bomb == true
        ) {
          this.gameState.minefield[rowLoop][columnLoop].bombAroundCount++;
        }

        //gore desno
        if (
          rowLoop > 0 &&
          columnLoop < this.gameState.col - 1 &&
          this.gameState.minefield[rowLoop - 1][columnLoop + 1].bomb == true
        ) {
          this.gameState.minefield[rowLoop][columnLoop].bombAroundCount++;
        }

        //desno
        if (
          columnLoop < this.gameState.col - 1 &&
          this.gameState.minefield[rowLoop][columnLoop + 1].bomb == true
        ) {
          this.gameState.minefield[rowLoop][columnLoop].bombAroundCount++;
        }

        //desno dole
        if (
          columnLoop < this.gameState.col - 1 &&
          rowLoop < this.gameState.row - 1 &&
          this.gameState.minefield[rowLoop + 1][columnLoop + 1].bomb == true
        ) {
          this.gameState.minefield[rowLoop][columnLoop].bombAroundCount++;
        }

        //dole
        if (
          rowLoop < this.gameState.row - 1 &&
          this.gameState.minefield[rowLoop + 1][columnLoop].bomb == true
        ) {
          this.gameState.minefield[rowLoop][columnLoop].bombAroundCount++;
        }

        //dole levo
        if (
          rowLoop < this.gameState.row - 1 &&
          columnLoop > 0 &&
          this.gameState.minefield[rowLoop + 1][columnLoop - 1].bomb == true
        ) {
          this.gameState.minefield[rowLoop][columnLoop].bombAroundCount++;
        }

        //levo
        if (
          columnLoop > 0 &&
          this.gameState.minefield[rowLoop][columnLoop - 1].bomb == true
        ) {
          this.gameState.minefield[rowLoop][columnLoop].bombAroundCount++;
        }

        //gore levo
        if (
          columnLoop > 0 &&
          rowLoop > 0 &&
          this.gameState.minefield[rowLoop - 1][columnLoop - 1].bomb == true
        ) {
          this.gameState.minefield[rowLoop][columnLoop].bombAroundCount++;
        }
      }
    }
    console.log(this.gameState.minefield);
    console.log(this.gameState.startTime);
  };

  createBoard = () => {
    this.#createBoard();
  };

  createBoardWithBombs = () => {
    this.#createBoard();
    this.#populateWithBombs();
    this.#calculateNeighborBombs();
  };

  newGame = () => {
    this.#createBoard();
    this.#populateWithBombs();
    this.#calculateNeighborBombs();
    this.openField(4, 4);
    this.openField(4, 4);
    return new PlayerGameState();
  };
}

// addFlag(x, y) {}
// removeFlag(x, y) {}

//RandomProvider

// function getRandomNumberBetween(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }
