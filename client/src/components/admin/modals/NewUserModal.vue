<script setup>
import axios from 'axios';
import { ref } from 'vue'

const emit = defineEmits(['new-user-error-message'])
const form = ref({
    firstName: null,
    lastName: null,
    email: null,
    password: null
})
const props = defineProps({
    token: String
})
const createUser = () => {
    axios.put('/api/create/user', {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        password: form.value.password,
    },{
        headers: {
            Authorization: `Bearer ${props.token}`
        }
    }).then((res) => {
        console.info(res.data.message)
    }).catch((err) => {
        emit('new-user-error-message', {
            message: err.response.data.error,
            cause: err.response.data.cause
        })
    })
}

</script>

<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">New User Form</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="createUser()">
                    <div class="modal-body">
                        <label class="form-label" for="firstName">First Name</label>
                        <input class="form-control" type="text" v-model="form.firstName">

                        <label class="form-label" for="lastName">Last Name</label>
                        <input class="form-control" type="text" v-model="form.lastName">

                        <label class="form-label" for="lastName">Email</label>
                        <input type="email" class="form-control" v-model="form.email">

                        <label for="password" class="form-label">Password</label>
                        <input type="password" name="password" id="password" class="form-control"
                            v-model="form.password">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success">Create User</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>