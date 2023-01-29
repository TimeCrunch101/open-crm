<script setup>
import axios from 'axios';
import { ref, defineAsyncComponent, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Error from "../components/alerts/Error.vue"
import ClientNotes from '../components/ClientNotes.vue';
import CreateClientNote from '../components/CreateClientNote.vue';

const auth = useAuthStore()
const route = useRoute()
const token = ref(auth.getToken)
const client = ref({})
const error = ref({
    message: null,
    cause: null
})

axios.get(`/api/get/client/${route.params.clientID}`,{
    headers: {
        Authorization: `Bearer ${token.value}`
    }
}).then((res) => {
    client.value = res.data.client
}).catch((err) => {
    error.value.message = err.response.data.error
    error.value.cause = err.response.data.cause
})


// onBeforeMount(() => {
//     fetchData()
// })



</script>

<template>
<Error v-if="error.message" :errorMessage="error.message" :errorCause="error.cause"/>
<div class="container mt-2">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page"> <router-link to="/clients">Clients</router-link> </li>
            <li class="breadcrumb-item active" aria-current="page">{{ client.companyName }}</li>
        </ol>
    </nav>
    <p>Primary Number:<br/> {{ client.primaryPhone }}</p>
    <p>Main Location:<br/>{{ client.street }}<br/>{{ client.city }} {{ client.state }} {{ client.zip }}<br/>{{ client.country }}</p>
    <ClientNotes :token="token" :clientID="route.params.clientID"/>
    <CreateClientNote :token="token" :clientID="route.params.clientID"/>
</div>


</template>