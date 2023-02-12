<script setup>
import axios from 'axios';
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Error from "../components/alerts/Error.vue"
import ClientNotes from '../components/ClientNotes.vue';
import CreateClientNote from '../components/CreateClientNote.vue';
import ClientContacts from '../components/ClientContacts.vue';
import ClientTickets from '../components/ClientTickets.vue';
import ClientProjects from '../components/ClientProjects.vue';
import CreateClientContact from "../components/CreateClientContact.vue"

const auth = useAuthStore()
const route = useRoute()
const token = ref(auth.getToken)
const client = ref({})
const pinnedNote = reactive({
    note: null,
    hide: null
})
const error = ref({
    message: null,
    cause: null
})

const unpinNote = (noteID) => {
    pinnedNote.hide = true
    axios.patch(`/api/update/client/unpin-note/${route.params.clientID}`,{},{
        headers: {
            Authorization: `Bearer ${token.value}`
        }
    }).catch((err) => {
        error.value.message = err.response.data.error
        error.value.cause = err.response.data.cause
    })
}

axios.get(`/api/get/client/${route.params.clientID}`, {
    headers: {
        Authorization: `Bearer ${token.value}`
    }
}).then((res) => {
    client.value = res.data.client
    if (res.data.pinnedNote) {
        pinnedNote.note = res.data.pinnedNote.note
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
                <div v-if="pinnedNote.note !== null" class="pinned-note mt-3 mb-3" :class="{hidden: pinnedNote.hide === true}">
                    <i @click="unpinNote(pinnedNote.noteID)" class="bi bi-pin-angle-fill"></i>
                    <p>{{ pinnedNote.note }}</p>
                </div>
                <p>Primary Number:<br /> {{ client.primaryPhone }}</p>
                <p>Main Location:<br />{{ client.street }}<br />{{ client.city }} {{ client.state }} {{ client.zip }}<br />{{ client.country }}</p>
            </div>
            <div class="tab-pane fade" id="contacts-tab-pane" role="tabpanel" aria-labelledby="contacts-tab" tabindex="0">
                <CreateClientContact/>
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
                <ClientProjects :token="token" :clientID="route.params.clientID"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pinned-note {
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 15px;
    border-radius: 1em;
    height: fit-content;
    width: max-content;
    display: flex;
}
.pinned-note > p {
    margin-bottom: 0px;
    margin-left: .5em;
    color: orange;
}
.bi-pin-angle-fill {
    color: orange;
    font-size: 1.2rem;
}
.bi-pin-angle-fill:hover {
    cursor: pointer;
}
.hidden {
    display: none;
}
</style>