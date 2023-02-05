<script setup>
import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import { useClientStore } from '../stores/clients';
import { ref, onBeforeMount } from 'vue';
import Error from '../components/alerts/Error.vue'
import Success from '../components/alerts/Success.vue';
import ClientTable from '../components/ClientTable.vue';
// import { useRoute, useRouter } from 'vue-router'
// const route = useRoute()
// const router = useRouter()

const auth = useAuthStore()
const clientStore = useClientStore()
const success = ref({
    message: null
})
const error = ref({
    message: null,
    cause: null
})
const token = ref(auth.getToken)



onBeforeMount(() => {
    axios.get("/api/get/clients", {
        headers: {
            Authorization: `Bearer ${token.value}`
        }
    }).then((res) => {
        clientStore.setClients(res.data.clients)
    }).catch((err) => {
        error.value.message = err.response.data.message
        error.value.cause = err.response.data.cause
    })
})
</script>

<template>
    <Success v-if="success.message" :message="success.message"/>
    <Error v-if="error.message" :errorMessage="error.message" :errorCause="error.cause"/>
    <ClientTable/>
</template>