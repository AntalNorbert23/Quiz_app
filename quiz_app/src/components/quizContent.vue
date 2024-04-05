<template>
    <quizHeader/>
    <main class="flex h-[88.8vh]">
        <div>
            <sideNav/>
        </div>
        <div class="bg-orange-800 flex-1">
            <component :is="selectedComponent" />
         </div>
    </main>
</template>

<script setup>
    import quizHeader from "./quizHeader.vue";
    import sideNav from "./sideNav.vue";
    import claimTask from "./claimTask.vue";
    import tasks from "./tasks.vue";
    import { useAuthStore } from '@/store/index';
    import { computed } from 'vue';

    const authStore = useAuthStore();
    const selectedComponent = computed(() => authStore.selectedComponent);
</script>
