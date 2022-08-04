import RandomProvider from "../model/RandomProvider";
import TestRandomProvider from "../model/TestRandomProvider";
import WebBombikaModel from "../model/webBombikaModel";

const igra = new WebBombikaModel(new RandomProvider());
igra.newGame();

describe("WebBombikaModel", () => {
  it("Tests if newGame() creates an array with 10 rows", () => {
    expect(igra.gameState.minefield.length).toEqual(10);
  });
  it("Tests if newGame() creates an array with 10 columns for each row", () => {
    for (let i = 0; i < 10; i++) {
      expect(igra.gameState.minefield[i].length).toEqual(10);
    }
  });

  it("Tests if the default score when the game starts is 0", () => {
    expect(igra.gameState.score).toStrictEqual(0);
  });

  it("Tests if the game isFinished state is false when the game starts", () => {
    expect(igra.gameState.isFinished).toStrictEqual(false);
  });

  it("Tests if the game fields are not flagged when the game starts", () => {
    for (let i = 0; i < igra.gameState.row; i++) {
      for (let j = 0; j < igra.gameState.col; j++) {
        expect(igra.gameState.minefield[i][j].flag).toStrictEqual(false);
      }
    }
  });

  it("Tests if all game fields are closed when the game starts", () => {
    for (let i = 0; i < igra.gameState.row; i++) {
      for (let j = 0; j < igra.gameState.col; j++) {
        expect(igra.gameState.minefield[i][j].closed).toStrictEqual(true);
      }
    }
  });
  it("Tests if all of the bombs are planted when the function populateWithBombs() is called", () => {
    for (let i = 0; i < popunjenaIgra.gameState.row; i++) {
      expect(popunjenaIgra.gameState.minefield[i][i].bomb).toStrictEqual(true);
    }
  });

  it("Tests the calculateNeighborBombs() that is called inside newGame() (right)", () => {
    for (let i = 0; i < popunjenaIgra.gameState.row - 1; i++) {
      expect(
        popunjenaIgra.gameState.minefield[i + 1][i].bombAroundCount
      ).toStrictEqual(2);
    }
  });

  it("Tests the calculateNeighborBombs() that is called inside newGame() (2 cells to the right)", () => {
    for (let i = 0; i < popunjenaIgra.gameState.row - 2; i++) {
      expect(
        popunjenaIgra.gameState.minefield[i + 2][i].bombAroundCount
      ).toStrictEqual(1);
    }
  });

  it("Tests the calculateNeighborBombs() that is called inside newGame() (Down)", () => {
    for (let i = 0; i < popunjenaIgra.gameState.row - 1; i++) {
      expect(
        popunjenaIgra.gameState.minefield[i][i + 1].bombAroundCount
      ).toStrictEqual(2);
    }
  });

  it("Testing the calculator of neighboring bombs (2 rows down)", () => {
    for (let i = 0; i < popunjenaIgra.gameState.row - 2; i++) {
      expect(
        popunjenaIgra.gameState.minefield[i][i + 2].bombAroundCount
      ).toStrictEqual(1);
    }
  });
});

//TESTOVI SA PLAYER GAME STATE
//playerGameState je projekcija GameState, posebna metoda koju pozivamo svaki put kad vracamo playerGameState
const popunjenaIgra = new WebBombikaModel(new TestRandomProvider());
let playerGameState = popunjenaIgra.newGame();

describe("PlayerGameState - newGame()", () => {
  it("Tests if playerGameState timer is less or equal to date.now()", () => {
    expect(playerGameState.startTime).toBeLessThanOrEqual(Date.now());
  });

  it("Tests if the playerGameState has an initial score of 0", () => {
    expect(playerGameState.score).toStrictEqual(0);
  });

  it("Tests is the playerGameState cells are not flagged when the game starts", () => {
    for (let i = 0; i < playerGameState.cols; i++) {
      for (let j = 0; j < playerGameState.rows; j++) {
        expect(playerGameState.minefield[i][j].flag).toStrictEqual(false);
      }
    }
  });

  it("Tests if playerGameState has 10 cols", () => {
    expect(playerGameState.cols).toStrictEqual(10);
  });

  it("Tests if playerGameState has 10 rows", () => {
    expect(playerGameState.rows).toStrictEqual(10);
  });

  it("Tests if playerGameState isFinished is false when the game starts", () => {
    expect(playerGameState.isFinished).toStrictEqual(false);
  });
  //bilo je ovo ispod pod komentarom
  it("Tests if playerGameState cells are closed when the game starts", () => {
    for (let i = 0; i < playerGameState.cols; i++) {
      for (let j = 0; j < playerGameState.rows; j++) {
        expect(playerGameState.minefield[i][j].closed).toStrictEqual(true);
      }
    }
  });

  it("Tests if number of flags is 10 - number of flags is equal to numberOfBombs", () => {
    expect(playerGameState.numberOfBombs).toEqual(10);
  });
});

const openedCell = new WebBombikaModel(new TestRandomProvider());
openedCell.newGame();
//TODO ZERO
let player = openedCell.openField(1, 0);
player = openedCell.addFlag(1, 2);

describe("PlayerGameState - openField()", () => {
  it("Tests the click on a cell that is not a bomb, but has a number", () => {
    expect(player.minefield[1][0].closed).toStrictEqual(false);
  });

  it("Tests the click on a cell that is not a bomb, but has a number", () => {
    expect(player.minefield[1][0].bombsAroundCount).toStrictEqual(2);
  });

  it("Tests the click on a cell that is not a bomb, but has a number", () => {
    for (let i = 0; i < player.rows; i++) {
      for (let j = 0; j < player.cols; j++) {
        if (!(i == 1 && j == 0)) {
          expect(player.minefield[i][j].closed).toStrictEqual(true);
        }
      }
    }
  });
  it("Tests the click on a cell that has a flag", () => {
    expect(() => openedCell.openField(1, 2)).toThrow("Polje ima zastavicu");
  });

  it("Tests the click on a cell that is already open", () => {
    expect(() => openedCell.openField(1, 0)).toThrow("Polje je vec otvoreno!");
  });
});

const openedCellWithBomb = new WebBombikaModel(new TestRandomProvider());
openedCellWithBomb.newGame();
//TODO ZERO
openedCellWithBomb.addFlag(1, 2);
let openedBOmbPlayer = openedCellWithBomb.openField(2, 2);

describe("PlayerGameState - open Field With The Bomb", () => {
  it("Tests the click on a cell with a bomb", () => {
    expect(openedBOmbPlayer.isFinished).toEqual(true);
  });

  it("Tests that all the fields that are flagged are still closed after a click on the bomb", () => {
    for (let i = 0; i < openedBOmbPlayer.rows; i++) {
      for (let j = 0; j < openedBOmbPlayer.cols; j++) {
        if (openedBOmbPlayer.minefield[i][j].flag) {
          expect(openedBOmbPlayer.minefield[i][j].closed).toStrictEqual(true);
        }
      }
    }
  });
});

describe("TestRandomProvider - predefined bomb location", () => {
  let brojacPraznihCelija = 0;
  popunjenaIgra.gameState.minefield.map((singleRow) =>
    singleRow.map((singleCell) => {
      if (singleCell.bombAroundCount === 0) {
        brojacPraznihCelija++;
      }
    })
  );

  let brojacCelijaSaBombamaOkoSebe = 0;
  popunjenaIgra.gameState.minefield.map((singleRow) =>
    singleRow.map((singleCell) => {
      if (singleCell.bombAroundCount !== 0) {
        brojacCelijaSaBombamaOkoSebe++;
      }
    })
  );

  it("Calculates the number of cells that are empty", () => {
    expect(brojacPraznihCelija).toEqual(66);
  });

  it("Calculates the number of cells that have bombs around them", () => {
    expect(brojacCelijaSaBombamaOkoSebe).toEqual(34);
  });
});

let flagTestingAdd = new WebBombikaModel(new TestRandomProvider());
flagTestingAdd.newGame();
let flagAddPlayer = flagTestingAdd.addFlag(1, 2);

//flagTesting.gameState.minefield[1][2].flag;

describe("Testing flag manipulation - add flag", () => {
  it("Adds a flag to a predefined location and checks if the state of flag is true", () => {
    expect(flagAddPlayer.minefield[1][2].flag).toEqual(true);
  });
  it("Tests that a user can't add a flag to a cell that already has a flag", () => {
    expect(() => flagTestingAdd.addFlag(1, 2)).toThrow("Vec ima zastavica");
  });
  // it("Tests if adding a flag on a opened cell throw exception", () => {
  //   expect(() => flagTestingAdd.addFlag(1, 2)).toThrow("Polje je otvoreno!");
  // });
});

let flagOpenedField = new WebBombikaModel(new TestRandomProvider());
flagOpenedField.newGame();
flagOpenedField.openField(1, 3);
describe("Testing flag manipulation - add flag on opened field", () => {
  it("Tests that a user can't add a flag to a cell that already has a flag", () => {
    expect(() => flagOpenedField.addFlag(1, 3)).toThrow("Polje je otvoreno!");
  });
});

let flagTestingRemove = new WebBombikaModel(new TestRandomProvider());
flagTestingRemove.newGame();
flagTestingRemove.addFlag(1, 2);
//flagTestingRemove.playerGameState.minefield[1][2].flag = true;
let flagRemovePlayer = flagTestingRemove.removeFlag(1, 2);
describe("testing flag manipulation - remove flag", () => {
  it("Removes a flag from a predefined location and checks if the state of flag is false", () => {
    expect(flagRemovePlayer.minefield[1][2].flag).toEqual(false);
  });
  it("Tests that a user can't remove a flag from a cell that doesn't have a flag", () => {
    expect(() => flagTestingRemove.removeFlag(1, 2)).toThrow(
      "Polje nema zastavicu"
    );
  });
});

let removeFlagFromOpenedField = new WebBombikaModel(new TestRandomProvider());
removeFlagFromOpenedField.newGame();
removeFlagFromOpenedField.openField(1, 3);
describe("Testing flag manipulation - remove flag from opened field", () => {
  it("Tests that a user can't remove a flag from a cell that is already open", () => {
    expect(() => removeFlagFromOpenedField.removeFlag(1, 3)).toThrow(
      "Polje je otvoreno!"
    );
  });
});

let gameEndUnsuccessful = new WebBombikaModel(new TestRandomProvider());
gameEndUnsuccessful.newGame();
gameEndUnsuccessful.addFlag(1, 2);
gameEndUnsuccessful.openField(1, 1);
describe("Testing game end state - Unsuccessful", () => {
  it("Sets the playerGameState isOver to true", () => {
    expect(gameEndUnsuccessful.playerGameState.isFinished).toEqual(true);
  });
  it("tests if the cell that has a flag is still closed", () => {
    expect(gameEndUnsuccessful.playerGameState.minefield[1][2].closed).toEqual(
      true
    );
  });
});
