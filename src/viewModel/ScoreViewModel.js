import { StorageService } from "@/services/StorageService";

export class ScoreViewModel {
  #storage;
  constructor() {
    this.#storage = new StorageService();
  }

  saveScore = (username, score) => {
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
      this.#storage.setItem("username", username);

      let scoreSum = this.#storage.getItem("allscore");

      if (scoreSum == null) {
        scoreSum = 0;
      }
      let scoreSum2 = parseInt(scoreSum) + parseInt(score);
      this.#storage.setItem("allscore", scoreSum2);
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

  #isPlayerRegistered = () => {
    return !this.#storage.isItemInStorageEmpty("username");
  };
}
