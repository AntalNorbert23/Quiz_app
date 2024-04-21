import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user'))||null,
    selectedTaskComponent: 'tasks',
    rows: JSON.parse(localStorage.getItem('rows')) || [],
    quizzesDone: JSON.parse(localStorage.getItem('quizzesDone')) || [],
    claimedQuizzesCount: JSON.parse(localStorage.getItem('claimedQuizzesCount')) || 0,
  }),
  actions: {
    setUser(user) {
      this.user = user;
      localStorage.setItem('user',JSON.stringify(user));
    },
    logout(){
        this.user=null;
        localStorage.removeItem('user');
    },
    selectTaskComponent(component) {
      this.selectedTaskComponent = component;
    },
    addRow(rowData) {
      this.rows.push(rowData);
      this.saveRows();
    },
    saveRows() {
      localStorage.setItem('rows', JSON.stringify(this.rows));
    },
    loadRows() {
      const savedRows = localStorage.getItem('rows');
      if (savedRows) {
        this.rows = JSON.parse(savedRows);
      }
    },
    addQuizDone(rowData) {
      this.quizzesDone.push(rowData);
      this.saveQuizzesDone();
    },
    saveQuizzesDone() {
        localStorage.setItem('quizzesDone', JSON.stringify(this.quizzesDone));
     },
    loadQuizzesDone() {
      const savedQuizzesDone = localStorage.getItem('quizzesDone');
      if (savedQuizzesDone) {
          this.quizzesDone = JSON.parse(savedQuizzesDone);
      }
    },
    incrementClaimedQuizzes() {
      this.claimedQuizzesCount++;
      localStorage.setItem('claimedQuizzesCount', JSON.stringify(this.claimedQuizzesCount));
    },
    decrementClaimedQuizzesCount() {
      if (this.claimedQuizzesCount > 0) {
          this.claimedQuizzesCount -= 1;
          this.saveClaimedQuizzesCount();
      }
    },
    saveClaimedQuizzesCount() {
        localStorage.setItem('claimedQuizzesCount', JSON.stringify(this.claimedQuizzesCount));
    },
    loadClaimedQuizzesCount() {
      const savedClaimedQuizzesCount = localStorage.getItem('claimedQuizzesCount');
      if (savedClaimedQuizzesCount) {
          this.claimedQuizzesCount = JSON.parse(savedClaimedQuizzesCount);
      } else {
          this.claimedQuizzesCount = 0;
      }
    }
    },
  getters: {
    getUsername() {
      return this.user ? this.user.username : '';
    },
  },
});