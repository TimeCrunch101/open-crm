<script setup>
import axios from 'axios';
import {ref, onBeforeMount} from "vue";
import Error from "./alerts/Error.vue"
import Success from './alerts/Success.vue';

const notes = ref([])
const error = ref({
    message: null,
    cause: null
})
const success = ref({
    message: null,
})

const props = defineProps({
    clientID: String,
    token: String
})

onBeforeMount(() => {
    axios.get(`/api/get/client/notes/${props.clientID}`,{
        headers: {
            Authorization: `Bearer ${props.token}`
        }
    }).then((res) => {
        notes.value = res.data.notes
    }).catch((err) => {
        error.value.message = err.response.data.error
        error.value.cause = err.response.data.cause
    })
})

const deleteNote = (noteID) => {
    axios.delete(`/api/delete/note/${noteID}`,{
        headers: {
            Authorization: `Bearer ${props.token}`
        }
    }).then((res) => {
        success.value.message = res.data.message
    }).catch((err) => {
        error.value.message = err.response.data.error 
        error.value.cause = err.response.data.cause 
    })
}

const pinNote = (noteID) => {
    axios.patch(`/api/update/client/${props.clientID}/pinNote`,{
        noteID: noteID
    },{
        headers: {
            Authorization: `Bearer ${props.token}`
        }
    }).then((res) => {
        success.value.message = res.data.message
    }).catch((err) => {
        console.log(err.response.data.error) // TODO: Remove console.log
        console.log(err.response.data.cause) // TODO: Remove console.log
    })
}


</script>
<template>
<Success v-if="success.message" :message="success.message"/>
<Error v-if="error.message" :errorMessage="error.message" :errorCause="error.cause"/>
<div v-for="note in notes">
    <hr>
    <p>{{ note.note }}</p>
    <p>TimeStamp: {{ note.timestamp }}</p>
    <p>Author: {{ note.author }}</p>
    <div class="button-div">
        <button class="btn btn-outline-danger" @click="deleteNote(note.noteID)" type="button">delete</button>
        <button class="btn btn-outline-success" @click="pinNote(note.noteID)">Pin</button>
    </div>
</div>
</template>
<style>

</style>