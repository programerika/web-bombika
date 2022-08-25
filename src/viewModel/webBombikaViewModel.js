import WebBombikaModel from "@/model/webBombikaModel";
// import picClosed from "@/assets/grey-icon-0.png";
// import someOtherPic from "@/assets/orangeHelp.png";

export class WebBombikaViewModel {
  constructor(randomProvider) {
    this.webBombikaModel = new WebBombikaModel(randomProvider);
  }

  #getModelState = () => {};

  #getViewState = () => {};

  // board = (r, c) => {
  //   return this.webBombikaModel.gameState.minefield[r][c];
  // };

  newGame = () => {
    const playerGameState = this.webBombikaModel.newGame();
    // const board = playerGameState.minefield;
    // return { playerGameState, board };
    return playerGameState;
  };

  openField = (x, y) => {
    if (this.webBombikaModel.canFieldBeOpened(x, y)) {
      let playerGameState = this.webBombikaModel.openField(x, y);
      //this.#iconsForView(playerGameState);
      return playerGameState;
    }
  };

  toggleFlag = (x, y) => {
    if (this.webBombikaModel.canFieldBeFlagged(x, y)) {
      let playerGameState = this.webBombikaModel.toggleFlag(x, y);
      return playerGameState;
    }
  };

  // #iconsForView = (playerGameState) => {
  //   for (let i = 0; i < playerGameState.rows; i++) {
  //     for (let j = 0; j < playerGameState.cols; j++) {
  //       if (playerGameState.minefield[i][j].closed) {
  //         playerGameState.minefield[i][j] = picClosed;
  //       } else {
  //         playerGameState.minefield[i][j] = someOtherPic;
  //       }
  //     }
  //   }
  // };
}
