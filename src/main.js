import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./style.css";
import plugin from "../plugin";
const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(plugin);
app.mount("#app");
