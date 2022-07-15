export default class TestRandomProvider {
  constructor() {
    this.koordX = 0;
    this.koordY = 0;
  }
  nextCoordinates(rows, cols) {
    rows = 0;
    cols = 0;
    let x = this.koordX + rows;
    this.koordX++;
    let y = this.koordY + cols;
    this.koordY++;
    return { x, y };
  }
}
