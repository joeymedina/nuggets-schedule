import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Index from './components/Schedule.vue';

const routes = [
  {
    name: 'Index',
    path: '/',
    component: Index,
  },
  {
    name: 'Schedule',
    path: '/:id',
    component: Index,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .use(router)
  .mount('#app');
