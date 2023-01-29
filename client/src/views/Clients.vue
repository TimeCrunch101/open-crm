<script setup>
import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import { ref } from 'vue';
import Error from '../components/alerts/Error.vue'
const auth = useAuthStore()

const error = ref({})
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

</script>

<template>
    <Error v-if="error.message" :errorMessage="error.message" />
    <div class="container mt-5">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Client</th>
                    <th scope="col">Address</th>
                    <th scope="col">Phone Number</th>
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
                </tr>
            </tbody>
        </table>
    </div>
</template>