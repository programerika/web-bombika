import errorNotification from "@/services/ErrorNotificationService";
import { StorageService } from "@/services/StorageService";
import { WebBombikaService } from "@/services/WebBombikaService";
import { ref } from "vue";
import { toRaw } from "vue";

export class ScoreBoardViewModel {
  #webBombikaService;
  topPlayers = ref([]);
  currentPlayer = ref({});
  isPlayerInTop10 = ref(false);
  isLoading = ref(false);
  showWelcome = ref(false);
  errorMessage = ref("");
  displayErrorMessage = ref(false);
  constructor() {
    this.storage = new StorageService();
    this.#webBombikaService = new WebBombikaService();
  }

  refreshView = async () => {
    this.errorMessage.value = "";
    this.showWelcome.value = false;
    this.displayErrorMessage.value = false;
    this.isLoading.value = false;
    let currPlayer = await this.getCurrentPlayer();
    this.currentPlayer.value = currPlayer;
    let players = await this.getTopPlayers();
    this.topPlayers.value = players;
    this.isPlayerInTop10.value = this.checkIfPlayerIsInTop10();
  };

  isPlayerRegistered = () => {
    return !this.storage.isItemInStorageEmpty("username");
  };

  checkIfPlayerIsInTop10() {
    const currentPlayer = toRaw(this.currentPlayer.value);
    const topPlayers = toRaw(this.topPlayers.value);
    if (
      currentPlayer &&
      topPlayers &&
      topPlayers.find((e) => e.username == currentPlayer.username) != undefined
    ) {
      return true;
    } else {
      return false;
    }
  }

  getUsername = () => {
    return this.storage.getItem("username");
  };

  getTopPlayers = async () => {
    try {
      this.isLoading.value = true;
      const players = await this.#webBombikaService.getTopPlayers();
      this.isLoading.value = false;
      return players;
    } catch (err) {
      errorNotification(
        err,
        false,
        "We are not able to load top players right now.",
        false
      );
      this.isLoading.value = false;
      this.displayErrorMessage.value = true;
      this.showWelcome.value = true;
      this.errorMessage.value =
        "Sorry, we are not able to get top players at the moment!";
    }
  };

  getCurrentPlayer = async () => {
    let player = this.storage.getItem("username");
    if (!player) return;
    try {
      return await this.#webBombikaService.getPlayerByUsername(player);
    } catch (err) {
      this.showWelcome.value = true;
      errorNotification(
        err,
        false,
        "Sorry. We are not able to delete your username right now.",
        true
      );
    }
  };

  returnPlayerFromLocalStorage = () => {
    let playerName = this.storage.getItem("username");
    if (playerName === null) {
      this.showWelcome.value = false;
    } else return playerName;
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
      this.refreshView();
    } catch (err) {
      errorNotification(
        err,
        true,
        "Sorry. We are not able to delete your username right now.",
        true
      );
    }
  };
}
