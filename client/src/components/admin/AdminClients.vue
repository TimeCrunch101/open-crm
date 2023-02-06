<script setup>
import { useAuthStore } from '../../stores/auth';
import { ref, reactive, computed } from 'vue';
import { useClientStore } from '../../stores/clients';
import axios from 'axios'
import Error from '../alerts/Error.vue';
import Success from '../alerts/Success.vue';

const auth = useAuthStore()
const clientStore = useClientStore()
const token = ref(auth.getToken)
const activeIndex = ref(0)
const success = ref({message: null})
const error = ref({
    message: null,
    cause: null
})
const item = reactive({
    first: 0,
    last: clientStore.getPageListLength,
    pages: clientStore.getPageCount
})
const clients = computed(() => {return clientStore.getClients.slice(item.first, item.last)})
const clientPages = computed(() => {return item.pages})
const updateMaxList = (selectObject) => {
    clientStore.setPageListLength(selectObject.target.value)
    item.pages = clientStore.getPageCount
    item.last = selectObject.target.value
}
const handelClick = (index) => {
    activeIndex.value = index-1
    if (index === clientStore.getPageCount) {
        item.first = ((clientStore.getPageListLength*index)-clientStore.getPageListLength)
        item.last = clientStore.getLength
    } else if (index === 1) {
        item.first = 0
        item.last = clientStore.getPageListLength
    } else {
        item.last = clientStore.getPageListLength*index
        item.first = item.last-clientStore.getPageListLength
    }
}
const deleteClient = (clientID) => {
    axios.delete(`/api/delete/client/${clientID}`,{
        headers: {
            Authorization: `Bearer ${token.value}`
        }
    }).then((res) => {
        success.value.message = res.data.message
        console.info(res.data.message)
    }).catch((err) => {
        error.value.message = err.response.data.error
        error.value.cause = err.response.data.cause
        console.error(err.response.data.error)
    })
}
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

</script>
<template>
    <Success v-if="success.message" :message="success.message"/>
    <Error v-if="error.message" :errorMessage="error.message" :errorCause="error.cause"/>
    <div class="container mt-5">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Client</th>
                    <th scope="col">Address</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="client in clients">
                    <td>{{ client.companyName }}</td>
                    <td>
                        {{ client.street }}
                        {{ client.city }},
                        {{ client.state }},
                        {{ client.zip }},
                        {{ client.country }}
                    </td>
                    <td>{{ client.primaryPhone }}</td>
                    <td><i @click="deleteClient(client.clientID)" class="bi bi-trash3-fill"></i></td>
                </tr>
            </tbody>
        </table>
        <nav aria-label="Client List Navigation">
            <ul class="pagination justify-content-center">
                <li v-if="clientStore.getLength >= clientStore.getPageListLength" v-for="(item, index) in clientPages" class="page-item">
                    <span @click="handelClick(index+1)" class="page-link"  :class="{active: index===activeIndex}">
                        <p v-if="index===0">&laquo;</p>
                        <p v-else-if="index===clientStore.getPageCount-1">&raquo;</p>
                        <p v-else>{{ index }}</p>
                    </span>
                </li>
                <select @change="updateMaxList($event)" class="form-select">
                    <option value="25" :selected="clientStore.getPageListLength==='25'">25</option>
                    <option value="50" :selected="clientStore.getPageListLength==='50'">50</option>
                    <option value="100" :selected="clientStore.getPageListLength==='100'">100</option>
                    <option value="200" :selected="clientStore.getPageListLength==='200'">200</option>
                </select>
            </ul>
        </nav>
    </div>   
</template>

<style scoped>
p {
    margin-bottom: 0;
}
.page-link:hover {
    cursor: pointer;
}
.form-select {
    margin-left: 1em;
    max-width: fit-content;
}
.bi-trash3-fill:hover {
    cursor: pointer;
}
</style>