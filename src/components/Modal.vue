<script setup>
    const {modalClass = null} = defineProps({
        buttonText: String,
        title: String,
        isCircle: Boolean,
        modalClass: String
    })

    let modelValue = defineModel()
    
    const emits = defineEmits(['click']);

    function onClick(){
        modelValue.value = true;
        emits('click');
    }

    function modalClick(){
        modelValue.value = false;
    }
</script>

<template>
    <div>
        <div v-if="isCircle">
            <div class="bg-primary d-flex justify-content-center align-items-center rounded-circle" style="width: 30px; height: 30px; cursor: pointer;" @click="onClick">
              <i :class="'bi text-white ' + buttonText" style="font-size: 15px;"></i>
            </div>
        </div>
        <div v-else>
            <button type="button" class="btn btn-secondary" @click="onClick">
                {{buttonText}}
            </button>
        </div>
        <Teleport to="body">
            <div v-show="modelValue" class="modal show" id="bootstrapModal" tabindex="-1">
                <div class="modal-dialog" :class="modalClass ? modalClass : 'modal-lg'">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-center">{{title}}</h5>
                        <button type="button" class="btn-close" @mousedown="modalClick"></button>
                    </div>
                    <div class="modal-body">
                        <slot></slot>
                    </div>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<style scoped>
    .modal-title{
        width: 100%;
        margin: auto;
        font-size: 18px !important;
        font-weight: 500 !important;
    }
    .show{
        background-color: rgba(0, 0, 0, 0.5);
        display: block;
    }
</style>