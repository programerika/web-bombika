import { WebBombikaViewModel } from "../viewModel/webBombikaViewModel";

describe("WebBombikaViewModel", () => {
  const viewModel = new WebBombikaViewModel();
  const playerViewModelState = viewModel.newGame();
  it("Tests if open field shows proper image for certail field", () => {
    for (let i = 0; i < playerViewModelState.cols; i++) {
      for (let j = 0; j < playerViewModelState.rows; j++) {
        expect(playerViewModelState.minefield[i][j].image).toEqual(
          "closedCell.png"
        );
      }
    }
  });
});

describe("WebBombikaViewModel - openField()", () => {
  const viewModel = new WebBombikaViewModel();
  const playerViewModelState = viewModel.newGame();

  it("Tests if opening empty field set certain image", () => {
    expect(
      viewModel.openField(1, 0, playerViewModelState).minefield[1][0].image
    ).toEqual("cell2.png");
  });

  it("Tests if opening empty field set certain image", () => {
    expect(
      viewModel.openField(2, 0, playerViewModelState).minefield[2][0].image
    ).toEqual("cell1.png");
  });

  it("Tests if opening empty field set certain image", () => {
    expect(
      viewModel.openField(9, 0, playerViewModelState).minefield[9][0].image
    ).toEqual("cell0.png");
  });
});

describe("WebBombikaViewModel - openField()", () => {
  const viewModel = new WebBombikaViewModel();
  let playerViewModelState = viewModel.newGame();
  playerViewModelState = viewModel.openField(0, 0, playerViewModelState);

  it("Tests if opening empty field set certain image", () => {
    expect(playerViewModelState.minefield[0][0].image).toEqual(
      "triggeredbomba.jpg"
    );
  });

  it("Tests if opening empty field set certain image", () => {
    expect(playerViewModelState.minefield[1][1].image).toEqual("bomba.jpg");
  });
});

describe("WebBombikaViewModel - openField()", () => {
  const viewModel = new WebBombikaViewModel();
  let playerViewModelState = viewModel.newGame();
  playerViewModelState = viewModel.toggleFlag(0, 0, playerViewModelState);
  playerViewModelState = viewModel.openField(0, 5, playerViewModelState);
  playerViewModelState = viewModel.toggleFlag(0, 5, playerViewModelState);
  playerViewModelState = viewModel.openField(0, 5, playerViewModelState);

  it("Tests if opening empty field set certain image", () => {
    expect(playerViewModelState.minefield[0][0].image).toEqual("flag.png");
  });

  it("Tests if opening empty field set certain image", () => {
    expect(playerViewModelState.numberOfFlags).toEqual(9);
  });

  it("Tests if opening empty field set certain image", () => {
    expect(playerViewModelState.minefield[0][5].image).toEqual("cell0.png");
  });
});
