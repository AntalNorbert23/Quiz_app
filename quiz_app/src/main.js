
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/tailwind.css";
import { createPinia } from 'pinia';

import tasks from './components/tasks.vue';
import claimTask from './components/claimTask.vue';



const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
app.component('tasks', tasks);
app.component('claimTask', claimTask);
