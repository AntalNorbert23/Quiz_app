// timerStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useAuthStore } from '.';


export const useTimerStore = defineStore({
  id: 'timer',
  state: () => ({
    startTime: ref(null),
    totalTime: ref(0),
    timerInterval: null,
  }),
  actions: {
    //action for starting the timer
    startTimer() {
      const savedTime = this.loadTimeFromLocalStorage();
      this.startTime = savedTime !== null ? Date.now() - savedTime : Date.now();
      
      this.timerInterval = setInterval(() => {
        this.totalTime = Date.now() - this.startTime;
        this.saveTimeToLocalStorage();
      }, 1000);
    },
    //action for stopping the timer 
    stopTimer() {
      clearInterval(this.timerInterval);
      this.totalTime = Date.now() - this.startTime;
      this.saveTimeToLocalStorage();
    },
    //action for reset the timer
    resetTimer() {
      this.startTime = null;
      this.totalTime = 0;
      this.clearTimeFromLocalStorage();
    },
    //saving timer to localstorage
    saveTimeToLocalStorage() {
      const authStore = useAuthStore(); 
      localStorage.setItem(`${authStore.getUsername}-quizTime`, this.totalTime.toString());
    },
    //loading timer from localstorage
    loadTimeFromLocalStorage() {
      const authStore = useAuthStore(); 
      const savedTime = localStorage.getItem(`${authStore.getUsername}-quizTime`);
      return savedTime !== null ? parseInt(savedTime) : null;
    },
    //removing timer from localstorage
    clearTimeFromLocalStorage() {
      const authStore = useAuthStore(); 
      localStorage.removeItem(`${authStore.getUsername}-quizTime`);
    },
  },
});


