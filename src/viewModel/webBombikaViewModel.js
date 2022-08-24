import WebBombikaModel from "@/model/webBombikaModel";
// import picClosed from "@/assets/grey-icon-0.png";
// import someOtherPic from "@/assets/orangeHelp.png";

export class WebBombikaViewModel {
  constructor(randomProvider) {
    this.webBombikaModel = new WebBombikaModel(randomProvider);
    this.player = this.webBombikaModel.newGame();
    this.board = this.player.minefield;
  }

  #getModelState = () => {};

  #getViewState = () => {};

  // board = (r, c) => {
  //   return this.webBombikaModel.gameState.minefield[r][c];
  // };

  newGame = () => {
    const playerGameState = this.webBombikaModel.newGame();
    return playerGameState;
  };

  openField = (x, y) => {
    if (this.webBombikaModel.canFieldBeOpened(x, y)) {
      let playerGameState = this.webBombikaModel.openField(x, y);
      this.player = playerGameState;
      this.board = playerGameState.minefield;
    }
  };

  toggleFlag = (x, y) => {
    if (this.webBombikaModel.canFieldBeFlagged(x, y)) {
      let playerGameState = this.webBombikaModel.toggleFlag(x, y);
      this.player = playerGameState;
      this.board = playerGameState.minefield;
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
