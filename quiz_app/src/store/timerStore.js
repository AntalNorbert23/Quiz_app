// timerStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTimerStore = defineStore({
  id: 'timer',
  state: () => ({
    startTime: ref(null),
    endTime: ref(null),
    totalTime: ref(0),
    timerInterval: null,
  }),
  actions: {
    startTimer() {
        this.startTime = Date.now()-this.totalTime;
        this.timerInterval = setInterval(() => {
            this.totalTime = Date.now() - this.startTime;
        }, 1000);
    },
    stopTimer() {
      clearInterval(this.timerInterval);
      this.endTime = Date.now();
      this.totalTime = this.endTime - this.startTime;
    },
    resetTimer() {
      this.startTime = null;
      this.endTime = null;
      this.totalTime = 0;
    },
  },
});


