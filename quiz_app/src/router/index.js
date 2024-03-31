import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/login.vue';
import createAccount from '@/components/createAccount.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    {
      path:'/createAccount',
      name:'createAccount',
      component:createAccount
    }
  ]
})

export default router
