import { StorageService } from "@/services/StorageService";
import { WebBombikaService } from "@/services/WebBombikaService";

export class ScoreViewModel {
  #webBombikaService;
  constructor() {
    this.storage = new StorageService();
    this.#webBombikaService = new WebBombikaService();
  }

  saveScore = async (username, score) => {
    let userInput = new RegExp("^[^-\\s][a-zA-Z0-9]{3,5}[0-9]{2}$");
    if (this.storage.isItemInStorageEmpty("uid") && !userInput.test(username)) {
      return {
        message: `You won ${score} points!!!🤩`,
        usernameMessage: "Incorrect input, eg. MyName12",
        saveButtonDisabled: false,
        usernameMessageColour: "red",
      };
    }
    try {
      const userExists = await this.#checkIfPlayerNameExists(username);
      if (userExists)
        return {
          message: `You won ${score} points!!!🤩`,
          usernameMessage: "Username already exists!",
          saveButtonDisabled: false,
          usernameMessageColour: "red",
        };
      const uid = await this.#webBombikaService.saveScore(username, score);
      this.storage.setItem("username", username);
      this.storage.setItem("uid", uid);
      return {
        message: `You won ${score} points!!!🤩`,
        usernameMessage: "Username in valid format!",
        saveButtonDisabled: true,
        usernameMessageColour: "green",
      };
    } catch (error) {
      console.log(error);
    }
  };

  saveScoreIfPlayerIsAlreadyRegistered = async (score) => {
    if (score === 0) return;
    if (!this.isPlayerRegistered()) {
      try {
        await this.#webBombikaService.addScore(
          this.storage.getItem("username"),
          score
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  isPlayerRegistered = () => {
    return this.storage.isItemInStorageEmpty("username");
  };

  getItemInStorage = () => {
    return this.storage.getItem("username");
  };

  #checkIfPlayerNameExists = async (username) => {
    let user = await this.#webBombikaService.getPlayerByUsername(username);
    let existingUser = user !== undefined;
    return existingUser;
  };

  getTopPlayers = async () => {
    let topPlayers = await this.#webBombikaService.getTopPlayers();
    return topPlayers;
  };

  getCurrentPlayer = async () => {
    let currentPlayer = this.#webBombikaService.getPlayerByUsername(
      this.#storage.getItem("username")
    );
    return currentPlayer;
  };

  #removePlayerFromLocalStorage = () => {
    this.#storage.removeItem("username");
    this.#storage.removeItem("uid");
  };

  deletePlayer = async () => {
    if (this.#storage.getItem("uid") === null) {
      alert(
        "Can't delete a player that is not in local storage. Play and then try again :)"
      );
      throw new Error(
        "Illegal state: not expected to call deletePlayer without uid in local storage!"
      );
    }
    if (!window.confirm("Are you sure you want to delete your username?"))
      return;

    try {
      await this.#webBombikaService.deletePlayer(this.#storage.getItem("uid"));
      this.#removePlayerFromLocalStorage();
    } catch (error) {
      console.log(error);
    }
  };
}
