<template>
  <div>
      <h2 class="text-4xl p-3">Quiz questions</h2>
      <div v-if="questionsAnswered === true"
           class="bg-green-500 flex justify-center items-center h-10 "
      >
            Congratulations! {{ correctAnswersCount }}/50 questions were correct!
      </div>
      <div v-else-if="questionsAnswered === false">
            All questions must be answered!!
      </div>
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
                             :disabled="hasAnswerSelected(index)"
                             class="pe-6 me-3 focus:outline-slate-600 focus-within:outline-slate-600 cursor-pointer"
                             :class="{'cursor-not-allowed': hasAnswerSelected(index) === true}"
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
            <button class="mx-6 px-3 py-2 border-slate-600 border-2 hover:bg-slate-400 hover:text-white hover:border-black"
                    :disabled="!allQuestionsAnswered"
                    @click="submitQuiz(currentRowId)"
                    :class="{'cursor-not-allowed': !allQuestionsAnswered}"
            >
                    Submit Quiz
            </button>
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
               :class="{ 'border-green-500': correctAnswers[index] === true, 'border-red-500': correctAnswers[index] === false , 'border-cyan-500': currentIndex===index}"
          >
                {{ index+1 }}
          </div>
      </div>
  </div>
</template>

<script setup>
  import { ref, onMounted,onBeforeUnmount,computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useTimerStore } from '@/store/timerStore';
  import { useQuizStore } from '@/store/score'
  import { useAuthStore } from '@/store';
  const correctAnswersCount = ref(0);

  const timerStore = useTimerStore();
  const score= useQuizStore();
  const authStore=useAuthStore()

  const questions=ref([]);
  const selectedAnswers=ref([]);
  const currentIndex=ref(0);
  const correctAnswers = ref([]);
  const questionsAnswered=ref();

  const router= useRouter();
  const route = useRoute();
  const quizSetName = route.params.quizSetName;
  const currentRowId = route.params.rowId;



  //check if an option is selected for a question
  const isSelected = (questionIndex, optionIndex) => {
      return selectedAnswers.value[questionIndex] === optionIndex;
  }

  //fetch the random json quiz sets
  const fetchQuizQuestions = async () =>{
      try{
          const quizSet=await import(`./Questions/${quizSetName}.json`)
          const data= quizSet.default;
          questions.value=data.questions;

          //get the selectedAnswers array with the saved selections
          const savedQuizState = localStorage.getItem(`quizState_${quizSetName}`);
    
          if (savedQuizState) {
              const quizState = JSON.parse(savedQuizState);
              selectedAnswers.value = quizState.selectedAnswers;
          } else {
          // if there were no previous selections found, fill selectedAnswers with null 
              selectedAnswers.value = Array(data.questions.length).fill(null);
        }
  }catch(error){
          console.error(error);
      }
  } 

  //function to load the quiz from localstorage
  const loadQuizState = () => {
      const savedQuizState = localStorage.getItem(`quizState_${quizSetName}`);

      if (savedQuizState) {
          const quizState = JSON.parse(savedQuizState);
          selectedAnswers.value = quizState.selectedAnswers;
          correctAnswers.value = quizState.correctAnswers;
          correctAnswersCount.value = quizState.correctAnswersCount;
      }
  }

  //function to save quiz to localstorage

  const saveQuizState = () => {
      const quizState = {
          selectedAnswers: selectedAnswers.value,
          correctAnswers: correctAnswers.value,
          correctAnswersCount: correctAnswersCount.value
      };
      setTimeout(() => {
            localStorage.setItem(`quizState_${quizSetName}`, JSON.stringify(quizState));
      }, 200);
      
}

  //function to go to the next question
  const nextQuestion= ()=>{
      if(currentIndex.value<questions.value.length-1){
          currentIndex.value++;
          saveQuizState();
      }
  }

  //function to go to the previous question 
  const prevQuestion= ()=>{
      if(currentIndex.value>0){
          currentIndex.value--;
          saveQuizState();
      }
  }

const checkIfCorrect=(questionIndex,optionIndex)=>{
    setTimeout(() => {
              selectedAnswers.value[questionIndex] = optionIndex;
              correctAnswers.value[questionIndex] = optionIndex === questions.value[questionIndex].correct_answer;
          }, 400);
    const correctOptionIndex = questions.value[questionIndex].correct_answer;
    if (optionIndex === correctOptionIndex) {
        correctAnswersCount.value++; 
        score.setCorrectAnswersCount(score.correctAnswersCount + 1)
    }
}

  //go automativally to the next question after an option was selected
  const nextQuestionDelayed = (questionIndex, optionIndex) => {
      if(currentIndex.value < questions.value.length - 1){
          currentIndex.value++;
          checkIfCorrect(questionIndex,optionIndex);
          
      }else if(currentIndex.value === questions.value.length - 1){
        
          checkIfCorrect(questionIndex,optionIndex);
      }
      setTimeout(() => {
              saveQuizState();
          }, 200);
      
  }

  const jumptToQuestion= (index)=>{
      currentIndex.value=index;
  }

  const allQuestionsAnswered = computed(() => {
      return selectedAnswers.value.every(answer => answer !== null);
});

  const submitQuiz=(currentRowId)=>{
      const allAnswered= selectedAnswers.value.every(answer => answer !== null);
      if(allAnswered){
            questionsAnswered.value=true;

            const rowIndex = authStore.rows.findIndex(row => row.id === currentRowId);
            const row = authStore.rows.find(row => row.id === parseInt(currentRowId));
    

            const finishedRow = {
                id: currentRowId,
                name:row.name
        };
       
        authStore.addQuizDone(finishedRow);
    
        authStore.rows.splice(rowIndex, 1);
        authStore.saveRows();

           setTimeout(() => {
                router.push('/quizContent/tasks');
           }, 3000);
      }else{
            questionsAnswered.value=false;
      }
  }

  const hasAnswerSelected = (questionIndex) => {
        return selectedAnswers.value[questionIndex] !== null;
}


const quizMoving=function(event){
        if(event.key==="ArrowLeft"){
            prevQuestion();
        }else if(event.key==="ArrowRight"){
            nextQuestion();
        }
    }
    document.addEventListener('keydown', quizMoving);

  //onMounted fetch the data 
  onMounted(()=>{
      fetchQuizQuestions();
      loadQuizState();
      timerStore.startTimer();
  })

  onBeforeUnmount(()=>{
      timerStore.stopTimer();
      document.removeEventListener('keydown', quizMoving);
  })

</script>