<script setup>
    defineProps({
        id: String,
        label: String
    })
</script>

<template>
    <div class="mb-3">
        <div>
            <label class="form-label" style="font-weight: 500;" :for="id">{{ label }}</label>
            <slot></slot>
        </div>
    </div>  
</template>

<style scoped>
    .form-floating>label {
        padding: 0.5rem 0.75rem !important;
        font-size: 9pt;
    }
</style>