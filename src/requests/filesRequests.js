import axios from "@/services/axios";

import { useLoadingStore } from '@/stores/loadingStore.js';
const loadingStore = useLoadingStore();

export default{
    async getFile(fileId){
        try {
            loadingStore.setLoading(true);
            loadingStore.setLoadingMessage('getAllFile');

            const response = await axios().get(`/files/${fileId}`);

            loadingStore.setLoading(false);
            
            return response;
          } catch (error) {
            
        }
    },

    async addFile(fileId, file){
        try {

            let formData = new FormData();
            formData.append('file', file);

            loadingStore.setLoading(true);
            loadingStore.setLoadingMessage('addFile');
            

            const response = await axios().post(`/files/${fileId}`, formData);

            loadingStore.setLoading(false);           
            
            return response;
          } catch (error) {
            
        }
    },

    async removeFile(fileId){
        try {
            loadingStore.setLoading(true);
            loadingStore.setLoadingMessage('removeFile');

            const response = await axios().delete(`/files/${fileId}`);

            loadingStore.setLoading(false);
            
            return response;
          } catch (error) {
            
        }
    }
}