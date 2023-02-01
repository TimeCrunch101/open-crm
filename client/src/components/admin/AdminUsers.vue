<script setup>
import axios from 'axios'
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';

const auth = useAuthStore()
const props = defineProps({ token: String })
const users = ref([])
const emit = defineEmits(["error-message", "success-message"])

const deleteUser = (userID, fullName) => {
    const storeFullName = auth.getUser
    if (fullName !== storeFullName) {
        axios.delete(`/api/delete/user/${userID}`, {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        }).then((res) => {
            emit('success-message', {
                message: res.data.message
            })
        }).catch((err) => {
            emit("error-message", {
                message: err.response.data.error,
                cause: err.response.data.cause
            })
        })
    } else {
        emit('error-message', {
            message: 'Could not delete user',
            cause: "You can't delete yourself"
        })
    }
}

axios.get("/api/get/users", {
    headers: {
        Authorization: `Bearer ${props.token}`
    }
}).then((res) => {
    users.value = res.data.usersArray
}).catch((err) => {
    emit("error-message", {
        message: err.response.data.error,
        cause: err.response.data.cause
    })
})
</script>

<template>
    <div class="container mt-2">
        <table class="table table-dark table-striped">
            <thead>
                <tr>
                    <th scope="col">Full Name</th>
                    <th scope="col">email</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users">
                    <td scope="row">{{ user.fullName }}</td>
                    <td>{{ user.email }}</td>
                    <td><i @click="deleteUser(user.userID, user.fullName)" class="bi bi-trash3-fill"></i></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.bi-trash3-fill:hover {
    cursor: pointer;
}
</style>