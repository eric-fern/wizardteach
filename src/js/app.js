import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import '../css/main.css';

/* Import Font Awesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
/* Import Font Awesome component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
/* Import specific icons */
import { faHatWizard } from '@fortawesome/free-solid-svg-icons';

/* Add icons to the library */
library.add(faHatWizard);

// Set dark mode by default
document.documentElement.classList.add('dark');

// Create the app instance
const app = createApp(App);
const pinia = createPinia();

// Configure Element Plus for dark mode
app.use(ElementPlus, {
  dark: true
});
app.use(pinia);
app.use(router);

/* Register Font Awesome component globally */
app.component('font-awesome-icon', FontAwesomeIcon);

// Mount the app
app.mount('#app'); 