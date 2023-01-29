<script setup>
import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import { ref } from 'vue';
import Error from '../components/alerts/Error.vue'
import Success from '../components/alerts/Success.vue';
const auth = useAuthStore()
const success = ref({
    message: null
})
const error = ref({
    message: null,
    cause: null
})
const clients = ref([])
const token = ref(auth.getToken)

axios.get("/api/get/clients", {
    headers: {
        Authorization: `Bearer ${token.value}`
    }
}).then((res) => {
    clients.value = res.data.clients
}).catch((err) => {
    error.value.message = err.response.data.message
    error.value.cause = err.response.data.cause
})

const deleteClient = (clientID) => {
    axios.delete(`/api/delete/client/${clientID}`,{
        headers: {
            Authorization: `Bearer ${token.value}`
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
    <div class="container mt-5">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Client</th>
                    <th scope="col">Address</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="client in clients">
                    <td><router-link :to="'/client/' + client.clientID">{{ client.companyName }}</router-link></td>
                    <td>
                        {{ client.street }}
                        {{ client.city }},
                        {{ client.state }},
                        {{ client.zip }},
                        {{ client.country }}
                    </td>
                    <td>{{ client.primaryPhone }}</td>
                    <td><i @click="deleteClient(client.clientID)" class="bi bi-trash3-fill"></i></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.bi-trash3-fill:hover {
    cursor: pointer;
}
</style>