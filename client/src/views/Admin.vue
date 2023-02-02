<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import Error from "../components/alerts/Error.vue"
import AdminUsers from '../components/admin/AdminUsers.vue';
import NewUserModal from "../components/admin/modals/NewUserModal.vue"
import Success from '../components/alerts/Success.vue';
import AdminClients from '../components/admin/AdminClients.vue';
import NewClientModal from '../components/admin/modals/NewClientModal.vue';

const successMsg = ref()
const auth = useAuthStore()
const token = ref(auth.getToken)
const error = ref({
    message: null,
    cause: null
})

const setErrMsg = (errObj) => {
    error.value.message = errObj.message
    error.value.cause = errObj.cause
}
const setSucMsg = (successObj) => {
    successMsg.value = successObj.message
}

</script>

<template>
    <Success v-if="successMsg" :message="successMsg"/>
    <Error v-if="error.message" :errorMessage="error.message" :errorCause="error.cause" />
    <div class="container mt-3">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="users-tab" data-bs-toggle="tab" data-bs-target="#users-tab-pane" type="button" role="tab" aria-controls="users-tab-pane" aria-selected="true">Users</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="clients-tab" data-bs-toggle="tab" data-bs-target="#clients-tab-pane" type="button" role="tab" aria-controls="clients-tab-pane" aria-selected="true">Clients</button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="users-tab-pane" role="tabpanel" aria-labelledby="users-tab" tabindex="0">
                <button type="button" class="btn btn-outline-success mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Add User</button>
                <AdminUsers @success-message="setSucMsg" @error-message="setErrMsg" :token="token" />
            </div>
            <div class="tab-pane fade" id="clients-tab-pane" role="tabpanel" aria-labelledby="clients-tab" tabindex="1">
                <button type="button" class="btn btn-outline-success mt-3" data-bs-toggle="modal" data-bs-target="#newClientModal">Add Client</button>
                <AdminClients/>
            </div>
        </div>
    </div>
    <NewUserModal @new-user-error-message="setErrMsg" :token="token"/>
    <NewClientModal/>
</template>