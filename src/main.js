import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./style.css";
import plugin from "../plugin";
import { iconAutoRegister } from "../global.js";
const pinia = createPinia();
const app = createApp(App);
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

iconAutoRegister(app);

app.use(pinia);
app.use(plugin);
app.use(Toast);
app.mount("#app");
