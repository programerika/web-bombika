import RandomProvider from "../model/RandomProvider";

// import TestRandomProvider from "../model/TestRandomProvider";
import WebBombikaModel from "../model/webBombikaModel";

export class WebBombikaViewModel {
  constructor() {
    this.webBombikaModel = new WebBombikaModel(new RandomProvider());
    // this.#store = store;
  }

  // #getViewState = () => {
  //   this.#store.state.view;
  // };

  // #dispatchViewUpdate = (newViewState) => {
  //   this.#store.dispatch("updateView", newViewState);
  // };

  //Function that starts the game
  newGame = () => {
    const playerGameState = this.webBombikaModel.newGame();
    return this.#prepareViewModelPlayerState(playerGameState);
  };

  //Function that opens a field when the field is clicked
  openField = (x, y, playerState) => {
    if (this.webBombikaModel.canFieldBeOpened(x, y)) {
      playerState = this.webBombikaModel.openField(x, y);
      return this.#prepareViewModelPlayerState(playerState);
    }
    return playerState;
  };

  //Function that toggles the flag state of a cell when it is right clicked
  toggleFlag = (x, y, playerState) => {
    if (this.webBombikaModel.canFieldBeFlagged(x, y)) {
      let playerState = this.webBombikaModel.toggleFlag(x, y);
      return this.#prepareViewModelPlayerState(playerState);
    }
    return playerState;
  };

  //Function that determines the image for the cell based on it's properties
  #prepareCellViewModel = (col, newStepForPlayer, isFinished) => {
    if (col.closed) {
      if (col.flag) {
        newStepForPlayer.image = "flag.png";
      } else {
        newStepForPlayer.image = "closedCell.png";
      }
    }

    //case - open cell with bombs arround count - select icon with number
    if (!col.closed) {
      newStepForPlayer.image = `cell${col.bombsAroundCount}.png`;
    }

    if (isFinished) {
      if (!col.flag && col.bomb && col.triggeredBomb) {
        newStepForPlayer.image = "triggeredbomb.png";
      }
      if (!col.flag && col.bomb && !col.triggeredBomb) {
        newStepForPlayer.image = "bomb.png";
      }
    }
  };

  //Function that prepares the playerminefield view model
  #prepareViewModelPlayerMinefield = (minefield, isFinished) => {
    let newViewModelMinefield = [];
    minefield.forEach((row) => {
      let minefieldCols = [];
      row.forEach((col) => {
        let newStepForPlayer = {
          x: col.x,
          y: col.y,
        };
        this.#prepareCellViewModel(col, newStepForPlayer, isFinished);

        minefieldCols.push(newStepForPlayer);
      });
      newViewModelMinefield.push(minefieldCols);
    });
    return newViewModelMinefield;
  };

  //Function that prepares the player state
  #prepareViewModelPlayerState = (state) => {
    const playerViewModelState = {
      cols: state.cols,
      rows: state.rows,
      numberOfBombs: state.numberOfBombs,
      numberOfFlags: state.numberOfFlags,
      isFinished: state.isFinished,
      score: state.score,
      startTime: state.startTime,
      minefield: this.#prepareViewModelPlayerMinefield(
        state.minefield,
        state.isFinished
      ),
    };
    return playerViewModelState;
  };
}
