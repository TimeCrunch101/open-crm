<script setup>
import { ref, defineEmits } from "vue";
import axios from "axios";

const emit = defineEmits(['set-client'])
const clientName = ref("");
const clients = ref([])
const clientSearch = ref([])
const props = defineProps({
    token: String
})

axios.get("/api/get/clients",{
    headers: {
        Authorization: `Bearer ${props.token}`
    }
}).then((res) => {
    clients.value = res.data.clients
}).catch((err) => {
    console.error('Could not fetch data')
})

const search = () => {
    clientSearch.value = clients.value.filter((client) => client.companyName.toLowerCase().includes(clientName.value.toLowerCase()))
}

const selectClient = (clientID, companyName) => {
    axios.get(`/api/get/client/contacts/${clientID}`,{
        headers: {
            Authorization: `Bearer ${props.token}`
        }
    }).then((res) => {
        emit('set-client', {
            clientID: clientID,
            contacts: res.data.contacts
        })
    }).catch((err) => {
        console.log(err.response.data) // TODO: Remove console.log
    })
    clientName.value = companyName
    clientSearch.value = []
}

</script>

<template>
    <input class="form-control search-clients" @keyup="search()" type="text" placeholder="Select Client..." v-model="clientName"/>
    <!-- <div v-if="clientSearch.length < 10" class="search-results" v-for="searchResult in clientSearch"> -->
    <div v-if="clientSearch.length < 20 && clientSearch.length !== 0"  class="search-results" >
        <p  v-for="searchResult in clientSearch" class="search-items" @click="selectClient(searchResult.clientID, searchResult.companyName)">{{ searchResult.companyName }}</p>
    </div>
 </template>

<style scoped>
.search-clients {
    position: relative;
}
.search-results {
    border-left: 1px solid rgb(80, 80, 131);
    border-right: 1px solid rgb(80, 80, 131);
    border-bottom: 2px solid rgb(80, 80, 131);
    display: flex;
    flex-direction: column;
    padding: 1em;
    position: absolute;
    z-index: 1000;
    translate: .3em;
    color: rgb(136, 201, 255);
    background-color: rgb(37, 43, 48);
    width: max-content;
    border-radius: 0 0 1em 1em;
}
.search-items {
    margin-bottom: 0px;
}
.search-items:hover {
    cursor: pointer;
    color: rgb(64, 165, 97);
}
</style>