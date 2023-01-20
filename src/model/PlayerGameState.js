export default class PlayerGameState {
  constructor() {
    this.numberOfBombs = undefined;
    this.numberOfFlags = undefined;
    this.cols = undefined;
    this.rows = undefined;
    this.isFinished = undefined;
    this.score = undefined;
    this.minefield = [];
    this.startTime = undefined;
  }
}
