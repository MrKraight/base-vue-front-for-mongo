import axios from "@/services/axios";

import { useLoadingStore } from '@/stores/loadingStore.js';
const loadingStore = useLoadingStore();

export default{
    async getAllNews(){
        try {
            loadingStore.setLoading(true);
            loadingStore.setLoadingMessage('getAllNews');

            const response = await axios().get("/news");

            loadingStore.setLoading(false);
            
            return response;
          } catch (error) {
            
        }
    },

    async addNews(news){
        try {
            loadingStore.setLoading(true);
            loadingStore.setLoadingMessage('addNews');
            

            const response = await axios().post("/news", news);

            loadingStore.setLoading(false);           
            
            return response;
          } catch (error) {
            
        }
    },

    async updateNews(newsId, news){
        try{
            loadingStore.setLoading(true);
            loadingStore.setLoadingMessage('updateNews');
            

            const response = await axios().put(`/news/${newsId}`, news);

            loadingStore.setLoading(false);           
            
        }
        catch(error){
            
        }
    },

    async removeNews(newsId){
        try {
            loadingStore.setLoading(true);
            loadingStore.setLoadingMessage('removeNews');

            const response = await axios().delete(`/news/${newsId}`);

            loadingStore.setLoading(false);
            
            return response;
          } catch (error) {
            
        }
    }
}