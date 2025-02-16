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

// Function to mount app when ready
const mountApp = () => {
  app.mount('#app');
};

// Wait for stylesheets to load
const styleSheets = [...document.styleSheets];
if (styleSheets.length > 0) {
  // If stylesheets are already loaded
  mountApp();
} else {
  // Wait for load event if stylesheets aren't ready
  window.addEventListener('load', mountApp);
} 