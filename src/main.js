import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import "@mdi/font/css/materialdesignicons.css";
function createBombika(id) {
  createApp(App).use(store).use(vuetify).mount(id);
}
if (process.env.NODE_ENV === "development") createBombika("#app");

export default createBombika;
