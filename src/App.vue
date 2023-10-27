<script setup>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";

import LoadingBar from "./components/LoadingBar.vue";

import { useSocketStore } from "@/stores/socketConnectionStore";
import { useAuthStore } from "@/stores/authStore.js";
import { useLoadingStore } from "@/stores/loadingStore.js";
import { onBeforeMount } from "vue";

const authService = useAuthStore();
const socketService = useSocketStore();
const loadingStore = useLoadingStore();

onBeforeMount(() => {
  authService.checkCookies();
})

</script>

<template>
  <div class="d-flex justify-content-center align-items-center bg-light">
    <div class="d-flex flex-column block-main">
      <loading-bar
        v-if="loadingStore.loading"
        :loading-message="loadingStore.loadingMessage"
        class="m-0"
      ></loading-bar>
      <span
        v-if="authService.isActiveUser && !socketService?.isConnected"
        class="alert alert-danger m-0"
        role="alert"
        style="display: block; width: 0px; min-width: 100%"
      >
        Не удаётся подключиться к апи(через socket io, запросы не отправляются
        host: {{ socketService?.host }})
      </span>
      <div v-if="authService.isActiveUser">
        <nav-bar></nav-bar>
      </div>
      <router-view class="router-main ps-5 pe-5" />
      <div v-if="authService.isActiveUser">
        <Footer></Footer>
      </div>  
    </div>
  </div>
</template>

<style>
.router-main {
  padding-bottom: 24px;
  padding-top: 24px;
  flex: 1 1 auto;
  padding-left: 56px;
  padding-right: 56px;
}
.block-main {
  min-width: 997px;
  min-height: 100vh;
  width: 100%;
  max-width: 1463px;
  position: relative;
}
</style>
