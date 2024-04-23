<template>
    <quizHeader/>
    <main class="flex">
        <div :class="{ 'h-screen': getRouteName }">
            <sideNav/>
        </div>
        <div class="flex-1">
            <router-view/>  
         </div>
    </main>
</template>

<script setup>
    import quizHeader from "./quizHeader.vue";
    import sideNav from "./sideNav.vue";
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    // determine whether the current route is tasksDone or tasks
    const getRouteName = computed(() => {
        return  route.name === 'tasks' || route.name === 'quizQuestions' || route.name === "claimTask";
    });
</script>
