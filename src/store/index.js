import { createStore } from "vuex";
import ViewModule from "./modules/ViewModule";
import ModelModule from "./modules/ModelModule";

export default createStore({
  modules: {
    view: ViewModule,
    model: ModelModule,
  },
});
