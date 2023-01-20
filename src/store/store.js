import { createStore } from "vuex";
import viewModule from "./modules/ViewModule";
import modelModule from "./modules/ModelModule";

export default createStore({
  modules: {
    view: viewModule,
    model: modelModule,
  },
});
