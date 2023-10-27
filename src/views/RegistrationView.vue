<script setup>
  import { reactive} from 'vue';
  import Text from '../components/Form/Text.vue'; 

  import usersRequests from '@/requests/usersRequests';

  import { useRouter } from 'vue-router';
  const router = useRouter();

  let model = reactive ({});
 
  import { useAuthStore } from '@/stores/authStore.js';
  const authService = useAuthStore();

  async function registrate(){
      model.role = 'client';
      let userData ={
        login: model.login,
        password: model.password
      }
      
      let response = await usersRequests.addUser(userData);
      
      if(response){
        alert('Вы успешно зарегистрировались')
        router.push('/');
      }
      else
        alert('Регистрация не удалась')
  }

</script>
<template>
  <div style="padding: 0 !important; margin: 0 auto; background: white; width: 649px; display: flex; flex-direction: column;">
    <div style="flex: 1;">
        <div class="text-center mt-5">
          <h4 style="font-weight: 500; font-size: 22px;">РЕГИСТРАЦИЯ В ТЕСТОВОЙ СИСТЕМЕ <br>
      ФРОНТ</h4>
        </div>
      <form style="margin-left: 84.5px; margin-right: 84.5px;" @keydown.enter="registrate" class="mt-5">
        <Text label="Введите логин (email)" type="email" v-model="model['login']" placeholder="mail@mail.ru" :inputStyle="'height : 51px; background: #D1DDED4D; border-radius: 0;'" class="mb-4" style="font-size: 18px;"></Text>
        <Text label="Введите пароль" type="password" v-model="model['password']" :inputStyle="'height : 51px; background: #D1DDED4D; border-radius: 0;'" class="mb-4" style="font-size: 18px;"></Text>

        <div class="d-flex justify-content-between text-decoration-none" style="text-decoration: none;">
          <button type="button" class="btn btn-primary ps-4 pe-4 mt-2" @click="registrate">{{ authService.isActiveUser ? 'Зарегистрировать компанию' : 'Зарегистрироваться'}}</button>
          <router-link to="/login" class="mt-2 text-decoration-none" style="font-weight: 500;">Уже зарегистрированы?</router-link>
        </div>
      </form>
    </div>
    <div class="bg-secondary" style="width: 100%;">
        <a class="pt-3 ps-5 pb-3 d-block" style="font-size: 14px; color: white; text-decoration: underline; cursor: pointer;">Тестовый фронт для монго апи</a>
      </div>
  </div>
</template>