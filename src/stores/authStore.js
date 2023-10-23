import { defineStore } from 'pinia';

import Cookies from 'js-cookie';

import { useSocketStore } from "@/stores/socketConnectionStore";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
  }),

  actions: {
    auth(user, token){
      const socketService = useSocketStore();

      this.token = token;
      this.user = user;

      this.saveToCookies();

      socketService.connect(token);
    },

    logout() {
      const socketService = useSocketStore();

      this.token = null;
      this.user = null;

      this.clearCookies();

      socketService.disconnect();
    },

    saveToCookies() {
      Cookies.set('token', this.token);
      const userJSON = JSON.stringify(this.user);
      Cookies.set('user', userJSON);
    },

    clearCookies() {
      Cookies.remove('token');
      Cookies.remove('user');
    },

    checkCookies() {
      const token = Cookies.get('token');
      const storedUser = Cookies.get('user');

      if (token && storedUser) {
        const user = JSON.parse(storedUser);
        this.auth(user, token);
      }
    },
  },

  getters: {
    isActiveUser() {
      return this.user && this.token;
    }
  }
});