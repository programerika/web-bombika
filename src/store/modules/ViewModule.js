const viewModule = {
  state: () => ({
    numberOfBombs: 10,
    numberOfFlags: 10,
    cols: 10,
    rows: 10,
    isFinished: false,
    score: 0,
    minefield: [],
    startTime: Date.now(),
  }),
  mutations: {
    updateView(state, newViewState) {
      Object.assign(state, newViewState);
    },
    //this.$store.commit('updateView')
  },
  actions: {
    updateView({ commit }, newViewState) {
      commit("updateView", newViewState);
    },
    // this.$store.dispach('updateView')
  },
};

export default viewModule;
