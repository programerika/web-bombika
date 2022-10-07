import { StorageService } from "@/services/StorageService";
import { WebBombikaService } from "@/services/WebBombikaService";
import { ref } from "vue";
import { toRaw } from "vue";

export class ScoreBoardViewModel {
  #webBombikaService;
  topPlayers = ref([]);
  currentPlayer = ref({});
  isPlayerInTop10 = ref(false);
  constructor() {
    this.storage = new StorageService();
    this.#webBombikaService = new WebBombikaService();
  }

  refreshView = async () => {
    this.topPlayers.value = await this.getTopPlayers();
    this.currentPlayer.value = await this.getCurrentPlayer();
    this.isPlayerInTop10.value = this.checkIfPlayerIsInTop10();
    console.log(toRaw(this.isPlayerInTop10.value));
  };

  isPlayerRegistered = () => {
    return !this.storage.isItemInStorageEmpty("username");
  };

  checkIfPlayerIsInTop10() {
    const currentPlayer = toRaw(this.currentPlayer.value);
    const topPlayers = toRaw(this.topPlayers.value);
    if (
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
      const players = await this.#webBombikaService.getTopPlayers();
      return players;
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
