import { StorageService } from "@/services/StorageService";
import { WebBombikaService } from "@/services/WebBombikaService";

export class ScoreViewModel {
  #storage;
  #webBombikaService;
  constructor() {
    this.#storage = new StorageService();
    this.#webBombikaService = new WebBombikaService();
  }

  saveScore = async (username, score) => {
    let userInput = new RegExp("^[^-\\s][a-zA-Z0-9]{3,5}[0-9]{2}$");
    if (
      this.#storage.isItemInStorageEmpty(username) &&
      !userInput.test(username)
    ) {
      return {
        message: `You won ${score} points!!!🤩`,
        usernameMessage: "Incorrect input, eg. MyName12",
        saveButtonDisabled: false,
        usernameMessageColour: "red",
      };
    } else if (score > 0) {
      // this.#storage.setItem("username", username);
      // this.#storage.setItem("allscore", score);
      const uid = await this.#webBombikaService.saveScore(username, score);
      console.log(uid);
      return {
        message: `You won ${score} points!!!🤩`,
        usernameMessage: "Username in valid format",
        saveButtonDisabled: true,
        usernameMessageColour: "green",
      };
    } else {
      return {
        message: `Sorry! Better luck next time!🥺`,
        usernameMessage: "",
        saveButtonDisabled: true,
        usernameMessageColour: "green",
      };
    }
  };

  saveScoreIfPlayerIsAlreadyRegistered = (username, score) => {
    if (score === 0) return;

    if (this.#isPlayerRegistered(username)) {
      let scoreSum = this.#storage.getItem("allscore");
      scoreSum = parseInt(scoreSum) + parseInt(score);
      this.#storage.setItem("allscore", scoreSum);
    }

    console.log(username, score, "saveScoreIfPlayerIsAlreadyRegistered ");
  };

  #isPlayerRegistered = () => {
    return !this.#storage.isItemInStorageEmpty("username");
  };
}
