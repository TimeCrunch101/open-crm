<script setup>
import { ref } from 'vue'
import axios from 'axios'
import {useAuthStore} from "../stores/auth"
import Success from "../components/alerts/Success.vue"
import Error from "../components/alerts/Error.vue"
import ClientFilterInput from "../components/ClientFilterInput.vue"
import { useRouter } from 'vue-router';
const router = useRouter()

const auth = useAuthStore()
const token = ref(auth.getToken)
const contacts = ref([])
const users = ref([])
const success = ref({
    message: null
})
const errorMsg = ref({
    message: null,
    cause: null
})
const form = ref({
    client: null,
    ticketContact: null,
    resource: null,
    title: null,
    description: null,
    status: null,
    priority: null,
})

const createTicket = () => {
    axios.put('/api/create/ticket',{
        client: form.value.client,
        ticketContact: form.value.ticketContact,
        resource: form.value.resource,
        title: form.value.title,
        description: form.value.description,
        status: form.value.status,
        priority: form.value.priority,
    },{
        headers: {
            Authorization: `Bearer ${token.value}`
        }
    }).then((res) => {
        success.value.message = res.data.message
    }).catch((err) => {
        errorMsg.value.message = err.response.data.error
        errorMsg.value.cause = err.response.data.cause
    })
    if (!errorMsg.value.message) {
        router.push('/my/workspace')
    }
}

const captureClientID = (value) => {
    form.value.client = value.clientID
    contacts.value = value.contacts
}

axios.get('/api/get/users',{
    headers: {
        Authorization: `Bearer ${token.value}`
    }
}).then((res) => {
    users.value = res.data.usersArray
}).catch((err) => {
    console.error(err.response.data)
})

</script>
<template>
    <p>New Ticket</p>
    <Success v-if="success.message" :message="success.message"/>
    <Error v-if="errorMsg.message" :errorMessage="errorMsg.message" :errorCause="errorMsg.cause"/>
    <form @submit.prevent="createTicket()">
        <ClientFilterInput @set-client="captureClientID" :token="token"/>
        
        <label for="ticketContact" class="input-label">Ticket Contact</label>
        <select name="ticketContact" id="ticketContact" class="form-select" v-model="form.ticketContact">
            <option v-for="contact in contacts" :value="contact.contactID">{{ contact.fullName }}</option>
        </select>
    
        <label for="resource" class="input-label">resource</label>
        <!-- <input type="text" class="form-control" v-model="form.resource"> -->
        <select name="resource" id="resource" class="form-select" v-model="form.resource">
            <option v-for="user in users" :value="user.userID">{{ user.fullName }}</option>
        </select>
    
        <label for="title" class="input-label">Title</label>
        <input type="text" class="form-control" v-model="form.title">
    
        <label for="description" class="input-label">Description</label>
        <input type="text" class="form-control" v-model="form.description">
    
        <label for="status" class="input-label">Status</label>
        <select class="form-select" name="status" id="status" v-model="form.status">
            <option value="New" selected>New</option>
            <option value="Closed">Closed</option>
            <option value="In Progress">In Progress</option>
            <option value="Waiting on client">Waiting on client</option>
        </select>
    
        <label for="priority" class="input-label">priority</label>
        <select class="form-select" name="priority" id="priority" v-model="form.priority">
            <option value="Medium" selected>Medium</option>
            <option value="Low">Low</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
        </select>
        <button type="submit" class="btn btn-success">Create Ticket</button>
    </form>
</template>
<style scoped>

</style>