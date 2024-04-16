<template>
     <header class="flex bg-slate-600 h-20 justify-center items-center ">
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
                 <div class="absolute bottom-[-40px] bg-slate-600 w-32 p-2 rounded-b-lg"
                      v-if="showPersData"
                 >
                      <p class="m-0 text-xs text-white">Time: </p>
                      <p class="m-0 text-xs text-white pt-1">Total time: {{ getTime(timerStore.totalTime) }} </p>
                 </div>
               </transition>
             </div>
             <button class=' me-4 px-4 py-2 rounded-md bg-header text-white border border-white hover:text-black hover:cursor-pointer hover:bg-white'>
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
                 <div class="absolute top-full left-5 -ml-2 bg-slate-600 rounded-b-lg flex items-start"
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
  import { useAuthStore } from '@/store/index';
  import { useRouter } from 'vue-router';
  import { ref} from 'vue';
  import { useTimerStore } from '@/store/timerStore';

const timerStore = useTimerStore();
const authStore = useAuthStore();
const router=useRouter();
const showLogOff=ref(false);
const isArrowRotated = ref(false);
const showPersData=ref(false);

const logOff=()=>{
    setTimeout(() => {
        router.push('/');
        authStore.logout();
    }, 1000);
}

const toggleLogOff=()=>{
      showLogOff.value=!showLogOff.value;
      isArrowRotated.value = !isArrowRotated.value;
}

const showPersonalData=()=>{
    showPersData.value=!showPersData.value;
}

const pushToQuiz=()=>{
      router.push('/quizContent/tasks');
      authStore.selectedTaskComponent='tasks';
}

const getTime = () => {
  const savedTime = timerStore.loadTimeFromLocalStorage();
  return savedTime !== null ? formatTime(savedTime) : '00:00';
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60000);
  const seconds = ((time % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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