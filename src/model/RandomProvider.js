export default class RandomProvider {
  nextCoordinates(rows, cols) {
    let x = Math.floor(Math.random() * (rows - 0 + 1) + 0);
    let y = Math.floor(Math.random() * (cols - 0 + 1) + 0);
    return { x, y };
  }
}

// //Math.floor(Math.random() * (max - min + 1) + min);
// let x = this.#getRandomNumberBetween(0, rows - 1);
// let y = this.#getRandomNumberBetween(0, cols - 1);

/**
 *   nextCoordinates(min, max) {
    let x = Math.floor(Math.random() * (max - min + 1) + min);
    let y = Math.floor(Math.random() * (max - min + 1) + min);
    return { x, y };
  }
 */
