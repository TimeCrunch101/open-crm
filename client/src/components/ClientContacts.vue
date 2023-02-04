<script setup>
import axios from 'axios';
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import Error from './alerts/Error.vue';
const route = useRoute()
const props = defineProps({
    token: String,
    clientID: String,
})
const error = ref({
    message: null,
    cause: null
})
const contacts = ref([])

axios.get(`/api/get/client/contacts/${props.clientID}`, {
    headers: {
        Authorization: `Bearer ${props.token}`
    }
}).then((res) => {
    contacts.value = res.data.contacts
}).catch((err) => {
    error.value.message = err.response.data.error
    error.value.cause = err.response.data.cause
})

</script>
<template>
    <Error v-if="error.message" :errorMessage="error.message" :errorCause="error.cause" />
    <table class="table">
        <thead>
            <tr>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Email</th>
                <th scope="col">Primary Phone</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="contact in contacts">
                <td>{{ contact.firstName }}</td>
                <td>{{ contact.lastName }}</td>
                <th><a :href="`mailto:${contact.email}`">{{ contact.email }}</a></th>
                <td>{{ contact.primaryPhone }}</td>
            </tr>
        </tbody>
    </table>
</template>