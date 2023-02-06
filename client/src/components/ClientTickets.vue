<script setup>
import axios from 'axios';
import { ref } from 'vue';

const props = defineProps({
    token: String,
    clientID: String
})
const tickets = ref([])
axios.get(`/api/get/client/tickets/${props.clientID}`, {
    headers: {
        Authorization: `Bearer ${props.token}`
    }
}).then((res) => {
    tickets.value = res.data.tickets
}).catch((err) => {
    console.error(err.response.data)
})

</script>

<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Ticket Number</th>
                <th scope="col">Title</th>
                <th scope="col">Created</th>
                <th scope="col">Status</th>
                <th scope="col">Priority</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="ticket in tickets">
                <th>{{ ticket.ticketNumber }}</th>
                <th>{{ ticket.title }}</th>
                <td>{{ ticket.created }}</td>
                <td>{{ ticket.status }}</td>
                <td>{{ ticket.priority }}</td>
            </tr>
        </tbody>
    </table>
</template>