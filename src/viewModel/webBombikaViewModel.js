import WebBombikaModel from "@/model/webBombikaModel";
import grey from "@/assets/grey-icon-0.png";

export class WebBombikaViewModel {
  constructor(randomProvider) {
    this.webBombikaModel = new WebBombikaModel(randomProvider);
  }

  #getModelState = () => {};

  #getViewState = () => {};

  newGame = () => {
    const playerGameState = this.webBombikaModel.newGame();
    this.#iconsForView(playerGameState);
    return playerGameState;
  };

  openField = (x, y) => {
    if (this.webBombikaModel.canFieldBeOpened(x, y)) {
      return this.webBombikaModel.openField(x, y);
    }
  };

  #iconsForView = (playerGameState) => {
    for (let i = 0; i < playerGameState.rows; i++) {
      for (let j = 0; j < playerGameState.cols; j++) {
        playerGameState.minefield[i][j] = grey;
      }
    }
  };
}
