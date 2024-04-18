<template>
    <div class="text-lg w-full">
        <h1 class="p-3 text-2xl">Tasks to be done</h1>
     
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
                @click="markQuiz(row.id,row.name)"
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
  const quizSetNamesHu=['quiz-set-4', 'quiz-set-5', 'quiz-set-6'];


 const markQuiz = (rowId,name) => {
    let randomQuizSetName = localStorage.getItem(`randomQuizSetName_${rowId}`); 

    const chosenQuizSetNames = name == "Hungarian knowledge" ? quizSetNamesHu : quizSetNames;
   
    if (!randomQuizSetName) {
    
      randomQuizSetName = chosenQuizSetNames[Math.floor(Math.random() * chosenQuizSetNames.length)];
      
      localStorage.setItem(`randomQuizSetName_${rowId}`, randomQuizSetName);
    }
    router.push({ name: 'quizQuestions', params: { quizSetName: randomQuizSetName } });
  }


  onMounted(() => {
 
  authStore.loadRows();
});
  </script>