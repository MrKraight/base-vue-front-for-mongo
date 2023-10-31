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

    async addNews(news, file){
        try {
            loadingStore.setLoading(true);
            loadingStore.setLoadingMessage('addNews');


            console.log('file',file)


            let formData = new FormData();
            if(file)
                formData.append('file', file, file.name);      

            formData.append('news', JSON.stringify(news));

            const config = {
                headers: {
                  'content-type': 'multipart/form-data',
                }
            };
            
            console.log('formData',formData)

            const response = await axios().post("/news", formData, config);

            loadingStore.setLoading(false);           
            
            return response;
          } catch (error) {
            
        }
    },

    async updateNews(newsId, news, file){
        try{
            loadingStore.setLoading(true);
            loadingStore.setLoadingMessage('updateNews');

            let formData = new FormData();
            if(file)
                formData.append('file', file);      

            formData.append('news', JSON.stringify(news));

            const config = {
                headers: {
                  'content-type': 'multipart/form-data',
                }
            };

            console.log('formData',formData)

            const response = await axios().put(`/news/${newsId}`, formData, config);

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