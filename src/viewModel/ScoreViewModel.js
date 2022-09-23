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
    if (this.#storage.isItemInStorageEmpty(username)) {
      if (!this.#isUsernameValid(username)) {
        return {
          message: `You won ${score} points!!!🤩`,
          usernameMessage: "Incorrect input, eg. MyName12",
          saveButtonDisabled: false,
          usernameMessageColour: "red",
        };
      } else if (score > 0) {
        try {
          const uid = await this.#webBombikaService.saveScore(username, score);
          console.log(uid);
          this.#storage.setItem("username", username);
          this.#storage.setItem("uid", uid);
          return {
            message: `You won ${score} points!!!🤩`,
            usernameMessage: "Username in valid format",
            saveButtonDisabled: true,
            usernameMessageColour: "green",
          };
        } catch (error) {
          console.log("greska prilikom save-a");
        }
      } else {
        return {
          message: `Sorry! Better luck next time!🥺`,
          usernameMessage: "",
          saveButtonDisabled: true,
          usernameMessageColour: "green",
        };
      }
    }
  };

  #isUsernameValid = (username) => {
    let userInput = new RegExp("^[^-\\s][a-zA-Z0-9]{3,5}[0-9]{2}$");
    return userInput.test(username);
  };

  saveScoreIfPlayerIsAlreadyRegistered = async (username, score) => {
    if (score === 0) return;
    if (this.#isPlayerRegistered(username)) {
      try {
        await this.#webBombikaService.addScore(
          this.#storage.getItem("username"),
          score
        );
      } catch (error) {
        console.log("Sorry we are not able to add your score right now!");
      }
    }
    this.getTopPlayers();
  };

  getTopPlayers = async () => {
    const players = await this.#webBombikaService.getTopPlayers();
    console.log(players);
  };

  #isPlayerRegistered = () => {
    return !this.#storage.isItemInStorageEmpty("username");
  };
}
