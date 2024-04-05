import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user'))||null,
    selectedComponent: 'tasks',
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
    setSelectedComponent(component) {
      this.selectedComponent = component;
    },
  },
  getters: {
    getUsername() {
      return this.user ? this.user.username : '';
    },
  },
});