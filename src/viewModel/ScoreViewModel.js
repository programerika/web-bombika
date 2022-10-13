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
  isUsernameValid = ref(true);
  saveButtonText = ref("");
  #webBombikaService;
  constructor() {
    this.storage = new StorageService();
    this.#webBombikaService = new WebBombikaService();
  }
  initializeView = (score) => {
    this.username.value = "";
    this.gameOverMessage.value = this.#scoreMessage(score);
    this.usernameMessage.value = "Please enter a username.";
    this.saveButtonDisabled.value = true;
    this.inputUsernameDisabled.value = false;
    this.showRegistrationForm.value = this.isPlayerRegistered() ? false : true;
    this.isUsernameValid.value = true;
    this.saveButtonText.value = "Save score!";
  };

  #scoreMessage = (score) => {
    if (score === 0) return "Sorry!Better luck next time!😥";
    else return `You won ${score} points!!!🤩`;
  };

  usernameValidation = (username) => {
    if (username && username.length > 2) {
      this.#validateUsername(username);
    }
  };

  #validateUsername = (username) => {
    if (username.length === 0) {
      this.usernameMessage.value = "Please enter a username";
      this.saveButtonDisabled.value = true;
      this.isUsernameValid.value = false;
    }
    let userInput = new RegExp("^[^-\\s][a-zA-Z0-9]{3,5}[0-9]{2}$");
    if (!userInput.test(username)) {
      this.saveButtonDisabled.value = true;
      this.inputUsernameDisabled.value = false;
      this.usernameMessage.value = "Format(4-6 letters/numbers & 2 numbers)";
    } else {
      this.usernameMessage.value = "Username is correct";
      this.saveButtonDisabled.value = false;
      this.isUsernameValid.value = true;
    }
  };

  savePlayerAndScore = async (username, score) => {
    if (this.isPlayerRegistered()) {
      throw new Error("Illegal state: Player is already registered!");
    }
    this.saveButtonText.value = "Checking...";
    try {
      const userExists = await this.#checkIfPlayerNameExists(username);
      if (userExists) {
        this.saveButtonText.value = "Save score!";
        return;
      }

      this.saveButtonText.value = "Saving...";

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
      this.saveButtonText.value = "Saved player!";
      console.log("saved");
    } catch (err) {
      errorNotification(
        err,
        true,
        "We are not able to save your username and score right now.",
        false
      );
      this.saveButtonDisabled = false;
      this.saveButtonText.value = "Save player!";
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
        console.log("added");
      } catch (error) {
        errorNotification(
          error,
          true,
          "Sorry! We are not able to add your score right now.",
          false
        );
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
      let userExists = user !== undefined;
      if (userExists) {
        this.usernameMessage.value = "Username alreagy exists.";
        this.saveButtonDisabled.value = true;
        this.isUsernameValid.value = false;
      } else return;

      return userExists;
    } catch (err) {
      errorNotification(err, false, "Player do not exists.", true);
    }
  };
}
