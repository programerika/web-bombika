import TestRandomProvider from "../model/TestRandomProvider";
import WebBombikaModel from "../model/webBombikaModel";

const igra = new WebBombikaModel();
igra.createBoard();

// const popunjenaIgra = new WebBombikaModel(new TestRandomProvider());
// popunjenaIgra.createBoardWithBombs();

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

// test("Testing that the bombs are planted", () => {
//     for(let i = 0; i<4)
// })
