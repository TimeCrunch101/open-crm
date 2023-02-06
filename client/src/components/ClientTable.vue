<script setup>
import { ref, reactive, computed } from "vue";
import { useClientStore } from "../stores/clients";

const clientStore = useClientStore()
const activeIndex = ref(0)
const item = reactive({
    first: 0,
    last: clientStore.getPageListLength,
    pages: clientStore.getPageCount
})
const clients = computed(() => {
    return clientStore.getClients.slice(item.first, item.last)
})
const clientPages = computed(() => {
    return item.pages
})
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

</script>

<template>
    <div class="container mt-5">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Client</th>
                    <th scope="col">Address</th>
                    <th scope="col">Phone Number</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in clients">
                    <td><router-link :to="'/client/' + item.clientID">{{ item.companyName }}</router-link></td>
                    <td>
                        {{ item.street }}
                        {{ item.city }},
                        {{ item.state }},
                        {{ item.zip }},
                        {{ item.country }}
                    </td>
                    <td>{{ item.primaryPhone }}</td>
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
</style>