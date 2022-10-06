import { StorageService } from "@/services/StorageService";
import { WebBombikaService } from "@/services/WebBombikaService";

export class ScoreViewModel {
  #webBombikaService;
  constructor() {
    this.storage = new StorageService();
    this.#webBombikaService = new WebBombikaService();
  }

  scoreViewModelDetails = (score) => {
    return {
      username: "",
      gameOverMessage: this.#scoreMessage(score),
      usernameMessage: "Please enter a username.",
      saveButtonDisabled: true,
      inputUsernameDisabled: false,
      usernameMessageColour: "black",
      isUsernameValid: "",
    };
  };

  #scoreMessage = (score) => {
    if (score === 0) return "Sorry! Better luck next time!🥺";
    else return `You won ${score} points!!!🤩`;
  };

  validateUsername = (username, score) => {
    let userInput = new RegExp("^[^-\\s][a-zA-Z0-9]{3,5}[0-9]{2}$");
    if (username.length > 2)
      if (!userInput.test(username)) {
        return {
          message: `You won ${score} points!!!🤩`,
          isUsernameValid:
            "Username should contain al least 2 numbers at the end.",
          saveButtonDisabled: true,
          usernameMessageColour: "red",
        };
      } else {
        return {
          gameOverMessage: `You won ${score} points!!!🤩`,
          usernameMessage: "",
          saveButtonDisabled: false,
          inputUsernameDisabled: false,
        };
      }
  };

  savePlayerAndScore = async (username, score) => {
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
      const uid = await this.#webBombikaService.savePlayerAndScore(
        username,
        score
      );
      this.storage.setItem("username", username);
      this.storage.setItem("uid", uid);
      return {
        message: `You won ${score} points!!!🤩`,
        usernameMessage: "Username in valid format!",
        saveButtonDisabled: true,
        inputUsernameDisabled: true,
        usernameMessageColour: "green",
      };
    } catch (error) {
      console.log(error);
    }
  };

  addScore = async (score) => {
    if (score === 0) return;
    if (this.isPlayerRegistered()) {
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
    return !this.storage.isItemInStorageEmpty("username");
  };

  getUsername = () => {
    return this.storage.getItem("username");
  };

  #checkIfPlayerNameExists = async (username) => {
    let user = await this.#webBombikaService.getPlayerByUsername(username);
    let existingUser = user !== undefined;
    return existingUser;
  };

  getTopPlayers = async () => {
    try {
      return await this.#webBombikaService.getTopPlayers();
    } catch (err) {
      console.log(err);
    }
  };

  getCurrentPlayer = async () => {
    let player = this.storage.getItem("username");
    try {
      return await this.#webBombikaService.getPlayerByUsername(player);
    } catch (err) {
      console.log(err);
    }
  };

  #removePlayerFromLocalStorage = () => {
    this.storage.removeItem("username");
    this.storage.removeItem("uid");
  };

  deletePlayer = async () => {
    if (this.storage.getItem("uid") === null) {
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
      await this.#webBombikaService.deletePlayer(this.storage.getItem("uid"));
      this.#removePlayerFromLocalStorage();
    } catch (error) {
      console.log(error);
    }
  };
}
