import { createApp } from "vue";
import { createPinia } from 'pinia';
import App from "./App.vue";
import router from "./router";

import 'bootstrap/dist/js/bootstrap.js';
import '@/bootstrapSettings.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

app.use(router).mount("#app");

