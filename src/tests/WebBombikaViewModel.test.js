/** 
    @author Programerika
*/
import { WebBombikaViewModel } from "../viewModel/webBombikaViewModel";

//Tests will work when webBombikaModel uses TestRandomProvider, instead of RandomProvider

describe("WebBombikaViewModel", () => {
  //viewModel instance
  const viewModel = new WebBombikaViewModel();
  //player state that newGame() returns and is used in View
  const playerViewModelState = viewModel.newGame();

  /**
   * @param {String}  Name for image for certain field state
   * @returns {String} Name for image that we expect when the field if closed
   * This test checks if the image name of every field that is closed is equal to "closedCell.png"
   *
   */
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

  /**
   * @param {String}  Name for image when openField() for field (1,0) is called
   * @returns {String} Name for image that we expect when the field is opened
   * This test checks if the image name of (1,0) field if equal to "cell2.png", field is with bombs around
   *
   */
  it("Tests if opening field with bombs around sets proper image", () => {
    expect(
      viewModel.openField(1, 0, playerViewModelState).minefield[1][0].image
    ).toEqual("cell2.png");
  });

  /**
   * @param {String}  Name for image when openField() for field (2,0) is called
   * @returns {String} Name for image that we expect when the field is opened
   * This test checks if the image name of (2,0) field if equal to "cell1.png",field is with bombs around
   *
   */
  it("Tests if opening field with bombs around sets proper image", () => {
    expect(
      viewModel.openField(2, 0, playerViewModelState).minefield[2][0].image
    ).toEqual("cell1.png");
  });

  /**
   * @param {String}  Name for image when openField() for field (9,0) is called
   * @returns {String} Name for image that we expect when the field is opened
   * This test checks if the image name of (9,0) field if equal to "cell0.png", field doesn't have bombs around
   * and opens every empty field that it touches
   */
  it("Tests if opening empty field sets proper image", () => {
    expect(
      viewModel.openField(9, 0, playerViewModelState).minefield[9][0].image
    ).toEqual("cell0.png");
  });
});

describe("WebBombikaViewModel - openField()", () => {
  const viewModel = new WebBombikaViewModel();
  let playerViewModelState = viewModel.newGame();
  //player state when field (0,0) is open
  playerViewModelState = viewModel.openField(0, 0, playerViewModelState);

  /**
   * @param {String}  Name for image when openField() is called for field (0,0) that has a bomb
   * @returns {String} Name for image that we expect when the field is opened
   * This test tests openField() function when we open field with bomb and checks if the image name is "triggeredbomba.png"
   */
  it("Tests if opening field with bomb sets image to 'triggeredbomba.png'", () => {
    expect(playerViewModelState.minefield[0][0].image).toEqual(
      "triggeredbomba.png"
    );
  });

  /**
   * @param {String}  Name for image for field (1,1) that also has a bomb
   * @returns {String} Name for image that we expect when bomb was pressed before and all the field were open
   * This test checks if the image name of field (1,1) is equal to "bomba.png"
   */
  it("Tests if the field with bomb has 'bomba.png' image after the game ends", () => {
    expect(playerViewModelState.minefield[1][1].image).toEqual("bomba.png");
  });
});

describe("WebBombikaViewModel - openField()", () => {
  const viewModel = new WebBombikaViewModel();
  let playerViewModelState = viewModel.newGame();

  //player state when we call method toggleFlag()
  playerViewModelState = viewModel.toggleFlag(0, 0, playerViewModelState);
  playerViewModelState = viewModel.openField(0, 5, playerViewModelState);
  playerViewModelState = viewModel.toggleFlag(0, 5, playerViewModelState);
  playerViewModelState = viewModel.openField(0, 5, playerViewModelState);

  /**
   * @param {String}  Name for image for field (0,0) when we put flag on it
   * @returns {String} Name for image that we expect when the field is flagged
   * This test checks if the image name of field (0,0) is equal to "flag.png"
   */
  it("Tests if setting flag on certain field changes image", () => {
    expect(playerViewModelState.minefield[0][0].image).toEqual("flag.png");
  });

  /**
   * @param {Integer}  Number of flags that is left after we put one flag
   * @returns {Integer} number of flags
   * This test checks the number of flags after we set a flag on a field
   */
  it("Tests the number of flags after we set a flag on a field", () => {
    expect(playerViewModelState.numberOfFlags).toEqual(9);
  });

  /**
   * @param {String}  Name of the image when the field opens after we put a flag on it and then removed
   * @returns {String} Name of the image for certain field
   * This test checks if opening field sets proper image
   */
  it("Tests if opening field sets proper image", () => {
    expect(playerViewModelState.minefield[0][5].image).toEqual("cell0.png");
  });
});
