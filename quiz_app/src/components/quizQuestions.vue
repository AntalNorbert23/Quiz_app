<template>
  <div>
      <h2>Quiz questions</h2>
      <div v-if="questions.length">
          <div v-for="(question,index) in questions" 
               :key="index"
               v-show="currentIndex === index" 
          >
              <h3>{{ question.question }}</h3>
              <ul>
                  <li v-for="(option,optionIndex) in question.options"
                      :key="optionIndex"
                  >
                      <input type="radio" :id="'option-'+ optionIndex"
                             :value="optionIndex"
                             v-model="selectedAnswers[index]"
                             @click="nextQuestionDelayed"
                      >
                      <label :for="'option_' + optionIndex">{{ option }}</label>
              </li>
              </ul>
          </div>
      </div>
      <div v-else>
          <p>No questions available</p>
      </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';

  const questions=ref([]);
  const selectedAnswers=ref([]);
  const currentIndex=ref(0);

  //fetch the random json quiz sets
  const fetchQuizQuestions = async () =>{
      try{
          //const randomIndex = Math.floor(Math.random()*totalQuizSet)
          const quizSet=await import('./Questions/quiz-set-1.json')
          const data= quizSet.default;
          questions.value=data.questions;
          selectedAnswers.value=Array(data.questions.length).fill(null)
      }catch(error){
          console.error(error);
      }
  }

  //onMounted fetch the data 
  onMounted(()=>{
      fetchQuizQuestions();
  })

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
  const nextQuestionDelayed=()=>{
      if(currentIndex.value<questions.value.length-1){
          setTimeout(() => {
              currentIndex.value++;
          }, 200);
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

  //should also implement the divs of the question to turn red if incorrect, idk yet after whole quiz submit and that's it or after every question
</script>