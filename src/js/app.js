import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import '../css/main.css';

// Create the app instance
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(ElementPlus);

// Mount the app
app.mount('#app'); 