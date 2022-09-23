import { WebBombikaService } from "../services/WebBombikaService";
import { StorageService } from "../services/StorageService";
import notifyError from "../services/ErrorNotificationService";


export class ScoreBoardViewModel {
    #dispatcher;
    #WebBombikaService;
    #storage;
    constructor(dispatcher) {
      this.#dispatcher = dispatcher;
      this.#WebBombikaService = new WebBombikaService);
      this.#storage = new StorageService();
    }

    #dispatchUpdateScoreBoard = (newStateBoard) => {
        this.#dispatcher(allActions.updateScoreBoard(newStateBoard));
      };
    
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
}