import WebBombikaModel from "../model/webBombikaModel";

const igra = new WebBombikaModel();
igra.createBoard();

test("Testing createGame() with 10 rows", () => {
  expect(igra.gameState.minefield.length).toEqual(10);
});

test("Testing createGame() with and 10 columns", () => {
  expect(igra.gameState.minefield[0].length).toEqual(10);
});

test("Testing that the number of specified columns is 10", () => {
  expect(igra.gameState.col).toEqual(10);
});

test("Testing that the number of specified rows is 10", () => {
  expect(igra.gameState.row).toStrictEqual(10);
});
