<template>
     <header class="flex bg-slate-600 h-20 justify-center items-center ">
         <div class="flex-1 ps-8 text-3xl">Quizes application</div>
         <div class="flex justify-center items-center h-full">
             <button class=' me-4 px-4 py-2 rounded-md bg-header text-white border border-white hover:text-black hover:cursor-pointer hover:bg-white'>
                Personal data
             </button>
             <button class=' me-4 px-4 py-2 rounded-md bg-header text-white border border-white hover:text-black hover:cursor-pointer hover:bg-white'>
                Language <span class="fa fa-chevron-circle-down text-center ms-1"></span>
             </button>
             <div class="relative h-full flex items-center" @click="toggleLogOff">
               <button class="me-4 px-4 py-2 text-white">
                 {{authStore.getUsername}} <span :class="{ 'transform rotate-180': isArrowRotated }" class="fa fa-chevron-circle-down text-center ms-1"></span>
               </button>
               <transition
                           enter-to-class="animate__animated animate__fadeInDown"
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
  import { ref } from 'vue';
  
const authStore = useAuthStore();
const router=useRouter();
const showLogOff=ref(false);
const isArrowRotated = ref(false);

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
</script>

<style scoped>
  .rotate-180 {
    transition: transform 0.5s ease;
  }
</style>