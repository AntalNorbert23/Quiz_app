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
    //action for setting the user in the localstorage
    setUser(user) {
      this.user = user;
      localStorage.setItem('user',JSON.stringify(user));
    },
    //action for logging out the user
    logout(){
        this.user=null;
        localStorage.removeItem('user');
    },
    //action for selecting the component (used for UI design)
    selectTaskComponent(component) {
      this.selectedTaskComponent = component;
    },
    //action for handling adding quizset rows
    addRow(rowData) {
      this.rows.push(rowData);
      this.saveRows();
    },
    //action for saving these rows
    saveRows() {
      localStorage.setItem('rows', JSON.stringify(this.rows));
    },
    //action for loading the rows
    loadRows() {
      const savedRows = localStorage.getItem('rows');
      if (savedRows) {
        this.rows = JSON.parse(savedRows);
      }
    },
    //action for adding the quiz to DONES when it is submitted
    addQuizDone(rowData) {
      this.quizzesDone.push(rowData);
      this.saveQuizzesDone();
    },
    //action for saving it in the localstorage
    saveQuizzesDone() {
        localStorage.setItem('quizzesDone', JSON.stringify(this.quizzesDone));
     },
     //action for loading the quizzes done
    loadQuizzesDone() {
      const savedQuizzesDone = localStorage.getItem('quizzesDone');
      if (savedQuizzesDone) {
          this.quizzesDone = JSON.parse(savedQuizzesDone);
      }
    },
    //action to increment the claimedquizzescount 
    incrementClaimedQuizzes() {
      this.claimedQuizzesCount++;
      localStorage.setItem('claimedQuizzesCount', JSON.stringify(this.claimedQuizzesCount));
    },
    //action to decremebt the calimedquizzescount 
    decrementClaimedQuizzesCount() {
      if (this.claimedQuizzesCount > 0) {
          this.claimedQuizzesCount -= 1;
          this.saveClaimedQuizzesCount();
      }
    },
    //save the claimedquizzes nr 
    saveClaimedQuizzesCount() {
        localStorage.setItem('claimedQuizzesCount', JSON.stringify(this.claimedQuizzesCount));
    },
    //load the claimed quizzes  nr 
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