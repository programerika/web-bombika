const modelModule = {
  state: () => ({
    numberOfBombs: 10,
    numberOfFlags: 10,
    cols: 10,
    rows: 10,
    isFinished: false,
    score: 0,
    maxScore: 105,
    minefield: [],
    startTime: Date.now(),
  }),
  mutations: {
    updateModel(state, newModelState) {
      Object.assign(state, newModelState);
    },
    //this.$store.commit('updateModel')
  },
  actions: {
    updateModel({ commit }, newModelState) {
      commit("updateModel", newModelState);
      // this.$store.dispach('updateModel')
    },
  },
};

export default modelModule;
