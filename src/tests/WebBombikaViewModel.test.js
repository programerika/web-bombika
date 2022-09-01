import TestRandomProvider from "../model/TestRandomProvider";
import { WebBombikaViewModel } from "../viewModel/webBombikaViewModel";

describe("WebBombikaViewModel", () => {
  const viewModel = new WebBombikaViewModel(new TestRandomProvider());
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

  it("Tests if opening empty field set certain image", () => {
    expect(viewModel.openField(0, 0).minefield[0][0].image).toEqual(
      "triggeredbomba.jpg"
    );
  });
});
