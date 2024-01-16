<script setup>
    import { ref } from 'vue';

    defineProps({
        label: String
    })

    let modelValue = defineModel();

    let fileInput = ref(null)

    const handleFileChange = () => {
        if (fileInput.value.files.length > 0) {
            modelValue.value.push(fileInput.value.files[0]);
            fileInput.value = null; // Clear the input for the same file to be selected again
        }
    };

    const removeFile = (index) => {
        modelValue.value.splice(index, 1);
    };
</script>

<template>
    <fieldset>
        <legend class="form-label mb-2" style="font-weight: 600 !important;">{{ label }}</legend>
        <div v-for="(file, index) in modelValue" :key="index" class="d-flex mb-2">
            <span style="font-size: 15px; font-weight: 300;">{{ file.name }}</span>
            <div @click="removeFile(index)" class="bg-danger d-flex justify-content-center rounded-circle ms-3" style="width: 21px; height: 21px; cursor: pointer;">
            <i class="bi bi-x text-white" style="font-size: 15px;"></i>
            </div>
        </div>
        <label class="btn btn-primary">
            Загрузить файл
            <input type="file" style="display: none" ref="fileInput" @change="handleFileChange"/>
        </label>
    </fieldset>
</template>
  
