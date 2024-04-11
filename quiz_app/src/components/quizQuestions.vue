<template>
  <div>
      <h2 class="text-4xl p-3">Quiz questions</h2>
      <div v-if="questions.length">
          <div v-for="(question,index) in questions" 
               :key="index"
               v-show="currentIndex === index"
               class="text-2xl flex flex-col items-center justify-center pt-3" 
          >
              <h3>{{ question.question }}</h3>
              <ul class="pt-3 pb-4">
                  <li v-for="(option,optionIndex) in question.options"
                      :key="optionIndex"
                      class="flex items-center"
                  >
                      <input type="radio" :id="'option-'+ optionIndex"
                             :value="optionIndex"
                             v-model="selectedAnswers[index]"
                             @click="nextQuestionDelayed(index, optionIndex)"
                             :checked="isSelected(index, optionIndex)" 
                             class="pe-6 me-3 focus:outline-slate-600 focus-within:outline-slate-600 cursor-pointer"
                      >
                      <label :for="'option_' + optionIndex">{{ option }}</label>
                </li>
              </ul>
          </div>
      </div>
      <div v-else>
          <p>No questions available</p>
      </div>
      <div class="flex justify-center pt-3">
            <button class="fa fa-arrow-left cursor-pointer text-4xl hover:text-slate-400"
                    @click="prevQuestion"
                    :disabled="currentIndex === 0"
            >
            </button>
            <button class="mx-6 px-3 py-2 border-slate-600 border-2 hover:bg-slate-400 hover:text-white hover:border-black">Submit Quiz</button>
            <button class="fa fa-arrow-right cursor-pointer text-4xl hover:text-slate-400"
                    @click="nextQuestion"
                    :disabled="currentIndex === questions.length-1"
            >
            </button>
      </div>
      <div class="grid grid-cols-10 grid-rows-5 pt-8">
          <div v-for="(question,index) in questions"
               :key="index"
               @click="jumptToQuestion(index)"
               class="cursor-pointer mx-3 my-1 border-black border px-2 text-center hover:border-cyan-400"
               :class="{ 'border-green-500': correctAnswers[index], 'border-red-500': correctAnswers[index] === false }"
          >
                {{ index+1 }}
          </div>
      </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';

  const questions=ref([]);
  const selectedAnswers=ref([]);
  const currentIndex=ref(0);
  const correctAnswers = ref([]);

  const quizSetName='quizset-1';


  //check if an option is selected for a question
  const isSelected = (questionIndex, optionIndex) => {
      return selectedAnswers.value[questionIndex] === optionIndex;
  }

  //fetch the random json quiz sets
  const fetchQuizQuestions = async () =>{
      try{
          //const randomIndex = Math.floor(Math.random()*totalQuizSet)
          const quizSet=await import('./Questions/quiz-set-1.json')
          const data= quizSet.default;
          questions.value=data.questions;

          //get the selectedAnswers array with the saved selections
          const savedQuizState = localStorage.getItem(quizSetName);
    
          if (savedQuizState) {
              const quizState = JSON.parse(savedQuizState);
              selectedAnswers.value = quizState.selectedAnswers;
          } else {
          // if there were no previous selections found, fill selectedAnswers with null 
              selectedAnswers.value = Array(data.questions.length+1).fill(null);
        }
  }catch(error){
          console.error(error);
      }
  } 

  //function to load the quiz from localstorage
  const loadQuizState = () => {
      const savedQuizState = localStorage.getItem(quizSetName);

      if (savedQuizState) {
          const quizState = JSON.parse(savedQuizState);
          selectedAnswers.value = quizState.selectedAnswers;
          correctAnswers.value = quizState.correctAnswers;
      }
  }

  //function to save quiz to localstorage

  const saveQuizState = () => {
      const quizState = {
          selectedAnswers: selectedAnswers.value,
          correctAnswers: correctAnswers.value
      };
      
      localStorage.setItem(quizSetName, JSON.stringify(quizState));
}

  //function to go to the next question
  const nextQuestion= ()=>{
      if(currentIndex.value<questions.value.length-1){
          currentIndex.value++;
      }
  }

  //function to go to the previous question 
  const prevQuestion= ()=>{
      if(currentIndex.value>0){
          currentIndex.value--;
      }
  }

  //go automativally to the next question after an option was selected
  const nextQuestionDelayed = (questionIndex, optionIndex) => {
      if(currentIndex.value < questions.value.length - 1){
          setTimeout(() => {
              currentIndex.value++;
          }, 200);
          setTimeout(() => {
              selectedAnswers.value[questionIndex] = optionIndex;
              correctAnswers.value[questionIndex] = optionIndex === questions.value[questionIndex].correct_answer;
              saveQuizState();
          }, 400);
      }
  }

  const jumptToQuestion= (index)=>{
      currentIndex.value=index;
  }

  const sumbmitQuiz=()=>{
      const allCorrect=selectedAnswers.value.every((answer,index)=>
          answer===questions.value[index].correct_answer);
      
      if(allCorrect){
          //message with Congrats all answers correct
      }else{
          //message : check your answers again and correct them
      }
  }

  //onMounted fetch the data 
  onMounted(()=>{
      fetchQuizQuestions();
      loadQuizState();
  })


  //should also implement the divs of the question to turn red if incorrect, idk yet after whole quiz submit and that's it or after every question
</script>