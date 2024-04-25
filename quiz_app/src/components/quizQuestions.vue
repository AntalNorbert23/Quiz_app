<template>
  <div>
      <h2 class="text-4xl p-3">Quiz questions</h2>
      <div v-if="questionsAnswered === true"
           class="flex justify-center items-center h-10 bg-green-500"
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
               class="flex flex-col items-center justify-center pt-3 text-2xl" 
          >
              <h3 class="text-center px-6">{{ question.question }}</h3>
              <div class="flex">
                  <div class="flex flex-col items-center justify-center pe-6">
                      <p v-for="(option,optionIndex) in question.options">{{ shortcutLetters[optionIndex] }}</p>
                  </div>
                  <ul class="pt-3 pb-4">
                      <li v-for="(option,optionIndex) in question.options"
                          :key="optionIndex"
                          class="flex items-center"
                      >
                            <input type="radio" :id="'option-' + index + '-' + optionIndex"
                                 :value="optionIndex"
                                 v-model="selectedAnswers[index]"
                                 @click="nextQuestionDelayed(index, optionIndex)"
                                 :checked="isSelected(index, optionIndex)"
                                 :disabled="hasAnswerSelected(index)"
                                 class="pe-6 me-3 cursor-pointer focus:outline-slate-600 focus-within:outline-slate-600"
                                 :class="{'cursor-not-allowed': hasAnswerSelected(index) === true}"
                            >
                            <label :for="'option-' + index + '-' + optionIndex">{{ option }}</label>
                    </li>
                  </ul>
              </div>
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
               class=" px-2 text-center cursor-pointer mx-3 my-1 border-black border hover:border-cyan-400"
               :class="{ 'border-green-500': correctAnswers[index] === true, 'border-red-500': correctAnswers[index] === false , 'border-cyan-500': currentIndex===index}"
          >
                {{ index+1 }}
          </div>
      </div>
  </div>
</template>

<script setup>
    //imports
    import { ref, onMounted,onBeforeUnmount,computed } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useTimerStore } from '@/store/timerStore';
    import { useQuizStore } from '@/store/score'
    import { useAuthStore } from '@/store';
    
    //stores and routers 
    const timerStore = useTimerStore();
    const score= useQuizStore();
    const authStore=useAuthStore();
    const router= useRouter();
    const route = useRoute();
    const quizSetName = route.params.quizSetName;
    const currentRowId = route.params.rowId;

    //variables
    const questions=ref([]);
    const selectedAnswers=ref([]);
    const currentIndex=ref(0);
    const correctAnswersCount = ref(0);
    const correctAnswers = ref([]);
    const questionsAnswered=ref();
    const shortcutLetters = ['(A)','(S)','(D)','(F)'];

  
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
            const savedQuizState = localStorage.getItem(`${authStore.getUsername}-quizState_${quizSetName}`);
        
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
        const savedQuizState = localStorage.getItem(`${authStore.getUsername}-quizState_${quizSetName}`);

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
                localStorage.setItem(`${authStore.getUsername}-quizState_${quizSetName}`, JSON.stringify(quizState));
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

    //function for check if the selected answer was correct if so then increment the correctAnswercount value and set it in the score storage
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

    //function to jump to a specific question at a given index (if the user clicks on a question nr)
    const jumptToQuestion= (index)=>{
        currentIndex.value=index;
    }

    //check if all questions are answered
    const allQuestionsAnswered = computed(() => {
        return selectedAnswers.value.every(answer => answer !== null);
    });

    function removeClaimedIDFromLocalStorage() {
        //retrieve the list of claimed IDs from local storage
        const claimedIDs = JSON.parse(localStorage.getItem(`${authStore.getUsername}-claimedIDs`)) || [];
        
        // find the index of the ID to be removed
        const index = claimedIDs.indexOf(Number(currentRowId));
        
        // check if the ID is found and remove it from the array then save back to localstorage
        if (index !== -1) {
            claimedIDs.splice(index, 1);
            
            const updatedClaimedIDs = JSON.stringify(claimedIDs);
            
            localStorage.setItem(`${authStore.getUsername}-claimedIDs`, updatedClaimedIDs);
        }else{
            console.log("not found")
        }
    }
    
    //logic/function for submitting quiz 
    const submitQuiz=(currentRowId)=>{
        const allAnswered= selectedAnswers.value.every(answer => answer !== null);

        //check if all of the questions was answered
        if(allAnswered){
                questionsAnswered.value=true;

                //get the current quiz set that has been submitted (the row from the tasks component)
                const currentRowIdTypeAdjusted = parseInt(currentRowId, 10)
                const rowIndex = authStore.rows.findIndex(row => row.id ===  currentRowIdTypeAdjusted);
                const row = authStore.rows.find(row => row.id === parseInt(currentRowId));
                
                const savedQuizState=localStorage.getItem(`${authStore.getUsername}-quizState_${quizSetName}`);
                const quizStateObj = JSON.parse(savedQuizState);
                
                const finishedRow = {
                    id: currentRowId,
                    name:row.name,
                    correctAnswersCount: quizStateObj.correctAnswersCount
            };
            
            //add to the store the finished row
            authStore.addQuizDone(finishedRow);
            
            //splice the correct row (by getting it's index -rowIndex) from rows (so from the tasks component practically) and save the state
            authStore.rows.splice(rowIndex, 1);
            authStore.saveRows();

            //decrement the claimed quizes number
            authStore.decrementClaimedQuizzesCount();

            //remove the states and names of the quizsets
            setTimeout(() => {
                localStorage.removeItem(`${authStore.getUsername}-quizState_${quizSetName}`);
                localStorage.removeItem(`${authStore.getUsername}-randomQuizSetName_${currentRowId}`)
                removeClaimedIDFromLocalStorage();
            }, 100);
          

            setTimeout(() => {
                    router.push('/quizContent/tasks');
            }, 3000);
        }else{
                questionsAnswered.value=false;
        }
    }

    // check if the quiz question was already marked
    const hasAnswerSelected = (questionIndex) => {
        return selectedAnswers.value[questionIndex] !== null;
    }

    //move between questions with arrows from keypad
    const quizMoving=function(event){
            if(event.key==="ArrowLeft"){
                prevQuestion();
            }else if(event.key==="ArrowRight"){
                nextQuestion();
            }
        }

    document.addEventListener('keydown', quizMoving);
    
    //shortcuts for selecting options for the questions
    const selectShortcut = (event) => {
        const keysToOptions = {
            'A': 0, 
            'S': 1, 
            'D': 2, 
            'F': 3 
        };

        const optionIndex = keysToOptions[event.key.toUpperCase()];
        if (optionIndex !== undefined) {

            //logic for not letting modify the answer for the question once it has been already answered
            if(hasAnswerSelected(currentIndex.value)){
                return;
            }
            nextQuestionDelayed(currentIndex.value, optionIndex);
        }
    };

    document.addEventListener('keyup',selectShortcut);


    //onMounted fetch the data 
    onMounted(()=>{
        fetchQuizQuestions();
        loadQuizState();
        timerStore.startTimer();
    })

    onBeforeUnmount(()=>{
        timerStore.stopTimer();
        document.removeEventListener('keydown', quizMoving);
        document.removeEventListener('keyup',selectShortcut);
    })

</script>