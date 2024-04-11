import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user'))||null,
    selectedTaskComponent: 'tasks',
    rows: JSON.parse(localStorage.getItem('rows')) || [],
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
  },
  getters: {
    getUsername() {
      return this.user ? this.user.username : '';
    },
  },
});