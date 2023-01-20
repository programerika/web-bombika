export default class GameFieldStep {
  constructor(x, y) {
    this.bomb = false;
    this.closed = true;
    this.flag = false;
    this.bombAroundCount = 0;
    this.triggeredBomb = false;
    this.x = x;
    this.y = y;
  }
}
