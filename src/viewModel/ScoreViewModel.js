import errorNotification from "@/services/ErrorNotificationService";
import { StorageService } from "@/services/StorageService";
import { WebBombikaService } from "@/services/WebBombikaService";
import { ref } from "vue";

export class ScoreViewModel {
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
    this.gameOverMessage.value = this.#scoreMessage(score);
    this.saveButtonDisabled.value = true;
    this.inputUsernameDisabled.value = false;
    this.showRegistrationForm.value = this.isPlayerRegistered() ? false : true;
    this.isUsernameValid.value = true;
    this.saveButtonText.value = "Save score!";
  };

  #scoreMessage = (score) => {
    if (score === 0) {
      return "Sorry!Better luck next time!😥";
    } else if (score == 1) {
      return `You won ${score} point!!!🤩`;
    } else {
      return `You won ${score} points!!!🤩`;
    }
  };

  usernameValidation = (username) => {
    if (username && username.length > 2) {
      this.#validateUsername(username);
    }
  };

  #validateUsername = (username) => {
    let userInput = new RegExp("^[^-\\s][a-zA-Z0-9]{3,5}[0-9]{2}$");
    if (!userInput.test(username)) {
      this.saveButtonDisabled.value = true;
      this.inputUsernameDisabled.value = false;
      this.usernameMessage.value = "Format(4-6 letters/numbers & 2 numbers)";
      this.isUsernameValid.value = false;
    } else {
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
      this.initializeView(score);
    } catch (err) {
      errorNotification(
        err,
        true,
        "We are not able to save your username and score right now.",
        true
      );
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
      } catch (error) {
        errorNotification(
          error,
          true,
          "Sorry! We are not able to add your score right now.",
          true
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
