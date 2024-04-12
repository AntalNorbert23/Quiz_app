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
                @click="markQuiz(row.id)"
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

  const quizSetNames = ['quiz-set-1', 'quiz-set-2', 'quiz-set-3'];
  const randomQuizSetName = quizSetNames[Math.floor(Math.random() * quizSetNames.length)];

 const markQuiz = (rowId) => {
    let randomQuizSetName = localStorage.getItem(`randomQuizSetName_${rowId}`); // Get the random quiz set name from localStorage for this row
    // Check if a random quiz set name has been generated and stored in localStorage for this row
    if (!randomQuizSetName) {
      // If not, generate a random quiz set name
      randomQuizSetName = quizSetNames[Math.floor(Math.random() * quizSetNames.length)];
      // Store the random quiz set name in localStorage to persist it for this row
      localStorage.setItem(`randomQuizSetName_${rowId}`, randomQuizSetName);
    }
    router.push({ name: 'quizQuestions', params: { quizSetName: randomQuizSetName } });
  }


  onMounted(() => {
  // Load the rows data when the component is mounted
  authStore.loadRows();
});
  </script>