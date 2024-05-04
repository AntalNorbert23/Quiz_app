<template>
    <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-8 rounded-lg text-white text-center">
      <div class="w-full h-2 bg-white animate-loading"></div>
      <p class="mt-4">{{ localeStore.translate("creatingaccount") }}</p>
    </div>
  </template>
  

  <script setup>
    import { onMounted } from 'vue';
    import { useLocaleStore } from './Locales/locales';

    const localeStore=useLocaleStore();

    onMounted(()=>{
      localeStore.loadLocale();
    })
  </script>
  
  <style scoped>
  @keyframes loading {
    0% {
      width: 0;
    }
    50% {
      width: 50%;
    }
    100% {
      width: 100%;
    }
  }
  
  .animate-loading {
    animation: loading 2s infinite;
  }
  </style>