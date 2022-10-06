import { StorageService } from "@/services/StorageService";
import { WebBombikaService } from "@/services/WebBombikaService";
import { ref } from "vue";

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
    console.log(this.topPlayers.value);
    this.topPlayers.value = await this.getTopPlayers();

    this.currentPlayer.value = await this.getCurrentPlayer();

    this.isPlayerInTop10.value = false;
    console.log(this.currentPlayer, this.topPlayers, this.isPlayerInTop10);
  };

  isPlayerRegistered = () => {
    return !this.storage.isItemInStorageEmpty("username");
  };

  checkIfPlayerIsInTop10() {
    return this.topPlayers.value.find(
      (e) => e.username == this.currentPlayer.value
    );
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
