<script setup>
    import { ref, reactive, onBeforeMount, onUnmounted } from "vue";
    import Text from '../components/Form/Text.vue';

    import MdEditor from 'md-editor-v3';

    import newsRequests from '@/requests/newsRequests';
    import filesRequests from '@/requests/filesRequests';

    import Modal from '@/components/Modal.vue';

    import { useSocketStore } from "@/stores/socketConnectionStore";
    let socketService = useSocketStore();

    const api_url = process.env.API_URL;

    let news = ref([]);

    let editorElement = ref(null);
    let createOrUpdateModalShow = ref(false);
    let editedNewsItem = ref(null);
    let requestNewsItem = reactive({file: {},title: null, content: null, htmlContent:null, publicationDate: null});
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
                await newsRequests.updateNews(editedNewsItem.value._id, requestNewsItem);
                await getAllNews();
            }else{
                newsRequests.addNews(requestNewsItem);
            }
            createOrUpdateModalShow.value = false;
            console.log(createOrUpdateModalShow.value);
            if(documentFile.value){
                requestNewsItem.file._id
                await filesRequests.addFile(requestNewsItem.file._id,documentFile.value);
            }
        });
    };

    async function getFile(fileId){
        await filesRequests.getFile(fileId);
    }

</script>

<template>
    <div>
        <Modal v-model="createOrUpdateModalShow" buttonText="Добавить запись" title="Новость" class="d-none">
            <Text v-model="requestNewsItem.title" label="Заголовок"></Text> 
            <md-editor ref="editorElement" @onSave="onSave" v-model="requestNewsItem.content" class="mb-3" language="en-US" :toolbarsExclude="['save']"  />
            <Text v-if="editedNewsItem == null" v-model="requestNewsItem.publicationDate"  label="Дата публикации" type="datetime-local"></Text>
            <input class="form-control mb-3" @change="handleFileChange" type="file">
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
                <div class="card-footer" v-if="newsItem?.file?.name"><button @click="getFile(newsItem.file_id)" class="btn btn-primary" download="">Скачать файл</button></div>
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