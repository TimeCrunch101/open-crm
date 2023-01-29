<script setup>
import axios from 'axios';
import { ref } from 'vue';
import Error from './alerts/Error.vue';
import Success from './alerts/Success.vue';
const form = ref({
    note: null
})
const props = defineProps({
    clientID: String,
    token: String
})
const success = ref({
    message: null
})
const error = ref({
    message: null,
    cause: null
})

const createNote = () => {
    axios.put('/api/create/client/note',{
        note: form.value.note,
        clientID: props.clientID
    },{
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

</script>
<template>
    <Success v-if="success.message" :message="success.message"/>
    <Error v-if="error.message" :errorMessage="error.message" :errorCause="error.cause"/>
    <form @submit.prevent="createNote()">
        <div class="form-floating">
            <textarea class="form-control" id="note" style="height: 100px" v-model="form.note"></textarea>
            <label for="floatingTextarea2">Comments</label>
        </div>
        <button type="submit" class="btn btn-outline-primary mt-1">Add Note</button>
    </form>
</template>
<style scoped>
.form-floating {
    width: 400px;
}
</style>