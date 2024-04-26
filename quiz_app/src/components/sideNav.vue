
<template>
    <aside class="flex justify-between md:block w-full md:w-52 h-full bg-slate-500">
      <div class="md:pt-6 md:w-full"
           @click="selectComponent('claimTask')"
      >
        <p class="md:w-full ps-2 pe-2 md:pe-0 md:ps-4 py-4 text-sm md:text-base md:text-white hover:bg-slate-400 hover:cursor-pointer"
        :class="{ 'md:bg-slate-600 bg-slate-300 text-black': authStore.selectedTaskComponent === 'claimTask' }"
        >
          Claim task
      </p>
      </div>
      <div @click="selectComponent('tasks')">
        <p class="md:w-full ps-2 pe-2 md:pe-0 md:ps-4 py-4 text-sm md:text-base md:text-white hover:bg-slate-400 hover:cursor-pointer"
        :class="{ 'md:bg-slate-600 bg-slate-300 text-black': authStore.selectedTaskComponent === 'tasks' }"
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