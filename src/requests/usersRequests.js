import axios from "@/services/axios";

import { useLoadingStore } from '@/stores/loadingStore.js';
const loadingStore = useLoadingStore();

export default{
    async login(user){
        try {
            loadingStore.setLoading(true);
            loadingStore.setLoadingMessage('login');

            const response = await axios().post("/login", user);

            loadingStore.setLoading(false);
            
            return response;
          } catch (error) {
            loadingStore.setLoadingMessage('Неверный логин или пароль');            
        }
    },

    async addUser(user){
        try {
            loadingStore.setLoading(true);
            loadingStore.setLoadingMessage('addUser');
            

            const response = await axios().post("/users", user);

            loadingStore.setLoading(false);           
            
            return response;
          } catch (error) {
            
        }
    }
}