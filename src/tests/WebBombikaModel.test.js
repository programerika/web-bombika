import RandomProvider from "../model/RandomProvider";
import TestRandomProvider from "../model/TestRandomProvider";
import WebBombikaModel from "../model/webBombikaModel";

//WebBombikaModel tests
describe("WebBombikaModel", () => {
  const popunjenaIgra = new WebBombikaModel(new TestRandomProvider()); //A customized object for testing purposes
  let playerGameState = popunjenaIgra.newGame(); //An instance of a game
  playerGameState = popunjenaIgra.newGame(); //Checking if calling again newGame() restarts-updates the state

  /**
   * @param {Array} Accepts an array of an object
   * @returns {Boolean} A boolean value that represents the value of a property of an object
   */

  it("Tests if the game fields are not flagged when the game starts", () => {
    for (let i = 0; i < playerGameState.rows; i++) {
      for (let j = 0; j < playerGameState.cols; j++) {
        expect(playerGameState.minefield[i][j].flag).toStrictEqual(false);
      }
    }
  });

  /**
   * @param {Boolean} Accepts an object property
   * @returns {Boolean} A boolean value that represents the value of a property of an object
   */

  it("Tests if all game fields are closed when the game starts", () => {
    for (let i = 0; i < playerGameState.rows; i++) {
      for (let j = 0; j < playerGameState.cols; j++) {
        expect(playerGameState.minefield[i][j].closed).toStrictEqual(true);
      }
    }
  });
});
//End of WebBombikaModel tests

//newGame() function testing
describe("PlayerGameState - newGame()", () => {
  const popunjenaIgra = new WebBombikaModel(new RandomProvider()); //customized object for the purpose of testing
  const playerGameState = popunjenaIgra.newGame(); //An instance of a PlayerGameState generated from the model.

  /**
   * @param {Date} Accepts a Date value from the customized game object
   * @returns {Boolean} A boolean value that represents the time when the game ended. The result should be true (Game start time is lower than game end time.)
   */
  it("Tests if playerGameState timer is less or equal to date.now()", () => {
    expect(playerGameState.startTime).toBeLessThanOrEqual(Date.now());
  });

  /**
   * @param {Integer} Accepts an Integer value
   * @returns {Boolean} A boolean value that represents the result if the Score is exactly 0.
   * The initial score of 0 is set in the GameModel.
   */

  it("Tests if the playerGameState has an initial score of 0", () => {
    expect(playerGameState.score).toStrictEqual(0);
  });

  /**
   * @param {Boolean} Accepts an object and reads the .Flag property.
   * @returns {Boolean} A boolean value that represents the truthy value of the .flag property.
   * It should be false for every instance of a cell when the game starts.
   */
  it("Tests is the playerGameState cells are not flagged when the game starts", () => {
    for (let i = 0; i < playerGameState.cols; i++) {
      for (let j = 0; j < playerGameState.rows; j++) {
        expect(playerGameState.minefield[i][j].flag).toStrictEqual(false);
      }
    }
  });

  /**
   * @param {Array} Accepts an array of arrays
   * @returns {Boolean} A boolean value that represents the truthy value of numberOfCOls in the gameModel.
   * The test ensures that when the game starts, the minefield is generated correctly.
   */

  it("Tests if playerGameState has 10 cols", () => {
    expect(playerGameState.cols).toStrictEqual(10);
  });
  /**
   * @param {Array} Accepts an array of Objects
   * @returns {Boolean} A boolean value that represents the truthy value of NumberOfRows in the gameModel.
   * The test ensures that when the game starts, the minefield is generated correctly.
   */

  it("Tests if playerGameState has 10 rows", () => {
    expect(playerGameState.rows).toStrictEqual(10);
  });

  /**
   * @param {Boolean} Accepts a boolean value.
   * @returns {Boolean} A boolean value that represents the truthy value of numberOfCOls in the gameModel.
   * The test ensures that when the game starts, the minefield is generated correctly.
   */

  it("Tests if playerGameState isFinished is false when the game starts", () => {
    expect(playerGameState.isFinished).toStrictEqual(false);
  });

  /**
   * @param {Boolean} Accepts a variable of an object called Closed.
   * @returns {Boolean} A boolean value that represents the truthy value of Closed property.
   * When the game starts, all cells should be closed. This ensures that the player starts
   * with all the cells closed and that the game is generated correctly.
   */

  it("Tests if playerGameState cells are closed when the game starts", () => {
    for (let i = 0; i < playerGameState.cols; i++) {
      for (let j = 0; j < playerGameState.rows; j++) {
        expect(playerGameState.minefield[i][j].closed).toStrictEqual(true);
      }
    }
  });
  /**
   * @param {Integer} Accepts an integer value of the numberOfBombs variable.
   * @returns {Boolean} A boolean value that represents if the numberOfBombs is strictly equal 10.
   * Currently the test is made with intention of a fixed numberOfBombs value and will be rewritten
   * if the game changes and accepts a variable number of bombs.
   */

  it("Tests if number of flags is 10 - number of flags is equal to numberOfBombs", () => {
    expect(playerGameState.numberOfBombs).toEqual(10);
  });
});
//End of newGame() function testing

//Start of openField()
describe("PlayerGameState - openField()", () => {
  const openedCell = new WebBombikaModel(new TestRandomProvider()); //A customized object for the purpose of testing.
  let playerGameState = openedCell.newGame();
  playerGameState = openedCell.openField(1, 0);
  playerGameState = openedCell.toggleFlag(1, 2);

  /**
   * @param {Boolean} Accepts a variable Closed from an object.
   * @returns {Boolean} A boolean value of .closed variable. If the cell is closed,
   * based on this test, the test should return True.
   */

  it("Tests if the cell (1,0) is opened when we call method openField(1,0)", () => {
    expect(playerGameState.minefield[1][0].closed).toStrictEqual(false);
  });

  /**
   * @param {Integer} Accepts a number from the bombsAroundCount variable.
   * @returns {Boolean} A boolean value that should be True if the bombsAroundCount is strictly 2
   *
   */

  it("Tests if number of bombs around cell (1,0) are equal to 2", () => {
    expect(playerGameState.minefield[1][0].bombsAroundCount).toStrictEqual(2);
  });

  /**
   * @param {Boolean}  Accepts a boolean value of closed variable in an object.
   * @returns {Boolean} A boolean value that represents the truthy value of closed variable in an object
   * Every field except (1,0) should have the closed variable set to true
   */

  it("Tests if all the cells except (1,0) are closed", () => {
    for (let i = 0; i < playerGameState.rows; i++) {
      for (let j = 0; j < playerGameState.cols; j++) {
        if (!(i == 1 && j == 0)) {
          expect(playerGameState.minefield[i][j].closed).toStrictEqual(true);
        }
      }
    }
  });

  /**
   * @param {Boolean} Accepts a method called canFieldBeOpened which returns a boolean value.
   * @returns {Boolean} A boolean value. Because we are testing this method on a flagged cell. The method
   * will return false. In the test we are expecting that value to be false.
   */
  it("Tests the click on a cell that has a flag", () => {
    expect(openedCell.canFieldBeOpened(1, 2)).toBeFalsy();
  });

  /**
   * @param {Boolean} Accepts a method called canFieldBeFlagged which returns a boolean value.
   * @returns {Boolean} A boolean value. Because we are testing this method on an open cell, we are expecting the return value to be false.
   */
  it("Tests if a cell that is already open can be flagged", () => {
    expect(openedCell.canFieldBeFlagged(1, 0)).toBeFalsy();
  });

  /**
   * @param {Boolean} Accepts a method called canFieldBeOpened which returns a boolean value.
   * @returns {Boolean} A boolean value. Because we are testing this method on an open cell,
   * We are expecting that an already opened cell can't be opened again. The test return value will return True if the method returns False.
   */
  it("Tests the click on a cell that is already open", () => {
    expect(openedCell.canFieldBeOpened(1, 0)).toBeFalsy();
  });
});
describe("PlayerGameState - open Field With The Bomb", () => {
  const openedCellWithBomb = new WebBombikaModel(new TestRandomProvider()); //A customized object for the testing purposes
  openedCellWithBomb.newGame();
  openedCellWithBomb.toggleFlag(1, 2);
  let playerGameStateBomb = openedCellWithBomb.openField(2, 2);

  /**
   * @param {Boolean} Accepts a method called canFieldBeFlagged which returns a boolean value.
   * @returns {Boolean} A boolean value. Because we are testing this method on an open cell, we are expecting the return value to be false.
   */
  it("Tests the click on a cell with a bomb", () => {
    expect(playerGameStateBomb.isFinished).toEqual(true);
  });

  /**
   * @param {Boolean} Accepts a flag variable and closed variable
   * @returns {Boolean} A boolean value. If the cell is flagged, the return value of closed should always be true.
   */
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

  /**
   * @param {Boolean} Accepts an object variable closed.
   * @returns {Boolean} A boolean value. In this test, we are testing that if the bomb is clicked, all cells that are not
   * flagged should be open.
   */
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
//end of openField()

//start of toggleFlag()
describe("Testing flag manipulation - toggleFlag()", () => {
  let addFlagPlayer = new WebBombikaModel(new TestRandomProvider()); //Custom object for testing purposes
  addFlagPlayer.newGame();
  let playerGameStateAddFlag = addFlagPlayer.toggleFlag(1, 2);
  /**
   * @param {Boolean} Accepts an object variable flag
   * @returns {Boolean} A boolean value. In this test, we are testing if the predefined location of Added flag is true.
   * flag was added in the code above, and the flag property on coordinates (1, 2) should be true.
   */
  it("Adds a flag to a predefined location and checks if the state of flag is true", () => {
    expect(playerGameStateAddFlag.minefield[1][2].flag).toEqual(true);
  });

  /**
   * @param {Boolean} Accepts a method canFieldBeOpened()
   * @returns {Boolean} A boolean value. In this test case, we are testing that the user can't open a field that has
   * a flag variable set to true.
   */
  it("Tests that a user can't open a cell that has a flag", () => {
    expect(addFlagPlayer.canFieldBeOpened(1, 2)).toBeFalsy();
  });
});
//end of toggleFlag()

describe("Testing flag manipulation - add flag on opened field", () => {
  let flagOpenedField = new WebBombikaModel(new TestRandomProvider());
  flagOpenedField.newGame();
  flagOpenedField.openField(1, 3);
  /**
   * @param {Boolean} Accepts a method called canFieldBeFlagged()
   * @returns {Boolean} A boolean value. In this test, we are testing if the open cell can be flagged.
   * In this scenario, the test should return value False
   */
  it("Tests if the user can add a flag to an opened cell", () => {
    expect(flagOpenedField.canFieldBeFlagged(1, 3)).toBeFalsy();
  });
});

describe("testing flag manipulation - remove flag", () => {
  let playerRemoveFlag = new WebBombikaModel(new TestRandomProvider());
  playerRemoveFlag.newGame();
  playerRemoveFlag.toggleFlag(1, 2);
  let playerGameStateRemoveFlag = playerRemoveFlag.toggleFlag(1, 2);
  /**
   * @param {Boolean} Accepts a method called toggleFlag()
   * @returns {Boolean} A boolean value. In this test, we are removing the flag from a predefined cell that has flag variable set to true
   */
  it("Removes a flag from a predefined location and checks if the state of flag is false", () => {
    expect(playerGameStateRemoveFlag.minefield[1][2].flag).toBeFalsy();
  });
});

//game end unsuccessfully - testing
describe("Testing game end state - Unsuccessful", () => {
  let gameEndUnsuccessful = new WebBombikaModel(new TestRandomProvider()); //Custom object for testing purposes
  gameEndUnsuccessful.newGame();
  let playerGameState = gameEndUnsuccessful.toggleFlag(1, 2);
  playerGameState = gameEndUnsuccessful.openField(1, 1);

  /**
   * @param {Boolean} accepts the object property isFinished which is of type Boolean
   * @returns {Boolean} A boolean value. In this test, we are checking if the isFinished state is set to true which should
   * happen if the player clicks on a bomb
   */
  it("Sets the playerGameState is over to true", () => {
    expect(playerGameState.isFinished).toEqual(true);
  });

  /**
   * @param {Boolean} accepts the object property Closed of a cell from predefined coordinates.
   * @returns {Boolean} A boolean value. In this test, we are checking if the cell that has flag property set to true
   * is still closed after all the other cells are open.
   */
  it("tests if the cell that has a flag is still closed", () => {
    expect(playerGameState.minefield[1][2].closed).toEqual(true);
  });

  /**
   * @param {Boolean} accepts the object property triggeredBomb
   * @returns {Boolean} A boolean value. In this test, we are checking if the cell that was clicked and which contained the bomb
   * has it's triggeredBomb variable set to true
   */
  it("tests if triggeredBomb is true when we click on field with bomb", () => {
    expect(playerGameState.minefield[1][1].triggeredBomb).toEqual(true);
  });
});
//End of gameEndUnsuccessful testing

//Start of empty cell testing.
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

  /**
   * @param {Integer} Accepts an Integer value
   * @returns {Boolean} A boolean value. In this test case, we are testing that all the empty cells and cells with bombAroundCount
   * higher than 0 are open on the upper right part of the table. After a click on the cell with coordinates(3, 0), all the fields around it
   * should be open until the cells with bombAroundCount. In this case, we are expecting the number of empty cells to be 41.
   *
   * --Thoughts - if the table size changes in the future, this number should be modified and should not be fixed in place.
   */
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

  /**
   * @param {Integer} Accepts an Integer value
   * @returns {Boolean} A boolean value. In this test, we are testing if the number of closed cells when we open a cell with
   * coordinates (3, 0) is equal to 59 which should be a number of closed cells based on our test requirements.
   */
  it("Tests if all the cells except opened empty cells and cells with the bomb are closed when the empty cell opens", () => {
    expect(brojZatvorenih).toEqual(59);
  });
});
//End of empty cell testing.

//numberOfFlags
describe("Testing numberOfFlags(equal to numberOfBombs)", () => {
  let flagedField = new WebBombikaModel(new TestRandomProvider());
  flagedField.newGame();
  let playerFlaggedTheField = flagedField.toggleFlag(4, 1);
  playerFlaggedTheField = flagedField.toggleFlag(5, 1);
  playerFlaggedTheField = flagedField.toggleFlag(6, 1);
  playerFlaggedTheField = flagedField.toggleFlag(7, 1);
  playerFlaggedTheField = flagedField.toggleFlag(7, 1);
  playerFlaggedTheField = flagedField.toggleFlag(6, 1);

  /**
   * @param {Integer} accepts the object property numberOfFlags
   * @returns {Boolean} A boolean value. In this test, we are testing if the toggleFlag() function is working correctly.
   * After all the flag toggling above, the number of flags in the game should be equal to 8.
   */
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
    jest.useFakeTimers().setSystemTime(new Date("2030-10-10").getTime());
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
