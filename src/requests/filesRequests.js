import axios from "@/services/axios";

import {saveFile} from '../services/filesystem.js';

import { useLoadingStore } from '@/stores/loadingStore.js';
const loadingStore = useLoadingStore();

export default{
    async getFile(fileId){
        try {
            loadingStore.setLoading(true);
            loadingStore.setLoadingMessage('getAllFile');

            const response = await axios().get(`/files/${fileId}`, { responseType: 'arraybuffer' });

            const headers = response.headers;
            console.log('headers',headers)

  
            let filename = headers['filename'];
            let mime = headers['mime-type'];

            if(response.data)
              saveFile(response.data, mime, filename);

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

    async removeFile(newsId){
        try {
            loadingStore.setLoading(true);
            loadingStore.setLoadingMessage('removeFile');

            const response = await axios().delete(`/news/${newsId}/files`);

            loadingStore.setLoading(false);
            
            return response;
          } catch (error) {
            
        }
    }
}