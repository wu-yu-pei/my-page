import { createApp } from 'vue';
import App from './App.vue';
import directive from './dir';
import { createPinia } from 'pinia';

createApp(App).use(createPinia()).use(directive).mount('#app');
