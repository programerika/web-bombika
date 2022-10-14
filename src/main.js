import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
function createBombika(id) {
  loadFonts();

  createApp(App).use(store).use(vuetify).mount(id);
}
if (process.env.NODE_ENV === "development") createBombika("#app");

export default createBombika;
