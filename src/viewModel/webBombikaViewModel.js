import WebBombikaModel from "@/model/webBombikaModel";

export class WebBombikaViewModel {
  constructor(randomProvider) {
    this.webBombikaModel = new WebBombikaModel(randomProvider);
  }

  #getModelState = () => {
    const game = this.webBombikaModel.gameState;
    return game;
  };

  #getViewState = () => {};

  newGame = () => {
    return this.webBombikaModel.newGame();
  };

  openField = (x, y) => {
    if (this.webBombikaModel.canFieldBeOpened(x, y)) {
      return this.webBombikaModel.openField(x, y);
    }
  };
}
