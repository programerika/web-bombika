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

  //Function that initializes the ScoreViewModel instance
  initializeView = (score) => {
    this.gameOverMessage.value = this.#scoreMessage(score);
    this.saveButtonDisabled.value = true;
    this.inputUsernameDisabled.value = false;
    this.showRegistrationForm.value = this.isPlayerRegistered() ? false : true;
    this.isUsernameValid.value = true;
    this.saveButtonText.value = "Save score!";
  };

  //Function that generates a message for the player when the game is finished based on the number of points a player has receivec.
  #scoreMessage = (score) => {
    if (score === 0) {
      return "Sorry!Better luck next time!😥";
    } else if (score == 1) {
      return `You won ${score} point!!!🤩`;
    } else {
      return `You won ${score} points!!!🤩`;
    }
  };

  //Function that's used for username input validation
  usernameValidation = (username) => {
    if (username && username.length > 2) {
      this.#validateUsername(username);
    }
  };

  //Private function used for username validation with RegExp
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

  //Function that saves the player and his score in the database
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

  //If the player is already registered, this function is used to add to the already existing points
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

  //Function that checks if the player is registered
  isPlayerRegistered = () => {
    return !this.storage.isItemInStorageEmpty("username");
  };

  //Username getter
  getUsername = () => {
    return this.storage.getItem("username");
  };

  //Function that checks if the username exists in the local storage
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
