// import RandomProvider from "../model/RandomProvider";

import TestRandomProvider from "../model/TestRandomProvider";
import WebBombikaModel from "../model/webBombikaModel";

export class WebBombikaViewModel {
  constructor() {
    this.webBombikaModel = new WebBombikaModel(new TestRandomProvider());
  }

  #getModelState = () => {};

  #getViewState = () => {};

  newGame = () => {
    const playerGameState = this.webBombikaModel.newGame();
    return this.#prepareViewModelPlayerState(playerGameState);
  };

  openField = (x, y, playerState) => {
    if (this.webBombikaModel.canFieldBeOpened(x, y)) {
      playerState = this.webBombikaModel.openField(x, y);
      return this.#prepareViewModelPlayerState(playerState);
    }
    return playerState;
  };

  toggleFlag = (x, y, playerState) => {
    if (this.webBombikaModel.canFieldBeFlagged(x, y)) {
      playerState = this.webBombikaModel.toggleFlag(x, y);
      return this.#prepareViewModelPlayerState(playerState);
    }
    return playerState;
  };

  #prepareCellViewModel = (col, newStepForPlayer, isFinished) => {
    if (col.closed) {
      if (col.flag) {
        newStepForPlayer.image = "flag.png";
      } else {
        newStepForPlayer.image = "closedCell.png";
      }
    }

    //case - open cell with bombs arround count - seelct icon with number
    if (!col.closed) {
      newStepForPlayer.image = `cell${col.bombsAroundCount}.png`;
    }

    if (isFinished) {
      if (!col.flag && col.bomb && col.triggeredBomb) {
        newStepForPlayer.image = "triggeredbomba.jpg";
      }
      if (!col.flag && col.bomb && !col.triggeredBomb) {
        newStepForPlayer.image = "bomba.jpg";
      }
    }
  };

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
    console.log("View model player: ", playerViewModelState);
    return playerViewModelState;
  };
}
