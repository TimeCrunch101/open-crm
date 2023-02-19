<script setup>
import axios from 'axios';
import { ref, reactive } from 'vue'
import Error from './alerts/Error.vue';
import Success from './alerts/Success.vue';

const props = defineProps({
    token: String,
    clientID: String,
})
const error = ref({
    message: null,
    cause: null
})
const success = reactive({
    message: false
})
const contacts = reactive({
    value: null
})

const deleteContact = (contactID, index) => {
    contacts.value.splice(index, 1)
    axios.delete(`/api/delete/client/contact/${contactID}`,{
        headers: {
            Authorization: `Bearer ${props.token}`
        }
    }).then((res) => {
        success.message = res.data.message
    }).catch((err) => {
        error.value.message = err.response.data.error
        error.value.cause = err.response.data.cause
    })
}

const setPOC = (contactID) => {
    axios.patch(`/api/update/client/setPOC/${props.clientID}`,{
        contactID: contactID
    }, {
        headers: {
            Authorization: `Bearer ${props.token}`
        }
    }).then((res) => {
        success.message = res.data.message
    }).catch((err) => {
        error.value.message = err.response.data.error
        error.value.cause = err.response.data.cause
    })
}

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
    <Success v-if="success.message" :message="success.message" />
    <Error v-if="error.message" :errorMessage="error.message" :errorCause="error.cause" />
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Full Name</th>
                <th scope="col">Email</th>
                <th scope="col">Primary Phone</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(contact, index) in contacts.value">
                <td>{{ contact.fullName }}</td>
                <th><a :href="`mailto:${contact.email}`">{{ contact.email }}</a></th>
                <td>{{ contact.primaryPhone }}</td>
                <td class="d-flex">
                    <i @click="deleteContact(contact.contactID, index)" class="bi bi-trash3-fill"></i>
                    <i @click="setPOC(contact.contactID)" class="bi " :class="{'bi-star-fill':contact.isPOC===1,'bi-star':contact.isPOC === 0} "></i>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
.bi-trash3-fill:hover {
    cursor: pointer;
}
.bi-star:hover {
    cursor: pointer;
}
.d-flex {
    gap: 1em;
}
</style>