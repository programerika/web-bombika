export default class PlayerGameState {
  constructor() {
    this.numberOfBombs = 10;
    this.cols = 10;
    this.rows = 10;
    this.isFinished = false;
    this.score = 0; // da li da krenemo od 100 kako bi izbegli da setujemo na 100 u gameEndSuccessfully
    this.minefield = [];
    this.startTime = Date.now();
  }
}
