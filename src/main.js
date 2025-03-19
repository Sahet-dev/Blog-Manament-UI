import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import apiClient from '@/api/axios';
import './main.css'
const app = createApp(App);
app.config.globalProperties.$api = apiClient;

app.use(router).mount('#app');
