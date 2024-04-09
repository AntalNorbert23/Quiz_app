<template>
    <quizHeader/>
    <main class="flex h-[88.8vh]">
        <div>
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
</script>
