import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('store', {
  state: () => ({
    loading: false,
    loadingMessage: 'Загрузка...', // Default loading message
  }),
  actions: {
    setLoading(loading) {
        this.loading = loading;
    },
    setLoadingMessage(message = 'Делается запрос, подождите...'){
        this.loadingMessage = message;
    }
  },
});