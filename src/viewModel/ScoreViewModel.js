import { StorageService } from "@/services/StorageService";
import { WebBombikaService } from "@/services/WebBombikaService";

export class ScoreViewModel {
  #storage;
  #webBombikaService;
  constructor() {
    this.#storage = new StorageService();
    this.#webBombikaService = new WebBombikaService();
  }

  #isPlayerRegistered = () => {
    return !this.#storage.isItemInStorageEmpty("username");
  };
}
