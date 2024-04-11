<template>
    <div class="text-lg w-full">
        <p>Tasks to be done</p>
     
        <div v-for="(row, index) in rows" :key="index"
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
                <p>Claim</p>
            </div>
            <div class="flex justify-center pt-2">
                <p>{{ row.id }}</p>
            </div>
            <div class="flex justify-center pt-2">
                <p>{{ row.name }}</p>
            </div>
            <div class="flex justify-center pt-2">
                <p>50</p>
            </div>
            <div class="flex justify-center pt-2 hover:cursor-pointer"
                @click="markQuiz"
            >
                    <p class="hover:text-slate-600" >Mark quiz</p>
            </div>
        </div>
    </div>
  </template>

  <script setup>
  import { useAuthStore } from '@/store/index';
  import { useRouter } from 'vue-router';
  import { onMounted } from 'vue';
  
  const authStore = useAuthStore();
  const router=useRouter();

  const rows = authStore.rows;


  const markQuiz=()=>{
    router.push({ name: 'quizQuestions' });
  }

  onMounted(() => {
  // Load the rows data when the component is mounted
  authStore.loadRows();
});
  </script>