<script setup>
    import { ref, reactive, onBeforeMount, onUnmounted } from "vue";
    import Text from '../components/Form/Text.vue';

    import MdEditor from 'md-editor-v3';

    import newsRequests from '@/requests/newsRequests';
    import filesRequests from '@/requests/filesRequests';

    import Modal from '@/components/Modal.vue';

    import { useSocketStore } from "@/stores/socketConnectionStore";
    let socketService = useSocketStore();


    let news = ref([]);

    let editorElement = ref(null);
    let createOrUpdateModalShow = ref(false);
    let editedNewsItem = ref(null);
    let requestNewsItem = reactive({file: null,title: null, content: null, htmlContent:null, publicationDate: null});
    let documentFile = ref(null);

    onBeforeMount(async () => {
        await getAllNews();
    })

    socketService.socketEvents.on('notification', getAllNews);
    onUnmounted(() => {
      socketService.socketEvents.off('notification', getAllNews)
    })

    async function getAllNews(){
        let response = await newsRequests.getAllNews();
        news.value = response.data;
        createOrUpdateModalShow.value = false;
    }

    function mergeObjects(obj1, obj2) {
        for (const key in obj2) {
            let res = obj1?.[key] ? obj1[key] : null;
            obj2[key] = obj2.hasOwnProperty(key) ? res : null;
        }
    }

    function createNews(){
        editedNewsItem.value = null;
        mergeObjects({},requestNewsItem);
        createOrUpdateModalShow.value = true
    }

    function editNews(newsItem){
        editedNewsItem.value = {...newsItem};
        mergeObjects(editedNewsItem.value, requestNewsItem);
        requestNewsItem._id = newsItem._id;
        createOrUpdateModalShow.value = true
    }

    function handleFileChange(event) {
        const selectedFile = event.target.files[0];
        documentFile.value = selectedFile;
    }

    async function addOrUpdateNews(){
        editorElement.value?.triggerSave();
    }

    async function removeNews(newsItemId){
        if (confirm('Вы уверены что хотите удалить новость?')) {
            await newsRequests.removeNews(newsItemId);
            await getAllNews();
        }
    }

    async function onSave(v, h){
        h.then(async html => {
            requestNewsItem.htmlContent = html;
            if(editedNewsItem.value){
                await newsRequests.updateNews(editedNewsItem.value._id, requestNewsItem, documentFile.value);
                await getAllNews();
            }else{
                await newsRequests.addNews(requestNewsItem, documentFile.value);
            }

            createOrUpdateModalShow.value = false;
        });
    };

    async function getFile(fileId){
        await filesRequests.getFile(fileId);
    }

    async function deleteFile(newsId){
        if(confirm("Вы уверены что хотите удалить файл?")){
            requestNewsItem.file = null;
            await filesRequests.removeFile(newsId);
            await getAllNews();
        }
    }

</script>

<template>
    <div>
        <Modal v-model="createOrUpdateModalShow" buttonText="Добавить запись" title="Новость" class="d-none">
            <Text v-model="requestNewsItem.title" label="Заголовок"></Text> 
            <md-editor ref="editorElement" @onSave="onSave" v-model="requestNewsItem.content" class="mb-3" language="en-US" :toolbarsExclude="['save']"  />
            <Text v-if="editedNewsItem == null" v-model="requestNewsItem.publicationDate"  label="Дата публикации" type="datetime-local"></Text>
            <div class="btn-group btn-group-sm mb-3 w-100">
                <input class="form-control input-group-text" @change="handleFileChange" type="file">
                <button v-if="requestNewsItem.file && requestNewsItem.file.name" @click="deleteFile(requestNewsItem._id)" class="btn btn-danger" style="width: 150px;">Удалить файл</button>
            </div>
            <button class="btn btn-primary" @click="addOrUpdateNews">Сохранить</button>
        </Modal>
        <button class="btn btn-primary mb-3" @click="createNews">Создать новость</button>
        <div class="d-flex flex-wrap justify-content-between">
            <div v-for="newsItem in news" :key="newsItem._id" class="card mb-3" style="width: 48%;">
                <div class="card-header">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="card-title">{{ newsItem.title }}</h5>
                            <span class="text-muted">Дата создания: {{ newsItem.publicationDate }}</span>
                        </div>
                        <div>
                            <a href="#" class="btn btn-link" @click="editNews(newsItem)">
                                <i class="bi bi-pencil"></i> Редактировать
                            </a>
                            <a href="#" class="btn btn-link" @click="removeNews(newsItem._id)">
                                <i class="bi bi-trash"></i> Удалить
                            </a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="news-item default-theme" v-html="newsItem.htmlContent ? newsItem.htmlContent : newsItem.content"></div>
                </div>
                <div class="card-footer" v-if="newsItem?.file?.name">
                    <button @click="getFile(newsItem.file._id)" class="btn btn-primary">Скачать файл</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    img {
        width: 100%;
        max-width: 100%; /* Optional, but helps prevent image distortion */
        height: auto; /* Maintain aspect ratio */
    }
</style>