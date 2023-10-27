<script setup>
    defineProps({
        loadingMessage: String
    })
</script>

<template>
    <div role="alert" class="alert alert-warning d-flex align-items-center justify-content-center">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">LЗагрузка...</span>
        </div>
        <div class="text-center mx-3">
            <p class="my-2">Пожалуйста, подождите, пока запрос выполняется : {{ loadingMessage }}</p>
        </div>
  </div>
</template>