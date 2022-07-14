export default class TestRandomProvider {
  nextCoordinates() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i == j) {
          return { i, j };
        }
      }
    }
  }
}
