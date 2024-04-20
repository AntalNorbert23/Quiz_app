<template>
    <div class="text-lg w-full">
        <h1 class="p-3 text-2xl ms-8 mb-6 mt-3">Completed Tasks</h1>
        <div class="flex mb-10">
            <div
                class="ms-16 me-5 p-3 bg-slate-600 w-32 flex justify-center hover:cursor-pointer hover:bg-slate-400"
                @click="navigateToTasks"
            >
                <p class="text-white">Processing</p>
            </div>
            <div
                class="p-3 bg-slate-600 w-32 flex justify-center hover:cursor-pointer hover:bg-slate-400"
                @click="navigateToTasksDone"
            >
                <p class="text-white">Done</p>
            </div>
        </div>
        <div v-for="(row, index) in authStore.quizzesDone" :key="index"
            class="grid grid-cols-4 grid-rows-2 border border-black mx-auto w-[90%] mt-6 py-2"
        >
            <div class="flex justify-center items-center">
                <p>ID</p>
            </div>
            <div class="flex justify-center">
                <p>NAME</p>
            </div>
            <div class="flex justify-center">
                <p>Task Nr</p>
            </div>
            <div class="flex justify-center">
                <p>Quizes done</p>
            </div>
            <div class="flex justify-center">
                <p>{{ row.id }}</p>
            </div>
            <div class="flex justify-center pt-2">
                <p>{{ row.name }}</p>
            </div>
            <div class="flex justify-center pt-2">
                <p>50</p>
            </div>
            <div class="flex justify-center pt-2 hover:cursor-pointer">
                <p class="hover:text-slate-600" >DONE</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/store/index';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';


const authStore = useAuthStore();

const router = useRouter();


function navigateToTasks() {
  router.push({ name: 'tasks' });
}

function navigateToTasksDone() {
  router.push({ name: 'tasksDone' });
}


onMounted(() => {
    authStore.loadQuizzesDone();
});
</script>
