export default class GameFieldStep {
  constructor() {
    this.bomb = false;
    this.closed = true;
    this.flag = false;
    this.bombAroundCount = 0;
    this.triggeredBomb = false;
  }
}
