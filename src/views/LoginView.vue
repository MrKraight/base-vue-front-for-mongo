<script setup>
  import Text from '../components/Form/Text.vue';
  import { reactive, ref } from 'vue';

  import { useRouter } from 'vue-router';
  const router = useRouter();

  let user = reactive({});

  import { useAuthStore } from '@/stores/authStore.js';
  const authService = useAuthStore();

  import usersRequests from '@/requests/usersRequests';

  async function login(){

      let response = await usersRequests.login(user)
      
      if(response && response.data && response.data.token && response.data.user){
        authService.auth(response.data.user, response.data.token);
        router.push('/');
      }
  }
</script>
<template>
  <div style="padding: 0 !important; margin: 0 auto; background: white; width: 649px; display: flex; flex-direction: column;">
    <div class="container" style="flex: 1;">
      <div class="text-center mt-5">
        <h4 style="font-weight: 500; font-size: 22px;">ВХОД В ТЕСТОВУЮ СИСТЕМУ <br>
    ФРОНТ</h4>
      </div>
      
      <form style="margin-left: 84.5px; margin-right: 84.5px;" class="mt-5">
        <form @keydown.enter="login">
          <Text label="Логин" type="email" v-model="user['login']" autocomplete="username" :inputStyle="'height : 51px; background: #D1DDED4D; border-radius: 0;'" class="mb-4" style="font-size: 18px;"></Text>
          <Text label="Пароль" type="password" v-model="user['password']" autocomplete="current-password" :inputStyle="'height : 51px; background: #D1DDED4D; border-radius: 0;'" class="mb-3" style="font-size: 18px;"></Text>
        </form>
          
        <div class="d-flex justify-content-between text-decoration-none" style="text-decoration: none; margin-bottom: 36px;">
          <router-link to="/registration" class="me-3 text-decoration-none text-primary" style="font-size: 16px; font-weight: 500;">Регистрация</router-link>
        </div>
        
        <a role="button"><button type="button" class="btn btn-primary ps-4 pe-4" style="width: 154px; height: 57px; font-size: 20px;" @click="login">ВОЙТИ</button></a>
      </form>
    </div>
    <div class="bg-secondary" style="width: 100%;">
      <a class="pt-3 ps-5 pb-3 d-block" style="font-size: 14px; color: white; text-decoration: underline; cursor: pointer;">Тестовый фронт для монго апи</a>
    </div>
  </div>
</template>