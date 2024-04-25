<template>
    <quizHeader/>
    <main class="flex min-h-screen">
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
