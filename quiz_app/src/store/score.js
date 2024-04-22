
import { defineStore } from 'pinia';

export const useQuizStore = defineStore({
  id: 'main',
  state: () => ({
    correctAnswersCount: 0
  }),
  //handling correct answers nr count
  actions: {
    setCorrectAnswersCount(count) {
      this.correctAnswersCount = count;
    }
  },
  getters: {
    getCorrectAnswersCount(state) {
      return state.correctAnswersCount;
    }
  }
});

