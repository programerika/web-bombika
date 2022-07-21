import RandomProvider from "../model/RandomProvider";
import TestRandomProvider from "../model/TestRandomProvider";
import WebBombikaModel from "../model/webBombikaModel";

const igra = new WebBombikaModel(new RandomProvider());
//igra.createBoard();
igra.newGame();

test("Testing createGame() with 10 rows", () => {
  expect(igra.gameState.minefield.length).toEqual(10);
});

test("Testing createGame() with 10 columns", () => {
  for (let i = 0; i < 10; i++) {
    expect(igra.gameState.minefield[i].length).toEqual(10);
  }
});

test("Testing that the number of specified columns is 10", () => {
  expect(igra.gameState.col).toEqual(10);
});

test("Testing that the number of specified rows is 10", () => {
  expect(igra.gameState.row).toStrictEqual(10);
});

test("Testing that the default score when the game starts is 0", () => {
  expect(igra.gameState.score).toStrictEqual(0);
});

test("Testing that the game isFinished state is false when the game starts", () => {
  expect(igra.gameState.isFinished).toStrictEqual(false);
});

test("Testing that the game fields are not flagged when the game starts", () => {
  for (let i = 0; i < igra.gameState.row; i++) {
    for (let j = 0; j < igra.gameState.col; j++) {
      expect(igra.gameState.minefield[i][j].flag).toStrictEqual(false);
    }
  }
});

test("Testing that all game fields are closed when the game starts", () => {
  for (let i = 0; i < igra.gameState.row; i++) {
    for (let j = 0; j < igra.gameState.col; j++) {
      expect(igra.gameState.minefield[i][j].closed).toStrictEqual(true);
    }
  }
});

//testovi sa IT
//TESTOVI SA PLAYER GAME STATE
//playerGameState je projekcija GameState, posebna metoda koju pozivamo svaki put kad vracamo playerGameState
const popunjenaIgra = new WebBombikaModel(new TestRandomProvider());
//popunjenaIgra.createBoardWithBombs();
let playerGameState = popunjenaIgra.newGame();

test("Testing playerGameState isFinished is false", () => {
  for (let i = 0; i < playerGameState.cols; i++) {
    expect(playerGameState.isFinished).toStrictEqual(false);
  }
});

test("Testing playerGameState closed is true", () => {
  expect(playerGameState.playerGameFieldStep.closed).toEqual(true);
});

test("Testing that the bombs are planted", () => {
  for (let i = 0; i < popunjenaIgra.gameState.row; i++) {
    expect(popunjenaIgra.gameState.minefield[i][i].bomb).toStrictEqual(true);
  }
});

test("Testing the calculator of neighboring bombs ", () => {
  for (let i = 0; i < popunjenaIgra.gameState.row - 1; i++) {
    expect(
      popunjenaIgra.gameState.minefield[i + 1][i].bombAroundCount
    ).toStrictEqual(2);
  }
});

test("Testing the calculator of neighboring bombs ", () => {
  for (let i = 0; i < popunjenaIgra.gameState.row - 2; i++) {
    expect(
      popunjenaIgra.gameState.minefield[i + 2][i].bombAroundCount
    ).toStrictEqual(1);
  }
});

test("Testing the calculator of neighboring bombs ", () => {
  for (let i = 0; i < popunjenaIgra.gameState.row - 1; i++) {
    expect(
      popunjenaIgra.gameState.minefield[i][i + 1].bombAroundCount
    ).toStrictEqual(2);
  }
});

test("Testing the calculator of neighboring bombs ", () => {
  for (let i = 0; i < popunjenaIgra.gameState.row - 2; i++) {
    expect(
      popunjenaIgra.gameState.minefield[i][i + 2].bombAroundCount
    ).toStrictEqual(1);
  }
});

{
  // test("Testing the calculator of neighboring bombs ", () => {
  //   for (let i = 0; i < popunjenaIgra.gameState.row - 3; i++) {
  //     expect(
  //       popunjenaIgra.gameState.minefield[i][i + 3].bombAroundCount
  //     ).toStrictEqual(0);
  //   }
  // });
  // test("Testing the calculator of neighboring bombs on fields that should be empty (i+3) ", () => {
  //   for (let i = 0; i < popunjenaIgra.gameState.row - 3; i++) {
  //     expect(
  //       popunjenaIgra.gameState.minefield[i + 3][i].bombAroundCount
  //     ).toStrictEqual(0);
  //   }
  // });
  // test("Testing the calculator of neighboring bombs on fields that should be empty (i+4) ", () => {
  //   for (let i = 0; i < popunjenaIgra.gameState.row - 4; i++) {
  //     expect(
  //       popunjenaIgra.gameState.minefield[i + 4][i].bombAroundCount
  //     ).toStrictEqual(0);
  //   }
  // });
  //for(let i = 0; i<10; i++)
  // //singleRow.map((SingleCell) => {
  //   })
}

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

test("Testing the number of cells that are empty", () => {
  expect(brojacPraznihCelija).toEqual(66);
});

test("Testing the number of cells that have bombs around them", () => {
  expect(brojacCelijaSaBombamaOkoSebe).toEqual(34);
});

//TODO ZERO
popunjenaIgra.openField(1, 2);
test("Click on a cell that is not a bomb but has a number", () => {
  expect(popunjenaIgra.gameState.minefield[1][2].closed).toStrictEqual(false);
});

test("Click on a cell that is already open", () => {
  expect(() => popunjenaIgra.openField(1, 2)).toThrow("Polje je vec otvoreno!");
});

popunjenaIgra.openField(2, 2);
test("Click on a cell with a bomb", () => {
  expect(popunjenaIgra.playerGameState.isFinished).toEqual(true);
});
