
<template>
    <aside class="w-52 h-full bg-slate-500">
      <div class="pt-6 w-full"
           @click="selectComponent('claimTask')"
      >
        <p class="w-full ps-4 py-4 text-white hover:bg-slate-400 hover:cursor-pointer"
        :class="{ 'bg-slate-600': authStore.selectedTaskComponent === 'claimTask' }"
        >
          Claim task
      </p>
      </div>
      <div @click="selectComponent('tasks')">
        <p class="w-full ps-4 py-4 text-white hover:bg-slate-400 hover:cursor-pointer"
        :class="{ 'bg-slate-600': authStore.selectedTaskComponent === 'tasks' }"
        >
          Tasks to be done
      </p>
      </div>
    </aside>
  </template>

<script setup>
    import { useAuthStore } from '@/store/index';
    import { useRouter } from 'vue-router';

    const router=useRouter();
    const authStore = useAuthStore();

    const selectComponent = (component) => {
        authStore.selectTaskComponent(component);
        router.push({ name: component });
    };

</script>