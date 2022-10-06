import errorNotification from "@/services/ErrorNotificationService";
import { StorageService } from "@/services/StorageService";
import { WebBombikaService } from "@/services/WebBombikaService";
import { ref } from "vue";

export class ScoreViewModel {
  username = ref("");
  gameOverMessage = ref("");
  usernameMessage = ref("");
  saveButtonDisabled = ref(false);
  inputUsernameDisabled = ref(false);
  showRegistrationForm = ref(false);
  #webBombikaService;
  constructor() {
    this.storage = new StorageService();
    this.#webBombikaService = new WebBombikaService();
  }
  initialView = (score) => {
    this.username.value = "";
    this.gameOverMessage.value = this.#scoreMessage(score);
    this.usernameMessage.value = "Please enter a username.";
    this.saveButtonDisabled.value = true;
    this.inputUsernameDisabled.value = false;
    this.usernameMessage.value = "Enter username";
    this.showRegistrationForm.value = this.isPlayerRegistered() ? false : true;
    this.addScore(score);
  };

  #scoreMessage = (score) => {
    if (score === 0) return "Sorry!Better luck next time!😥";
    else return `You won ${score} points!!!🤩`;
  };

  validateUsername = (username, score) => {
    let userInput = new RegExp("^[^-\\s][a-zA-Z0-9]{3,5}[0-9]{2}$");
    if (!userInput.test(username)) {
      this.gameOverMessage.value = `You won ${score} points!!!🤩`;
      this.usernameMessage.value = "Username already exists";
      this.saveButtonDisabled.value = true;
      this.inputUsernameDisabled.value = false;
    } else {
      this.gameOverMessage.value = `You won ${score} points!!!🤩`;
      this.saveButtonDisabled.value = false;
      this.inputUsernameDisabled.value = false;
    }
  };

  savePlayerAndScore = async (username, score) => {
    try {
      const userExists = await this.#checkIfPlayerNameExists(username);
      if (userExists) {
        this.gameOverMessage.value = `You won ${score} points!!!🤩`;
        this.saveButtonDisabled.value = true;
        this.inputUsernameDisabled.value = false;
        this.usernameMessage.value = "Username already exists";
      }
      const uid = await this.#webBombikaService.savePlayerAndScore(
        username,
        score
      );
      this.storage.setItem("username", username);
      this.storage.setItem("uid", uid);
      this.username = username;
      this.gameOverMessage.value = `You won ${score} points!!!🤩`;
      this.saveButtonDisabled.value = true;
      this.inputUsernameDisabled.value = true;
    } catch (err) {
      errorNotification(
        err,
        true,
        "We are not able to save your username and score right now.",
        false
      );
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
    try {
      let user = await this.#webBombikaService.getPlayerByUsername(username);
      let existingUser = user !== undefined;
      return existingUser;
    } catch (err) {
      console.log(err);
    }
  };

  getTopPlayers = async () => {
    try {
      return await this.#webBombikaService.getTopPlayers();
    } catch (err) {
      errorNotification(
        err,
        true,
        "We are not able to load top player right now.",
        false
      );
    }
  };

  getCurrentPlayer = async () => {
    let player = this.storage.getItem("username");
    try {
      return await this.#webBombikaService.getPlayerByUsername(player);
    } catch (err) {
      errorNotification(
        err,
        true,
        "We are not able to load your username right now.",
        false
      );
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
