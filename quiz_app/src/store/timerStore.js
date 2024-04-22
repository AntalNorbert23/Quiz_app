// timerStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

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
      localStorage.setItem('quizTime', this.totalTime.toString());
    },
    //loading timer from localstorage
    loadTimeFromLocalStorage() {
      const savedTime = localStorage.getItem('quizTime');
      return savedTime !== null ? parseInt(savedTime) : null;
    },
    //removing timer from localstorage
    clearTimeFromLocalStorage() {
      localStorage.removeItem('quizTime');
    },
  },
});


