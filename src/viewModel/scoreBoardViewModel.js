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
  errorMessage = ref("");
  constructor() {
    this.storage = new StorageService();
    this.#webBombikaService = new WebBombikaService();
  }

  refreshView = async () => {
    this.errorMessage.value = "";
    this.isLoading.value = false;
    this.topPlayers.value = await this.getTopPlayers();
    this.currentPlayer.value = await this.getCurrentPlayer();
    this.isPlayerInTop10.value = this.checkIfPlayerIsInTop10();
    console.log("refreshed score board");
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
      this.errorMessage.value = "Unable to load top list at the moment.";
    }
  };

  getCurrentPlayer = async () => {
    let player = this.storage.getItem("username");
    if (!player) return;
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
      this.refreshView();
    } catch (error) {
      console.log(error);
    }
  };
}
