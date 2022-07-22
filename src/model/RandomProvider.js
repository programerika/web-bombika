export default class RandomProvider {
  nextCoordinates(rows, cols) {
    let x = Math.floor(Math.random() * (rows - 0 + 1) + 0);
    let y = Math.floor(Math.random() * (cols - 0 + 1) + 0);
    return { x, y };
  }
}
