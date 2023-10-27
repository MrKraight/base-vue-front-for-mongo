import axios from "axios";

const api_url = process.env.API_URL;

import router from '../router';

import chalk from 'chalk';

import { useAuthStore } from '@/stores/authStore.js';
const authService = useAuthStore();

export default(url=`${api_url}`) => {
    let instance = axios.create({
        baseURL: url,
    })

    instance.interceptors.request.use(
        async (config) => {
          console.log(`${config.method.toUpperCase()} ${chalk.green('Request')} ${chalk.blue.underline(api_url + config.url)}`);
          if(config.data){
            console.log(config.data);
          }
          const { useAuthStore } = await import('@/stores/authStore');
            const authStore = useAuthStore();
            const token = authStore.token;
        
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
        
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
    );

    instance.interceptors.response.use(
      response => {
        console.log(`${chalk.cyan('Response')} ${chalk.blue.underline(api_url + response.config.url)}`);
        if(response.data)
          console.log(response.data);
        return response;
      },
      error => {
        console.log("Threre is response error", error);
        // Redirect to the login page
        if (error.response.status === 401) {
          authService.logout();
          router.push('/login');
        }
        return Promise.reject(error);
      }
    );

    return instance;
}