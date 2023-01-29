<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Error from "../components/alerts/Error.vue"
const auth = useAuthStore()
const route = useRoute()

const client = ref({})
const error = ref({})

axios.get(`/api/get/client/${route.params.clientID}`,{
    headers: {
        Authorization: `Bearer ${auth.getToken}`
    }
}).then((res) => {
    client.value = res.data.client
}).catch((err) => {
    error.value.message = err.response.data.message
    error.value.cause = err.response.data.cause
})


</script>

<template>
<Error v-if="error.message" :errorMessage="error.message" />
<div class="container mt-2">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">Home</li>
            <li class="breadcrumb-item active" aria-current="page">Clients</li>
        </ol>
    </nav>
    <h4>{{ client.companyName }}</h4>
    <p>Primary Number:<br/> {{ client.primaryPhone }}</p>
    <p>Main Location:<br/>{{ client.street }}<br/>{{ client.city }} {{ client.state }} {{ client.zip }}<br/>{{ client.country }}</p>
</div>


</template>