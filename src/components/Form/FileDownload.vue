<script setup>
    import { onBeforeMount } from 'vue';

    let modelValue = defineModel();

    import { saveAs } from 'file-saver';
    import { Buffer } from 'buffer';

    let {fileName, removeFileFunc, getFileFunc} = defineProps({
        label: String,
        fileName: String,
        removeFileFunc: Function,
        getFileFunc: Function
    })

    onBeforeMount(async() => {
        let file = await getFileFunc();
        let data = Buffer.from(file.data, 'base64')
        if(data && data.length > 0)
            modelValue.value = data;
    })

    async function removeFileFunction(){
        if(confirm('Вы уверены что хотите удалить файл?')){
            await removeFileFunc()
                modelValue.value = null;
        }
    }

    function saveFile(buffer){
        const url = window.URL.createObjectURL(new Blob([buffer]), { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        if(fileName)
            saveAs(url, fileName);
        else
            saveAs(url);      
    }
</script>
<template>
    <fieldset>
        <legend class="form-label mb-2" style="font-weight: 600 !important;">{{ label }}</legend>
            <div class="d-flex mb-2">
                <span @click="saveFile" class="text-blue" style="text-decoration: underline; font-size: 15px; font-weight: 300;">{{ fileName }}</span>
                <div @click="removeFileFunction" class="bg-danger d-flex justify-content-center rounded-circle ms-3" style="width: 21px; height: 21px; cursor: pointer;">
                    <i class="bi bi-x text-white" style="font-size: 15px;"></i>
                </div>
            </div>
    </fieldset>
</template>