// import * as Vue from 'vue';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Index from './components/Schedule.vue'

// Vue.config.productionTip = false;
const routes = [
    {
        name: 'Index',
        path: '/',
        component: Index
    }
]
export const eventBus = createApp(App);
const router = createRouter({history: createWebHistory(process.env.VUE_APP_BASE_URL), routes})

createApp(App).use(Index).use(router).mount('#app')