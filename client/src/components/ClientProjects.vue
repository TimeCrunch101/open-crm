<script setup>
import axios from 'axios'
import { ref } from 'vue'

const projects = ref([])
const props = defineProps({
    token: String,
    clientID: String
})

axios.get(`/api/get/client/projects/${props.clientID}`, {
    headers: {
        Authorization: `Bearer ${props.token}`
    }
}).then((res) => {
    projects.value = res.data.projects
}).catch((err) => {
    console.log(err.response.data) // TODO: handle error
})

</script>

<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Project Number</th>
                <th scope="col">Title</th>
                <th scope="col">Created</th>
                <th scope="col">Due</th>
                <th scope="col">Projected Hours</th>
                <th scope="col">Hours Worked</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="project in projects">
                <th>{{ project.projectNumber }}</th>
                <th>{{ project.title }}</th>
                <td>{{ project.created }}</td>
                <td>{{ project.due }}</td>
                <td>{{ project.projectedHours }}</td>
                <td>{{ project.hoursWorked }}</td>
            </tr>
        </tbody>
    </table>
</template>
