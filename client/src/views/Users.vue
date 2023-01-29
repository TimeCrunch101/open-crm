<script setup>
import axios from 'axios'
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import Error from "../components/alerts/Error.vue"

const auth = useAuthStore()
const users = ref([])
const error = ref({})
const token = ref(auth.getToken)

axios.get("/api/get/users", {
    headers: {
        Authorization: `Bearer ${token.value}`
    }
}).then((res) => {
    users.value = res.data.usersArray
}).catch((err) => {
    error.value = err.response.data
})
</script>

<template>
    <Error v-if="error.message" :errorMessage="error.message" />
    <h1>Users</h1>
    <div class="container">
        <table class="table table-dark table-striped">
            <thead>
                <tr>
                    <th scope="col">Full Name</th>
                    <th scope="col">email</th>
                    <th scope="col">uuid</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users">
                    <td scope="row">{{ user.fullName }}</td>
                    <td>{{ user.email }}</td>
                    <th>{{ user.userID }}</th>
                </tr>
            </tbody>
        </table>
    </div>
</template>