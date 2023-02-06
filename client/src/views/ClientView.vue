<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Error from "../components/alerts/Error.vue"
import ClientNotes from '../components/ClientNotes.vue';
import CreateClientNote from '../components/CreateClientNote.vue';
import ClientContacts from '../components/ClientContacts.vue';
import ClientTickets from '../components/ClientTickets.vue';

const auth = useAuthStore()
const route = useRoute()
const token = ref(auth.getToken)
const client = ref({})
const pinnedNote = ref({
    note: null
})
const error = ref({
    message: null,
    cause: null
})

axios.get(`/api/get/client/${route.params.clientID}`, {
    headers: {
        Authorization: `Bearer ${token.value}`
    }
}).then((res) => {
    client.value = res.data.client
    if (res.data.pinnedNote) {
        pinnedNote.value = res.data.pinnedNote
    }
}).catch((err) => {
    error.value.message = err.response.data.error
    error.value.cause = err.response.data.cause
})

</script>

<template>
    <Error v-if="error.message" :errorMessage="error.message" :errorCause="error.cause" />
    <div class="container mt-2">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page"> <router-link to="/clients">Clients</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">{{ client.companyName }}</li>
            </ol>
        </nav>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="main-tab" data-bs-toggle="tab" data-bs-target="#main-tab-pane" type="button" role="tab" aria-controls="main-tab-pane" aria-selected="true">Main</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="contacts-tab" data-bs-toggle="tab" data-bs-target="#contacts-tab-pane" type="button" role="tab" aria-controls="contacts-tab-pane" aria-selected="false">Contacts</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Notes</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="tickets-tab" data-bs-toggle="tab" data-bs-target="#tickets-tab-pane" type="button" role="tab" aria-controls="tickets-tab-pane" aria-selected="false">Tickets</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="projects-tab" data-bs-toggle="tab" data-bs-target="#projects-tab-pane" type="button" role="tab" aria-controls="projects-tab-pane" aria-selected="false">Projects</button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="main-tab-pane" role="tabpanel" aria-labelledby="main-tab" tabindex="0">
                <div v-if="pinnedNote.note" class="pinned-note mt-3 mb-3">
                    <p>{{ pinnedNote.note }}</p>
                </div>
                <p>Primary Number:<br /> {{ client.primaryPhone }}</p>
                <p>Main Location:<br />{{ client.street }}<br />{{ client.city }} {{ client.state }} {{ client.zip }}<br />{{ client.country }}</p>
            </div>
            <div class="tab-pane fade" id="contacts-tab-pane" role="tabpanel" aria-labelledby="contacts-tab" tabindex="0">
                <ClientContacts :token="token" :clientID="route.params.clientID"/>
            </div>
            <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                <p>Notes</p>
                <ClientNotes :token="token" :clientID="route.params.clientID" />
                <CreateClientNote :token="token" :clientID="route.params.clientID" />
            </div>
            <div class="tab-pane fade" id="tickets-tab-pane" role="tabpanel" aria-labelledby="tickets-tab" tabindex="0">
                <ClientTickets :token="token" :clientID="route.params.clientID"/>
            </div>
            <div class="tab-pane fade" id="projects-tab-pane" role="tabpanel" aria-labelledby="projects-tab" tabindex="0">
                <p>Projects</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pinned-note {
    outline: 2px solid orange;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 15px;
    border-radius: 1em;
    height: fit-content;
    width: max-content;
}
.pinned-note > p {
    margin-bottom: 0px;
    margin-left: 1em;
    color: orange;
}
</style>