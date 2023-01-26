<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useAuthStore } from "../stores/auth"
import { useRouter } from 'vue-router';
import Error from "../components/alerts/Error.vue"
const router = useRouter()

const auth = useAuthStore()
const form = ref({})
const error = ref({})

const login = () => {
    axios.post('/api/login', {
        username: form.value.username,
        password: form.value.password
    }).then(async(res) => {
        await auth.setUserInfo(res.data.fullName, res.data.token)
        router.push('/')
    }).catch((err) => {
        error.value.message = err.response.data.message
        error.value.cause = err.response.data.cause
    })
}

</script>

<template>
    <Error v-if="error.message" :errorMessage="error.message" />
    <form @submit.prevent="login()">
        <div class="container mt-5">
            <h3 class="text-center">LOGIN</h3>
            <div class="form-floating mb-2">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
                    v-model="form.username">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                    v-model="form.password">
                <label for="floatingPassword">Password</label>
            </div>
            <button class="btn btn-outline-success mt-3" type="submit">Submit</button>
        </div>
    </form>
</template>

<style scoped>
.container {
    border: 5px solid rgb(91, 12, 238);
    border-radius: 1em;
    padding: 3em;
    width: 400px;
}

.alert {
    margin: auto;
    max-width: 400px;
}
</style>