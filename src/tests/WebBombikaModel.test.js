import RandomProvider from "../model/RandomProvider";
import TestRandomProvider from "../model/TestRandomProvider";
import WebBombikaModel from "../model/webBombikaModel";

const igra = new WebBombikaModel(new RandomProvider());
igra.newGame();

test("Testing newGame() with 10 rows", () => {
  expect(igra.gameState.minefield.length).toEqual(10);
});

test("Testing newGame() with 10 columns", () => {
  for (let i = 0; i < 10; i++) {
    expect(igra.gameState.minefield[i].length).toEqual(10);
  }
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

//TESTOVI SA PLAYER GAME STATE
//playerGameState je projekcija GameState, posebna metoda koju pozivamo svaki put kad vracamo playerGameState
const popunjenaIgra = new WebBombikaModel(new TestRandomProvider());
let playerGameState = popunjenaIgra.newGame();

it("testing if playerGameState timer is less or equal to date.now()", () => {
  expect(playerGameState.startTime).toBeLessThanOrEqual(Date.now());
});

it("Testing if the playerGameState has an initial score of 0", () => {
  expect(playerGameState.score).toStrictEqual(0);
});

it("Testing if playerGameState fieldstep flag is false", () => {
  expect(playerGameState.fieldStep.flag).toStrictEqual(false);
});

it("Testing if playerGameState has 10 cols", () => {
  expect(playerGameState.cols).toStrictEqual(10);
});

it("Testing if playerGameState has 10 rows", () => {
  expect(playerGameState.rows).toStrictEqual(10);
});

test("Testing playerGameState isFinished is false", () => {
  expect(playerGameState.isFinished).toStrictEqual(false);
});

test("Testing playerGameState closed is true", () => {
  expect(playerGameState.fieldStep.closed).toEqual(true);
});

const openedCell = new WebBombikaModel(new TestRandomProvider());
openedCell.newGame();
//TODO ZERO
let player = openedCell.openField(1, 2);
console.log(player.fieldStep.closed);

test("Click on a cell that is not a bomb but has a number", () => {
  expect(player.fieldStep.closed).toStrictEqual(false);
});

test("Click on a cell that is already open", () => {
  expect(() => openedCell.openField(1, 2)).toThrow("Polje je vec otvoreno!");
});

player = openedCell.openField(2, 2);
test("Click on a cell with a bomb", () => {
  expect(player.isFinished).toEqual(true);
});

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
