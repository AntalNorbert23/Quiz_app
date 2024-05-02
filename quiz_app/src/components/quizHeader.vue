<template>
     <header class="flex justify-center items-center h-20 bg-slate-600">
         <div class="flex-1 ps-6 md:ps-8 text-xl md:text-3xl hover:cursor-pointer" @click="pushToQuiz">Quizes application</div>

         <div class="block md:hidden">
            <button @click="toggleMenu" class="p-2 text-white">
                <i class="fa fa-bars"></i>
            </button>
        </div>

         
        <div v-if="menuVisible" class="absolute top-20 right-0 bg-white shadow-lg rounded-md p-2 md:hidden border border-slate-500">
            <button class='px-[11px] py-2 mx-1 text-sm text-black hover:bg-slate-200 border border-slate-300 rounded-lg' @click="showPersonalData">
                Personal data
            </button>
            <transition  enter-active-class="animate__animated animate__zoomIn"
                         leave-active-class="animate__animated animate__zoomOut"
               >
                 <div class="absolute bottom-[-52px] left-3 w-[106px] p-2 rounded-b-lg bg-slate-400"
                      v-if="showPersData"
                 >
                      <p class="m-0 text-xs text-white">Correct: <span>{{ correctAnswersCount }}</span> / 50</p>
                      <p class="m-0 pt-1 text-xs text-white">Time: {{ getTime(timerStore.totalTime) }} </p>
                 </div>
               </transition>
            <button class='px-[11px] py-2 text-sm text-black hover:bg-slate-200 border border-slate-300 rounded-lg' @click="changeLanguage">
                Language
            </button>
            <button class='px-[11px] py-2 mx-1 text-sm text-black hover:bg-slate-200 border border-slate-300 rounded-lg' @click="logOff">
                Log Off
            </button>
        </div>

         <div class="hidden md:flex justify-center items-center h-full">
             <div class="relative h-full flex items-center ">
               <button class=' me-4 px-4 py-2 rounded-md bg-header text-sm md:text-base text-white border border-white hover:text-black hover:cursor-pointer hover:bg-white'
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
             <button class='me-4 px-4 py-2 rounded-md bg-header text-white border border-white hover:text-black hover:cursor-pointer hover:bg-white'
                     @click="showDropdown = !showDropdown"
             >
                Language <span class="fa fa-chevron-circle-down text-center ms-1"></span>
             </button>

             <div
                v-if="showDropdown"
                class="absolute right-26 top-[72px] mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
                <div class="py-1">
                    <a @click="changeLanguage('en')" class="block px-4 py-2 text-sm text-center text-gray-700 hover:bg-gray-100 hover:cursor-pointer">English</a>
                    <a @click="changeLanguage('hu')" class="block px-4 py-2 text-sm text-center text-gray-700 hover:bg-gray-100 hover:cursor-pointer">Magyar</a>
                    <a @click="changeLanguage('ro')" class="block px-4 py-2 text-sm text-center text-gray-700 hover:bg-gray-100 hover:cursor-pointer">Română</a>
                </div>
            </div>

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
    import { useLocaleStore } from './Locales/locales';

    //stores and routers
    const timerStore = useTimerStore();
    const authStore = useAuthStore();
    const score=useQuizStore();
    const router=useRouter();
    const route = useRoute();
    const localeStore = useLocaleStore();

    //variables
    const showLogOff=ref(false);
    const isArrowRotated = ref(false);
    const showPersData=ref(false);
    const quizSetName = ref(null); 
    const menuVisible=ref(false);
    const showDropdown=ref(false);

    // on logoff push user to login page (main)
    const logOff=()=>{
        setTimeout(() => {
            router.push('/');
            authStore.logout();
        }, 1000);
    }

    //toggle Menu
    const toggleMenu=()=> {
            menuVisible.value = !menuVisible.value;
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
        score.setCorrectAnswersCount(0);
        loadCorrectAnswersCount();
    });

    //keep track of the correct answers nr on that specific quizset
    const correctAnswersCount = computed(() => score.correctAnswersCount);

    //function for loading the correct answers nr saved in localstorage
    const loadCorrectAnswersCount = () => {
        if (quizSetName.value) {
            const savedQuizState = localStorage.getItem(`${authStore.getUsername}-quizState_${quizSetName.value}`);
            if (savedQuizState) {
                const quizState = JSON.parse(savedQuizState);
                score.setCorrectAnswersCount(quizState.correctAnswersCount);
            }
        }
    };

    const changeLanguage = (newLocale) => {
        localeStore.setLocale(newLocale);
        showDropdown.value = false; 
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