<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import axios from 'axios';
import ClientFilterInput from '../components/ClientFilterInput.vue';
import Error from '../components/alerts/Error.vue';

const error = ref({
    message: null,
    cause: null
})
const users = ref([])
const router = useRouter()
const auth = useAuthStore()
const form = ref({
    clientID: null,
    title: null,
    summary: null,
    due: null,
    projectedHours: null,
    primaryResource: null,
})

axios.get('/api/get/users',{
    headers: {
        Authorization: `Bearer ${auth.getToken}`
    }
}).then((res) => {
    users.value = res.data.usersArray
}).catch((err) => {
    error.value.message = err.response.data.error
    error.value.cause = err.response.data.cause
})

const createProject = () => {
    const month = new Date(form.value.due).getUTCMonth()+1
    const day = new Date(form.value.due).getUTCDate()
    const year = new Date(form.value.due).getUTCFullYear()
    const dueDate = `${month}/${day}/${year}`
    axios.put('/api/create/project',{
        clientID: form.value.clientID,
        title: form.value.title,
        summary: form.value.summary,
        due: dueDate,
        projectedHours: form.value.projectedHours,
        primaryResource: form.value.primaryResource,
    },{
        headers: {
            Authorization: `Bearer ${auth.getToken}`
        }
    }).then((res) => {
        router.push(`/client/${form.value.clientID}`)
    }).catch((err) => {
        console.log(err.response.data.cause)
    })
}

const setClient = (value) => {
    form.value.clientID = value.clientID
}



</script>

<template>
    <Error v-if="error.message" :errorMessage="error.message" :errorCause="error.cause"/>
    <form @submit.prevent="createProject()">

        <ClientFilterInput @set-client="setClient" :token="auth.getToken"/>

        <label for="title" class="input-label">Project Title</label>
        <input type="text" name="title" id="title" class="form-control" v-model="form.title">

        <div class="form-floating mt-3">
            <textarea class="form-control"  id="summary" style="height: 100px" v-model="form.summary"/>
            <label for="summary">Summary</label>
        </div>

        <label for="due" class="input-label">Due:</label>
        <input class="form-control date-input" type="date" name="due" id="due" v-model="form.due">

        <label for="projectedHours" class="input-label">Projected Hours:</label>
        <input type="number" class="form-control hours-input" v-model="form.projectedHours">

        <label for="primaryResource" class="input-label">resource</label>
        <select name="primaryResource" id="primaryResource" class="form-select" v-model="form.primaryResource">
            <option v-for="user in users" :value="user.userID">{{ user.fullName }}</option>
        </select>
        
        <button type="submit" class="btn btn-outline-primary">Create Project</button>
    </form>
</template>
<style scoped>
form {
    max-width: 600px;
}
.date-input {
    max-width: fit-content;
}
.hours-input {
    max-width: 200px;
}
textarea {
    
}

</style>