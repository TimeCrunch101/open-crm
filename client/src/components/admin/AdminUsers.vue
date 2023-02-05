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

const disableUser = (userID, fullName) => {
    const storeFullName = auth.getUser
    if (fullName !== storeFullName) {
        axios.patch(`/api/disable/user/${userID}`,{}, {
            headers: {
                Authorization: `Bearer ${auth.getToken}`
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
            message: "Error Disabling user",
            cause: "You can't disable yourself"
        })
    }
}

const enableUser = (userID, fullName) => {
    axios.patch(`/api/enable/user/${userID}`,{},{
        headers: {
            Authorization: `Bearer ${auth.getToken}`
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
                    <th scope="col">Status</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">email</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users">
                    <td><i class="bi " :class="[{disabled: user.enabled===0},{'bi-x-circle-fill': user.enabled===0}, 'enabled','bi-check-circle-fill']"></i></td>
                    <td>{{ user.fullName }}</td>
                    <td>{{ user.email }}</td>
                    <td class="actions-cell">
                        <i @click="deleteUser(user.userID, user.fullName)" class="bi bi-trash3-fill"></i>
                        <p v-if="user.enabled===1" @click="disableUser(user.userID, user.fullName)" style="margin: 0px;color:red;">Disable</p>
                        <p v-else @click="enableUser(user.userID, user.fullName)" style="margin: 0px;color:green;">Enable</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
<!-- bi-x-circle-fill -->
<!-- bi-check-circle-fill -->
</template>

<style scoped>
.bi-trash3-fill:hover {
    cursor: pointer;
}
.enabled {
    color: rgb(64, 255, 47);
}
.disabled {
    color: rgb(224, 0, 0); 
}
.actions-cell {
    display: flex;
    gap: 4px;
}
.actions-cell > p {
    color: red;
}
.actions-cell>p:hover {
    cursor: pointer;
}
</style>