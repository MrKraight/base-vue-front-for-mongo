<script setup>
    import { ref, onMounted } from 'vue';

    import { useAuthStore } from '@/stores/authStore.js';
    const authService = useAuthStore();


    function logout(){
        if (confirm('Вы уверены что хотите выйти?')) 
            authService.logout();
    }
</script>


<template>
     <nav class="navbar navbar-expand navbar-light bg-white d-flex justify-content-between p-3 ps-5 pe-5">
        <router-link to="/" class="text-decoration-none header-nav d-flex align-items-center">
            <span style="font-weight: 600; font-size: 20px; line-height: 24.2px; color:black; letter-spacing: 0.05em">СИСТЕМА ТЕСТОВАЯ<br> ДЛЯ ДЕМОНСТРАЦИИ</span>
        </router-link>
        <div class="text-decoration-none header-nav mt-3 d-flex flex-column">
            <span style="font-weight: 500; font-size: 18px; line-height: 21.78px;">
                Телефон 1<br>
                Телефон 2
            </span>
        </div>
        <div class="text-decoration-none header-nav">
            <div class="d-flex mt-3">
                <div class="d-flex flex-column me-2">
                    <span style="line-height: 18.13px; font-size: 14px;">
                        {{authService.user.login}}
                    </span>
                </div>
            </div>
        </div>
    </nav>
    <nav class="navbar navbar-expand navbar-light bg-primary d-flex justify-content-between ps-5" style="height: 54px;">
        <ul class="navbar-nav" style="padding-top: 6px;">
            <router-link to="/" class="nav-item nav-link text-decoration-none header-nav">
                Главная
            </router-link>
            <router-link to="/login" @click="logout()" class="nav-item nav-link text-decoration-none header-nav">       
                Выйти
            </router-link>
        </ul>
    </nav>
</template>

<style scoped>
    .navbar-nav .nav-link.nav-item:first-child{
        padding-left: 0 !important;
    }
    .dropdown-toggle::after{
        display: none;
    }

    .nav-link:not(.active){
        color: white;
    }

    .nav-link{
        line-height: 18.75px;
        font-size: 16px;
    }
</style>