<template>
    <quizHeader/>
    <main class="flex flex-col md:flex-row min-h-screen">
        <div>
            <sideNav/>
        </div>
        <div class="md:flex-1">
            <router-view/>  
         </div>
    </main>
</template>

<script setup>
    import quizHeader from "./quizHeader.vue";
    import sideNav from "./sideNav.vue";
</script>
