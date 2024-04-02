<template>
     <header class="flex bg-slate-600 h-20 justify-center items-center ">
         <div class="flex-1 ps-8 text-3xl">Quizes application</div>
         <div class="flex justify-center items-center">
             <button class=' me-4 px-4 py-2 rounded-md bg-header text-white border border-white hover:text-black hover:cursor-pointer hover:bg-white'>
                Personal data
             </button>
             <button class=' me-4 px-4 py-2 rounded-md bg-header text-white border border-white hover:text-black hover:cursor-pointer hover:bg-white'>
                Language <span class="fa fa-chevron-circle-down text-center ms-1"></span>
             </button>
             <button class="me-4 px-4 py-2 ">
               {{authStore.getUsername}} <span class="fa fa-chevron-circle-down text-center ms-1"></span>
             </button>  
         </div>  
    </header>
</template>

<script setup>
  import { useAuthStore } from '@/store/index';
  
const authStore = useAuthStore();
console.log(authStore.user);
</script>