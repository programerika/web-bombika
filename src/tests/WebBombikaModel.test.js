import RandomProvider from "../model/RandomProvider";
import TestRandomProvider from "../model/TestRandomProvider";
import WebBombikaModel from "../model/webBombikaModel";

describe("WebBombikaModel", () => {
  const popunjenaIgra = new WebBombikaModel(new TestRandomProvider());
  let playerGameState = popunjenaIgra.newGame();
  playerGameState = popunjenaIgra.newGame();

  it("Tests if the game fields are not flagged when the game starts", () => {
    for (let i = 0; i < playerGameState.rows; i++) {
      for (let j = 0; j < playerGameState.cols; j++) {
        expect(playerGameState.minefield[i][j].flag).toStrictEqual(false);
      }
    }
  });

  it("Tests if all game fields are closed when the game starts", () => {
    for (let i = 0; i < playerGameState.rows; i++) {
      for (let j = 0; j < playerGameState.cols; j++) {
        expect(playerGameState.minefield[i][j].closed).toStrictEqual(true);
      }
    }
  });
});

describe("PlayerGameState - newGame()", () => {
  const popunjenaIgra = new WebBombikaModel(new RandomProvider());
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
  let playerGameState = openedCell.newGame();
  playerGameState = openedCell.openField(1, 0);
  playerGameState = openedCell.toggleFlag(1, 2);

  it("Tests if the cell (1,0) is opened when we call method openField(1,0)", () => {
    expect(playerGameState.minefield[1][0].closed).toStrictEqual(false);
  });

  it("Tests if number of bombs around cell (1,0) are equal to 2", () => {
    expect(playerGameState.minefield[1][0].bombsAroundCount).toStrictEqual(2);
  });

  it("Tests if all the cells except (1,0) are closed", () => {
    for (let i = 0; i < playerGameState.rows; i++) {
      for (let j = 0; j < playerGameState.cols; j++) {
        if (!(i == 1 && j == 0)) {
          expect(playerGameState.minefield[i][j].closed).toStrictEqual(true);
        }
      }
    }
  });
  it("Tests the click on a cell that has a flag", () => {
    expect(openedCell.canFieldBeOpened(1, 2)).toBeFalsy();
  });

  it("Tests if a cell that is already open can be flagged", () => {
    expect(openedCell.canFieldBeFlagged(1, 0)).toBeFalsy();
  });

  it("Tests the click on a cell that is already open", () => {
    expect(openedCell.canFieldBeOpened(1, 0)).toBeFalsy();
  });
});

describe("PlayerGameState - open Field With The Bomb", () => {
  const openedCellWithBomb = new WebBombikaModel(new TestRandomProvider());
  openedCellWithBomb.newGame();
  openedCellWithBomb.toggleFlag(1, 2);
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

  it("Tests that all the fields that are not flagged are opened after a click on the bomb", () => {
    for (let i = 0; i < playerGameStateBomb.rows; i++) {
      for (let j = 0; j < playerGameStateBomb.cols; j++) {
        if (!playerGameStateBomb.minefield[i][j].flag) {
          expect(playerGameStateBomb.minefield[i][j].closed).toStrictEqual(
            false
          );
        }
      }
    }
  });
});

describe("Testing flag manipulation - add flag", () => {
  let addFlagPlayer = new WebBombikaModel(new TestRandomProvider());
  addFlagPlayer.newGame();
  let playerGameStateAddFlag = addFlagPlayer.toggleFlag(1, 2);
  it("Adds a flag to a predefined location and checks if the state of flag is true", () => {
    expect(playerGameStateAddFlag.minefield[1][2].flag).toEqual(true);
  });
  it("Tests that a user can't add a flag to a cell that already has a flag", () => {
    expect(addFlagPlayer.canFieldBeOpened(1, 2)).toBeFalsy();
  });
});

describe("Testing flag manipulation - add flag on opened field", () => {
  let flagOpenedField = new WebBombikaModel(new TestRandomProvider());
  flagOpenedField.newGame();
  flagOpenedField.openField(1, 3);
  it("Tests that a user can't add a flag to a cell that already has a flag", () => {
    expect(flagOpenedField.canFieldBeFlagged(1, 3)).toBeFalsy();
  });
});

describe("testing flag manipulation - remove flag", () => {
  let playerRemoveFlag = new WebBombikaModel(new TestRandomProvider());
  playerRemoveFlag.newGame();
  playerRemoveFlag.toggleFlag(1, 2);
  let playerGameStateRemoveFlag = playerRemoveFlag.toggleFlag(1, 2);
  it("Removes a flag from a predefined location and checks if the state of flag is false", () => {
    expect(playerGameStateRemoveFlag.minefield[1][2].flag).toBeFalsy();
  });
});

describe("Testing game end state - Unsuccessful", () => {
  let gameEndUnsuccessful = new WebBombikaModel(new TestRandomProvider());
  gameEndUnsuccessful.newGame();
  let playerGameState = gameEndUnsuccessful.toggleFlag(1, 2);
  playerGameState = gameEndUnsuccessful.openField(1, 1);

  it("Sets the playerGameState is over to true", () => {
    expect(playerGameState.isFinished).toEqual(true);
  });
  it("tests if the cell that has a flag is still closed", () => {
    expect(playerGameState.minefield[1][2].closed).toEqual(true);
  });
  it("tests if triggeredBomb is true when we click on field with bomb", () => {
    expect(playerGameState.minefield[1][1].triggeredBomb).toEqual(true);
  });
});

describe("Testing openField() - empty cell", () => {
  let openedEmptyField = new WebBombikaModel(new TestRandomProvider());
  openedEmptyField.newGame();
  openedEmptyField.toggleFlag(4, 1);
  //openedEmptyField.toggleFlag(4, 1);
  let playerOpenedEmptyField = openedEmptyField.openField(3, 0);
  let brojOtvorenih = 0;
  playerOpenedEmptyField.minefield.map((singleRow) =>
    singleRow.map((singleCell) => {
      if (!singleCell.closed) {
        brojOtvorenih++;
      }
    })
  );
  it("Tests if all the empty cells and cells with the bombAround are opened when the empty cell opens", () => {
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

  it("Tests if all the cells except opened empty cells and cells with the bomb are closed when the empty cell opens", () => {
    expect(brojZatvorenih).toEqual(59);
  });
});

describe("Testing numberOfFlags(equal to numberOfBombs)", () => {
  let flagedField = new WebBombikaModel(new TestRandomProvider());
  flagedField.newGame();
  let playerFlaggedTheField = flagedField.toggleFlag(4, 1);
  playerFlaggedTheField = flagedField.toggleFlag(5, 1);
  playerFlaggedTheField = flagedField.toggleFlag(6, 1);
  playerFlaggedTheField = flagedField.toggleFlag(7, 1);
  playerFlaggedTheField = flagedField.toggleFlag(7, 1);
  playerFlaggedTheField = flagedField.toggleFlag(6, 1);
  it("Tests if numberOfBombs changes when we add/remove flags", () => {
    expect(playerFlaggedTheField.numberOfFlags).toEqual(8);
  });
});

describe("Testing gameEndState - Successful-game lasted longer than 3 minutes", () => {
  let gameEndSuccessful = new WebBombikaModel(new TestRandomProvider());
  gameEndSuccessful.newGame();
  let endingPlayer = gameEndSuccessful.openField(0, 5);
  endingPlayer = gameEndSuccessful.openField(5, 0);
  endingPlayer = gameEndSuccessful.openField(0, 1);
  endingPlayer = gameEndSuccessful.openField(1, 0);
  endingPlayer = gameEndSuccessful.openField(9, 8);
  //endingPlayer = gameEndSuccessful.openField(8, 9);

  it("Tests if the game is successfully finished when all fields that are not bombs are open", () => {
    jest.useFakeTimers().setSystemTime(new Date("2022-10-10").getTime());
    endingPlayer = gameEndSuccessful.openField(8, 9);
    expect(endingPlayer.score).toEqual(1);
  });
  it("Tests if the game is successfully finished when all fields that are not bombs are open", () => {
    expect(endingPlayer.isFinished).toEqual(true);
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

  it("Tests if the game is successfully finished when all fields that are not bombs are open", () => {
    expect(endingPlayer.score).toEqual(100);
  });
  it("Tests if the game is successfully finished when all fields that are not bombs are open", () => {
    expect(endingPlayer.isFinished).toEqual(true);
  });
});
