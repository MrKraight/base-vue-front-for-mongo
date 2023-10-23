import axios from "@/services/axios";

import { useLoadingStore } from '@/stores/loadingStore.js';
const loadingStore = useLoadingStore();

export default{
    async getAllRequesits(){
        try {
            loadingStore.setLoading(true);
            loadingStore.setLoadingMessage('getAllRequesits');

            const response = await axios().get("/bank_requisits");

            loadingStore.setLoading(false);
            
            return response;
          } catch (error) {
            
        }
    },

    async addRequesit(requesit){
        try {
            loadingStore.setLoading(true);
            loadingStore.setLoadingMessage('addRequesit');
            

            const response = await axios().post("/bank_requisits", requesit);

            loadingStore.setLoading(false);           
            
            return response;
          } catch (error) {
            
        }
    },

    async updateRequesit(requesitId, requesit){
        try{
            loadingStore.setLoading(true);
            loadingStore.setLoadingMessage('updateRequesit');
            

            const response = await axios().put(`/bank_requisits/${requesitId}`, requesit);

            loadingStore.setLoading(false);           
            
        }
        catch(error){
            
        }
    },

    async removeRequesit(requesitId){
        try {
            loadingStore.setLoading(true);
            loadingStore.setLoadingMessage('removeRequesit');

            const response = await axios().delete(`/bank_requisits/${requesitId}`);

            loadingStore.setLoading(false);
            
            return response;
          } catch (error) {
            
        }
    },

    async getRequesitById(requesitId){
        try {
            loadingStore.setLoading(true);
            loadingStore.setLoadingMessage('getRequesitById');

            const response = await axios().get(`/bank_requisits/${requesitId}`);

            loadingStore.setLoading(false);
            
            return response;
          } catch (error) {
            
        }
    },
}