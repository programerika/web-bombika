export default class RandomProvider {
  nextCoordinates(rows, cols) {
    let x = Math.floor(Math.random() * (rows + 1));
    let y = Math.floor(Math.random() * (cols + 1));
    return { x, y };
  }
}
