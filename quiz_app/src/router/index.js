import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/login.vue';
import createAccount from '@/components/createAccount.vue';
import quizContent from '@/components/quizContent.vue';
import tasks from '@/components/tasks.vue';
import claimTask from '@/components/claimTask.vue';
import quizQuestions from '@/components/quizQuestions.vue';

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
    },
    {
      path:'/quizContent',
      name:'quizContent',
      component:quizContent,
      meta: { requiresAuth: true }, 
      children: [
        {
          path: 'tasks',
          name: 'tasks',
          component: tasks
        },
        {
          path: 'claimTask',
          name: 'claimTask',
          component: claimTask
        },
        {
          path: 'quizQuestions/:quizSetName',
          name: 'quizQuestions',
          component: quizQuestions
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) { 
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      next();
    } else {
      next({ name: 'home' }); 
    }
  } else {
    next(); 
   
  }
});

export default router
