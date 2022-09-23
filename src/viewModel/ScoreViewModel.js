import { StorageService } from "@/services/StorageService";
import { WebBombikaService } from "@/services/WebBombikaService";

export class ScoreViewModel {
  #storage;
  #webBombikaService;
  constructor() {
    this.#storage = new StorageService();
    this.#webBombikaService = new WebBombikaService();
  }

  save = (username, score, scoreSum2) => {
    let userInput = new RegExp("^[^-\\s][a-zA-Z0-9]{3,5}[0-9]{2}$");
    if (
      this.#storage.isItemInStorageEmpty(username) &&
      !userInput.test(username)
    ) {
      return {
        usernameMessage: "Incorrect input, eg. MyName12",
      };
    } else {
      this.#storage.setItem("username", username);

      let scoreSum = this.#storage.getItem("allscore");

      if (scoreSum == null) {
        scoreSum = 0;
      }
      scoreSum2 = parseInt(scoreSum) + parseInt(score);
      this.#storage.setItem("scoreSum", scoreSum2);
      this.saveButtonDisabled = true;
      console.log(username, "poeni ", score, "ViewModel, ukupno", scoreSum2);
      return {
        message: `You won ${score} points!!!🤩`,
      };
    }
  };

  #isPlayerRegistered = () => {
    return !this.#storage.isItemInStorageEmpty("username");
  };
}
