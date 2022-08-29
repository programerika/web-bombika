import WebBombikaModel from "@/model/webBombikaModel";

export class WebBombikaViewModel {
  constructor(randomProvider) {
    this.webBombikaModel = new WebBombikaModel(randomProvider);
  }

  #getModelState = () => {};

  #getViewState = () => {};

  newGame = () => {
    const playerGameState = this.webBombikaModel.newGame();
    return this.#prepareViewModelPlayerState(playerGameState);
  };

  openField = (x, y) => {
    if (this.webBombikaModel.canFieldBeOpened(x, y)) {
      let playerGameState = this.webBombikaModel.openField(x, y);
      //this.#iconsForView(playerGameState);
      return this.#prepareViewModelPlayerState(playerGameState);
    }
  };

  toggleFlag = (x, y) => {
    if (this.webBombikaModel.canFieldBeFlagged(x, y)) {
      let playerGameState = this.webBombikaModel.toggleFlag(x, y);
      return this.#prepareViewModelPlayerState(playerGameState);
    }
  };

  // iconsForView = (viewModel) => {};

  #prepareViewModelPlayerMinefield = (minefield, isFinished) => {
    let newViewModelMinefield = [];
    minefield.forEach((row) => {
      let minefieldCols = [];
      row.forEach((col) => {
        let newStepForPlayer = {
          x: col.x,
          y: col.y,
        };
        if (col.closed) {
          if (col.flag) {
            newStepForPlayer.image = "flag.png";
          } else {
            //newStepForPlayer.closed = col.closed;
            newStepForPlayer.image = "closedCell.png";
          }
        }
        if (col.closed == false && col.bombsAroundCount === 0) {
          //newStepForPlayer.emptyCell = col.bombAroundCount;
          newStepForPlayer.image = "openCell.png";
          console.log(col.bombsAroundCount);
        } else if (!col.closed && col.bombsAroundCount === 1) {
          newStepForPlayer.image = "cell1.png";
          console.log(col.bombsAroundCount);
        } else if (!col.closed && col.bombsAroundCount === 2) {
          newStepForPlayer.image = "cell2.png";
          console.log(col.bombsAroundCount);
        } else if (!col.closed && col.bombsAroundCount === 3) {
          newStepForPlayer.image = "cell3.png";
        } else if (!col.closed && col.bombsAroundCount === 4) {
          newStepForPlayer.image = "cell4..png";
        } else if (!col.closed && col.bombsAroundCount === 5) {
          newStepForPlayer.image = "cell5.png";
        } else if (!col.closed && col.bombsAroundCount === 6) {
          newStepForPlayer.image = "cell6.png";
        } else if (!col.closed && col.bombsAroundCount === 7) {
          newStepForPlayer.image = "cell7.png";
        } else if (!col.closed && col.bombsAroundCount === 8) {
          newStepForPlayer.image = "cell8.png";
        }

        if (isFinished) {
          if (col.bomb && col.triggeredBomb) {
            newStepForPlayer.image = "triggeredbomba.jpg";
          }
          if (col.bomb && !col.triggeredBomb) {
            newStepForPlayer.image = "bomba.jpg";
          }
        }

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
