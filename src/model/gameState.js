export default class GameState {
  constructor() {
    this.numberOfBombs = 10;
    this.col = 10;
    this.row = 10;
    this.isFinished = false;
    this.score = 0;
    this.minefield = [];
    this.startTime = Date.now();
  }
}
