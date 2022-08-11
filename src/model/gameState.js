export default class GameState {
  constructor() {
    this.numberOfBombs = 10;
    this.cols = 10;
    this.rows = 10;
    this.isFinished = false;
    this.score = 0;
    this.minefield = [];
    this.startTime = Date.now();
  }
}
