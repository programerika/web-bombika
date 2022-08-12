import RandomProvider from "../model/RandomProvider";
import TestRandomProvider from "../model/TestRandomProvider";
import WebBombikaModel from "../model/webBombikaModel";

describe("WebBombikaModel", () => {
  const igra = new WebBombikaModel(new RandomProvider());
  igra.newGame();
  const popunjenaIgra = new WebBombikaModel(new TestRandomProvider());
  const playerGameState = popunjenaIgra.newGame();

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
    for (let i = 0; i < igra.gameState.rows; i++) {
      for (let j = 0; j < igra.gameState.cols; j++) {
        expect(igra.gameState.minefield[i][j].flag).toStrictEqual(false);
      }
    }
  });

  it("Tests if all game fields are closed when the game starts", () => {
    for (let i = 0; i < igra.gameState.rows; i++) {
      for (let j = 0; j < igra.gameState.cols; j++) {
        expect(igra.gameState.minefield[i][j].closed).toStrictEqual(true);
      }
    }
  });
  it("Tests if all of the bombs are planted when the function populateWithBombs() is called", () => {
    for (let i = 0; i < popunjenaIgra.gameState.rows; i++) {
      expect(popunjenaIgra.gameState.minefield[i][i].bomb).toStrictEqual(true);
    }
  });

  it("Tests the calculateNeighborBombs() that is called inside newGame() (right)", () => {
    for (let i = 0; i < popunjenaIgra.gameState.rows - 1; i++) {
      expect(
        popunjenaIgra.gameState.minefield[i + 1][i].bombAroundCount
      ).toStrictEqual(2);
    }
  });

  it("Tests the calculateNeighborBombs() that is called inside newGame() (2 cells to the right)", () => {
    for (let i = 0; i < popunjenaIgra.gameState.rows - 2; i++) {
      expect(
        popunjenaIgra.gameState.minefield[i + 2][i].bombAroundCount
      ).toStrictEqual(1);
    }
  });

  it("Tests the calculateNeighborBombs() that is called inside newGame() (Down)", () => {
    for (let i = 0; i < popunjenaIgra.gameState.rows - 1; i++) {
      expect(
        popunjenaIgra.gameState.minefield[i][i + 1].bombAroundCount
      ).toStrictEqual(2);
    }
  });

  it("Testing the calculator of neighboring bombs (2 rows down)", () => {
    for (let i = 0; i < popunjenaIgra.gameState.rows - 2; i++) {
      expect(
        popunjenaIgra.gameState.minefield[i][i + 2].bombAroundCount
      ).toStrictEqual(1);
    }
  });
});

//TESTOVI SA PLAYER GAME STATE
describe("PlayerGameState - newGame()", () => {
  const popunjenaIgra = new WebBombikaModel(new TestRandomProvider());
  const playerGameState = popunjenaIgra.newGame();

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

describe("PlayerGameState - openField()", () => {
  const openedCell = new WebBombikaModel(new TestRandomProvider());
  openedCell.newGame();
  //TODO ZERO
  let playerGameState = openedCell.openField(1, 0);
  playerGameState = openedCell.addFlag(1, 2);

  it("Tests the click on a cell that is not a bomb, but has a number", () => {
    expect(playerGameState.minefield[1][0].closed).toStrictEqual(false);
  });

  it("Tests the click on a cell that is not a bomb, but has a number", () => {
    expect(playerGameState.minefield[1][0].bombsAroundCount).toStrictEqual(2);
  });

  it("Tests the click on a cell that is not a bomb, but has a number", () => {
    for (let i = 0; i < playerGameState.rows; i++) {
      for (let j = 0; j < playerGameState.cols; j++) {
        if (!(i == 1 && j == 0)) {
          expect(playerGameState.minefield[i][j].closed).toStrictEqual(true);
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

describe("PlayerGameState - open Field With The Bomb", () => {
  const openedCellWithBomb = new WebBombikaModel(new TestRandomProvider());
  openedCellWithBomb.newGame();
  //TODO ZERO
  openedCellWithBomb.addFlag(1, 2);
  let playerGameStateBomb = openedCellWithBomb.openField(2, 2);

  it("Tests the click on a cell with a bomb", () => {
    expect(playerGameStateBomb.isFinished).toEqual(true);
  });

  it("Tests that all the fields that are flagged are still closed after a click on the bomb", () => {
    for (let i = 0; i < playerGameStateBomb.rows; i++) {
      for (let j = 0; j < playerGameStateBomb.cols; j++) {
        if (playerGameStateBomb.minefield[i][j].flag) {
          expect(playerGameStateBomb.minefield[i][j].closed).toStrictEqual(
            true
          );
        }
      }
    }
  });
});

describe("TestRandomProvider - predefined bomb location", () => {
  const popunjenaIgra = new WebBombikaModel(new TestRandomProvider());
  const playerGameState = popunjenaIgra.newGame();

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

describe("Testing flag manipulation - add flag", () => {
  let addFlagPlayer = new WebBombikaModel(new TestRandomProvider());
  addFlagPlayer.newGame();
  let playerGameStateAddFlag = addFlagPlayer.addFlag(1, 2);
  it("Adds a flag to a predefined location and checks if the state of flag is true", () => {
    expect(playerGameStateAddFlag.minefield[1][2].flag).toEqual(true);
  });
  it("Tests that a user can't add a flag to a cell that already has a flag", () => {
    expect(() => addFlagPlayer.addFlag(1, 2)).toThrow("Vec ima zastavica");
  });
  it.skip("Tests if adding a flag on a opened cell throw exception", () => {
    expect(() => addFlagPlayer.addFlag(1, 2)).toThrow("Polje je otvoreno!");
  });
});

describe("Testing flag manipulation - add flag on opened field", () => {
  let flagOpenedField = new WebBombikaModel(new TestRandomProvider());
  flagOpenedField.newGame();
  flagOpenedField.openField(1, 3);
  it("Tests that a user can't add a flag to a cell that already has a flag", () => {
    expect(() => flagOpenedField.addFlag(1, 3)).toThrow("Polje je otvoreno!");
  });
});

describe("testing flag manipulation - remove flag", () => {
  let playerRemoveFlag = new WebBombikaModel(new TestRandomProvider());
  playerRemoveFlag.newGame();
  playerRemoveFlag.addFlag(1, 2);
  //playerRemoveFlag.playerGameState.minefield[1][2].flag = true;
  let playerGameStateRemoveFlag = playerRemoveFlag.removeFlag(1, 2);
  it("Removes a flag from a predefined location and checks if the state of flag is false", () => {
    expect(playerGameStateRemoveFlag.minefield[1][2].flag).toEqual(false);
  });
  it("Tests that a user can't remove a flag from a cell that doesn't have a flag", () => {
    expect(() => playerRemoveFlag.removeFlag(1, 2)).toThrow(
      "Polje nema zastavicu"
    );
  });
});

describe("Testing flag manipulation - remove flag from opened field", () => {
  let removeFlagFromOpenedField = new WebBombikaModel(new TestRandomProvider());
  removeFlagFromOpenedField.newGame();
  removeFlagFromOpenedField.openField(1, 3);
  it("Tests that a user can't remove a flag from a cell that is already open", () => {
    expect(() => removeFlagFromOpenedField.removeFlag(1, 3)).toThrow(
      "Polje je otvoreno!"
    );
  });
});

describe("Testing game end state - Unsuccessful", () => {
  let gameEndUnsuccessful = new WebBombikaModel(new TestRandomProvider());
  gameEndUnsuccessful.newGame();
  gameEndUnsuccessful.addFlag(1, 2);
  let playerGameState = gameEndUnsuccessful.openField(1, 1);
  it("Sets the playerGameState is over to true", () => {
    expect(playerGameState.isFinished).toEqual(true);
  });
  it("tests if the cell that has a flag is still closed", () => {
    expect(playerGameState.minefield[1][2].closed).toEqual(true);
  });
});

describe("Testing openField() - empty cell", () => {
  let openedEmptyField = new WebBombikaModel(new TestRandomProvider());
  openedEmptyField.newGame();
  openedEmptyField.addFlag(4, 1);
  //openedEmptyField.removeFlag(4, 1);
  let playerOpenedEmptyField = openedEmptyField.openField(3, 0);
  let brojOtvorenih = 0;
  playerOpenedEmptyField.minefield.map((singleRow) =>
    singleRow.map((singleCell) => {
      if (!singleCell.closed) {
        brojOtvorenih++;
      }
    })
  );
  it("Tests if all the empty cells and cells with the bomb are opened when the empty cell opens", () => {
    expect(brojOtvorenih).toEqual(41);
  });

  let brojZatvorenih = 0;
  playerOpenedEmptyField.minefield.map((singleRow) =>
    singleRow.map((singleCell) => {
      if (singleCell.closed) {
        brojZatvorenih++;
      }
    })
  );

  it("Tests if all the cells except empty cells and cells with the bomb are closed when the empty cell opens", () => {
    expect(brojZatvorenih).toEqual(59);
  });
});

describe("Testing numberOfFlags(equal to numberOfBombs)", () => {
  let flagedField = new WebBombikaModel(new TestRandomProvider());
  flagedField.newGame();
  let playerFlaggedTheField = flagedField.addFlag(4, 1);
  playerFlaggedTheField = flagedField.addFlag(5, 1);
  playerFlaggedTheField = flagedField.addFlag(6, 1);
  playerFlaggedTheField = flagedField.addFlag(7, 1);
  playerFlaggedTheField = flagedField.removeFlag(7, 1);
  it("Tests if all the cells except empty cells and cells with the bomb are closed when the empty cell opens", () => {
    expect(playerFlaggedTheField.numberOfBombs).toEqual(7);
  });
});

describe("Testing gameEndState - Successful", () => {
  let gameEndSuccessful = new WebBombikaModel(new TestRandomProvider());
  gameEndSuccessful.newGame();

  it.skip("Tests that the game is over successfully when all of the cells that are not bombs are open", () => {
    for (let i = 0; i < gameEndSuccessful.gameState.rows; i++) {
      for (let j = 0; j < gameEndSuccessful.gameState.cols; j++) {
        if (i != j) {
          gameEndSuccessful.openField(i, j);
        }
      }
    }
    expect(gameEndSuccessful.playerGameState.isFinished).toEqual(true);
  });
  it.skip("Tests that the score is 100 when the game ends successfully under 10 seconds", () => {
    expect(gameEndSuccessful.playerGameState.score).toEqual(100);
  });
});

describe("Testing gameEndState - Successful", () => {
  let gameEndSuccessful = new WebBombikaModel(new TestRandomProvider());
  gameEndSuccessful.newGame();
  let endingPlayer = gameEndSuccessful.openField(0, 3);
  endingPlayer = gameEndSuccessful.openField(3, 0);
  endingPlayer = gameEndSuccessful.openField(0, 1);
  endingPlayer = gameEndSuccessful.openField(1, 0);
  endingPlayer = gameEndSuccessful.openField(9, 8);
  endingPlayer = gameEndSuccessful.openField(8, 9);
  //Radi kada se podesi da na svaki sekund oduzima 5 sekundi, a ne na 10 sekundi
  it.skip("Tests if the game is successfully finished when all fields that are not bombs are open", (done) => {
    setTimeout(() => {
      endingPlayer = gameEndSuccessful.openField(8, 9);
      expect(endingPlayer.isFinished).toEqual(true);
      done();
    }, 4000);
  });
  it("Tests if the game is successfully finished when all fields that are not bombs are open", () => {
    expect(endingPlayer.isFinished).toEqual(true);
  });
});
