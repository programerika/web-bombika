import { WebBombikaService } from "../services/WebBombikaService";
import { StorageService } from "../services/StorageService";
import notifyError from "../services/ErrorNotificationService";

export class ScoreBoardViewModel {
  #WebBombikaService;
  #storage;
  constructor() {
    this.#WebBombikaService = new WebBombikaService();
    this.#storage = new StorageService();
  }

  initializeScoreBoardView = async () => {
    try {
      const players = await this.#getTopPlayers();
      this.#dispatchUpdateScoreBoard({
        topPlayers: {
          topPlayers: this.#highlightCurrentPlayer(players.topPlayers),
          currentPlayer: players.currentPlayer,
        },
        boardView: {
          showDeletePlayer: this.#isPlayerRegistered(),
          showPlayerBelowTopList:
            this.#isPlayerRegistered() &&
            !this.#isPlayerInTopList(players.topPlayers),
        },
        isBoardLoading: false,
        errorMsg: null,
      });
    } catch (error) {
      notifyError(error.message);
      this.#dispatchUpdateScoreBoard({
        topPlayers: {
          topPlayers: [],
          currentPlayer: {
            username: this.#currentPlayerUsername(),
            score: null,
          },
        },
        boardView: {
          showDeletePlayer: false,
          showPlayerBelowTopList: this.#isPlayerRegistered(),
        },
        isBoardLoading: false,
        errorMsg: "Sorry, we are unable to retrieve top players at the moment.",
      });
    }
  };

  #isPlayerRegistered = () => {
    return !this.#storage.isItemInStorageEmpty("username");
  };

  #getTopPlayers = async () => {
    const topPlayers = await this.#WebBombikaService.getTopPlayers();
    let currentPlayer = {};
    if (this.#isPlayerRegistered()) {
      currentPlayer = await this.#WebBombikaService.getPlayerByUsername(
        this.#currentPlayerUsername()
      );
      if (currentPlayer === undefined) {
        this.#removePlayerFromLocalStorage();
      }
    }

    return {
      topPlayers: [...topPlayers],
      currentPlayer: { ...currentPlayer },
    };
  };

  #removePlayerFromLocalStorage = () => {
    this.#storage.removeItem("username");
    this.#storage.removeItem("scoreSum");
  };

  #currentPlayerUsername() {
    return this.#storage.getItem("username");
  }

  deletePlayer = async () => {
    if (this.#storage.getItem("username") === null) {
      throw new Error(
        "Illegal state: not expected to call deletePlayer without username in local storage!"
      );
    }
    if (!window.confirm("Are you sure you want to delete your username?"))
      return;

    try {
      await this.#WebBombikaService.deleteScore(this.#storage.getItem("uid"));
      this.#removePlayerFromLocalStorage();
      this.initializeScoreBoardView();
    } catch (error) {
      notifyError(
        error,
        true,
        "Sorry we are not able to delete your username at the moment!",
        true
      );
    }
  };

  //TODO highlight player and isPlayerInTopList
}
