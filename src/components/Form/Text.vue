<script setup>
    import Floating from './Floating.vue';

    const {type = 'text'} = defineProps({
        label: String,
        type: String,
        inputStyle: String,
        placeholder: String
    })

    const modelValue = defineModel()
</script>
<template>
    <Floating :label="label">
        <input :type="type"  class="form-control" v-model="modelValue" :placeholder="placeholder ? placeholder : label" :style="inputStyle">
    </Floating>
</template>