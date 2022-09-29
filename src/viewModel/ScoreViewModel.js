import { StorageService } from "@/services/StorageService";
import { WebBombikaService } from "@/services/WebBombikaService";

export class ScoreViewModel {
  #storage;
  #webBombikaService;
  constructor() {
    this.#storage = new StorageService();
    this.#webBombikaService = new WebBombikaService();
  }

  usernameInputOnChange = (username, score) => {
    let validationResult;
    if (username && username.length > 2) {
      validationResult = this.#usernameValidation(username, score);
    }
    return { ...validationResult, username: username };
  };

  #usernameValidation = (username, score) => {
    let userInput = new RegExp("^[^-\\s][a-zA-Z0-9]{3,5}[0-9]{2}$");
    if (!userInput.test(username)) {
      return {
        message: `You won ${score} points!!!🤩`,
        usernameMessage: "Incorrect input, eg. MyName12",
        saveButtonDisabled: false,
        usernameMessageColour: "red",
      };
    } else {
      return {
        message: `You won ${score} points!!!🤩`,
        usernameMessage: "Input in valid format",
        saveButtonDisabled: true,
        usernameMessageColour: "green",
      };
    }
  };

  saveScore = async (username, score) => {
    let userInput = new RegExp("^[^-\\s][a-zA-Z0-9]{3,5}[0-9]{2}$");
    if (
      this.#storage.isItemInStorageEmpty("uid") &&
      !userInput.test(username)
    ) {
      return this.#usernameValidation(username, score);
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
  };

  saveScoreIfPlayerIsAlreadyRegistered = async (score) => {
    if (score === 0) return;
    if (this.#isPlayerRegistered()) {
      try {
        await this.#webBombikaService.addScore(
          this.#storage.getItem("username"),
          score
        );
      } catch (error) {
        console.log("Sorry we are not able to add your score right now!");
      }
    }
  };

  #isPlayerRegistered = () => {
    return !this.#storage.isItemInStorageEmpty("username");
  };

  #checkIfPlayerNameExists = async (username) => {
    let user = await this.#webBombikaService.getPlayerByUsername(username);
    let existingUser = user !== undefined;
    return existingUser;
  };
}
