//import GameFieldStep from "./GameFieldStep";

export default class PlayerGameState {
  constructor() {
    this.numberOfBombs = 10;
    this.cols = 10;
    this.rows = 10;
    this.isFinished = false;
    this.score = 0;
    this.startTime = Date.now();
    // this.playerFieldStep = new GameFieldStep();
    // this.playerFieldStep.bombAroundCount = undefined;
    // this.playerFieldStep.bomb = undefined;
  }
}
