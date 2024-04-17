import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as bootstrap from "bootstrap";
import Alert from "bootstrap/js/dist/alert";

import { Tooltip, Toast, Popover } from "bootstrap";

const app = createApp(App);

app.use(router);
app.use(store);
app.mount("#app");
