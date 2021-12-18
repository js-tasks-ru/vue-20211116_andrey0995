import { createRouter, createWebHistory } from 'vue-router';
import PageIndex from '../views/PageIndex.vue';
import PageLogin from '../views/PageLogin.vue';
import PageRegister from '../views/PageRegister.vue';

export const router = createRouter({
  history: createWebHistory('/05-vue-router/01-AuthPages'),
  routes: [
    {
      path: '/',
      name: 'Start',
      component: PageIndex,
    },
    {
      path: '/login',
      name: 'Login',
      component: PageLogin,
    },
    {
      path: '/register',
      name: 'Registr',
      component: PageRegister,
    },
  ],
});
