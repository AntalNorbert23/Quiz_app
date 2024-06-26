
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/tailwind.css";
import { createPinia } from 'pinia';

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')

//temporary solution for refresh bug
const lastVisitedRoute = localStorage.getItem('lastVisitedRoute');

if (lastVisitedRoute) {
  router.push({ name: lastVisitedRoute }).catch(() => {});
}

