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
    startTimer() {
      const savedTime = this.loadTimeFromLocalStorage();
      this.startTime = savedTime !== null ? Date.now() - savedTime : Date.now();
      
      this.timerInterval = setInterval(() => {
        this.totalTime = Date.now() - this.startTime;
        this.saveTimeToLocalStorage();
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timerInterval);
      this.totalTime = Date.now() - this.startTime;
      this.saveTimeToLocalStorage();
    },
    resetTimer() {
      this.startTime = null;
      this.totalTime = 0;
      this.clearTimeFromLocalStorage();
    },
    saveTimeToLocalStorage() {
      localStorage.setItem('quizTime', this.totalTime.toString());
    },
    loadTimeFromLocalStorage() {
      const savedTime = localStorage.getItem('quizTime');
      return savedTime !== null ? parseInt(savedTime) : null;
    },
    clearTimeFromLocalStorage() {
      localStorage.removeItem('quizTime');
    },
  },
});


