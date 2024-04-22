<template>
     <header class="flex justify-center items-center h-20 bg-slate-600">
         <div class="flex-1 ps-8 text-3xl hover:cursor-pointer" @click="pushToQuiz">Quizes application</div>
         <div class="flex justify-center items-center h-full">
             <div class="relative h-full flex items-center ">
               <button class=' me-4 px-4 py-2 rounded-md bg-header text-white border border-white hover:text-black hover:cursor-pointer hover:bg-white'
                       @click="showPersonalData"
               >
                  Personal data
               </button>
               <transition  enter-active-class="animate__animated animate__zoomIn"
                            leave-active-class="animate__animated animate__zoomOut"
               >
                 <div class="absolute bottom-[-40px] w-32 p-2 rounded-b-lg bg-slate-600"
                      v-if="showPersData"
                 >
                      <p class="m-0 text-xs text-white">Correct: <span>{{ correctAnswersCount }}</span> / 50</p>
                      <p class="m-0 pt-1 text-xs text-white">Total time: {{ getTime(timerStore.totalTime) }} </p>
                 </div>
               </transition>
             </div>
             <button class='me-4 px-4 py-2 rounded-md bg-header text-white border border-white hover:text-black hover:cursor-pointer hover:bg-white'>
                Language <span class="fa fa-chevron-circle-down text-center ms-1"></span>
             </button>
             <div class="relative h-full flex items-center" @click="toggleLogOff">
               <button class="me-4 px-4 py-2 text-white">
                 {{authStore.getUsername}} <span :class="{ 'rotate-180': isArrowRotated, 'rotate-back': !isArrowRotated }" class="fa fa-chevron-circle-down text-center ms-1"></span>
               </button>
               <transition
                           enter-active-class="animate__animated animate__fadeInDown"
                           leave-active-class="animate__animated animate__fadeOutUp"
                           
               >
                 <div class="absolute top-full left-5 -ml-2 flex items-start rounded-b-lg bg-slate-600"
                      v-if="showLogOff"
                 >
                      <button class="pb-3 pt-1 px-3 text-sm text-white z-10 hover:text-slate-300" @click="logOff">LOG OFF</button>
                 </div>
               </transition>
             </div>
         </div>  
    </header>
</template>

<script setup>

    //imports
    import { useAuthStore } from '@/store/index';
    import { useRouter } from 'vue-router';
    import { ref, computed,watch} from 'vue';
    import { useTimerStore } from '@/store/timerStore';
    import { useRoute } from 'vue-router';
    import { useQuizStore } from '@/store/score';

    //stores and routers
    const timerStore = useTimerStore();
    const authStore = useAuthStore();
    const score=useQuizStore();
    const router=useRouter();
    const route = useRoute();

    //variables
    const showLogOff=ref(false);
    const isArrowRotated = ref(false);
    const showPersData=ref(false);
    const quizSetName = ref(null); 

    // on logoff push user to login page (main)
    const logOff=()=>{
        setTimeout(() => {
            router.push('/');
            authStore.logout();
        }, 1000);
    }

    //toggle logoff (to be seen or not on click)
    const toggleLogOff=()=>{
          showLogOff.value=!showLogOff.value;
          isArrowRotated.value = !isArrowRotated.value;
    }

    //toggle personal data
    const showPersonalData=()=>{
        showPersData.value=!showPersData.value;
    }

    //on title click push user to tasks 
    const pushToQuiz=()=>{
          router.push('/quizContent/tasks');
          authStore.selectedTaskComponent='tasks';
    }

    //get time from localstorage managed in timeStore
    const getTime = () => {
      const savedTime = timerStore.loadTimeFromLocalStorage();
      return savedTime !== null ? formatTime(savedTime) : '00:00';
    };

    //format the time (minutes::seconds)
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60000);
      const seconds = ((time % 60000) / 1000).toFixed(0);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    //watch for the quizSet if changes so it can manage the state separately for each quizSet ( here the nr of the correct answers)
    watch(() => route.params.quizSetName, (newQuizSetName) => {
        quizSetName.value = newQuizSetName;
        loadCorrectAnswersCount();
    });

    //keep track of the correct answers nr on that specific quizset
    const correctAnswersCount = computed(() => score.correctAnswersCount);

    //function for loading the correct answers nr saved in localstorage
    const loadCorrectAnswersCount = () => {
        if (quizSetName.value) {
            const savedQuizState = localStorage.getItem(`quizState_${quizSetName.value}`);
            if (savedQuizState) {
                const quizState = JSON.parse(savedQuizState);
                score.setCorrectAnswersCount(quizState.correctAnswersCount);
            }
        }
    };

    </script>

    <style scoped>
      .rotate-180 {
        transform: rotate(180deg);
        transition: transform 0.5s ease;
      }
      .rotate-back {
      transform: rotate(0deg);
      transition: transform 0.5s ease;
    }
</style>