<script setup>
import axios from "axios";
import { ref } from "vue";

const props = defineProps({
    clientID: String,
    token: String
})
const emit = defineEmits(["emit-error", "success-message"])
const form = ref({
    firstName: null,
    lastName: null,
    email: null,
    primaryPhone: null,
    cellPhone: null,
})
const createContact = () => {
    axios.put(`/api/create/client/contact/${props.clientID}`,{
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        primaryPhone: form.value.primaryPhone,
        cellPhone: form.value.cellPhone
    },{
        headers: {
            Authorization: `Bearer ${props.token}`
        }
    }).then((res) => {
        emit("success-message", {res})
    }).catch((err) => {
        emit("emit-error", {err})
    })
}

</script>
<template>
<div class="modal fade" id="createClientModal" tabindex="-1" aria-labelledby="createClientModal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="createClientModal">New Contact</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="createContact()">
      <div class="modal-body">
            <label class="form-label" for="firstName">First Name</label>
            <input class="form-control" type="text" name="firstName" id="firstName" v-model="form.firstName">

            <label class="form-label" for="lastName">Last Name</label>
            <input class="form-control" type="text" name="lastName" id="lastName" v-model="form.lastName">

            <label class="form-label" for="email">Email</label>
            <input class="form-control" type="email" name="email" id="email" v-model="form.email">

            <label class="form-label" for="primaryPhone">Primary Phone (123-456-7899)</label>
            <input class="form-control" type="tel" name="primaryPhone" id="primaryPhone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" v-model="form.primaryPhone">

            <label class="form-label" for="cellPhone">Cell Phone (123-456-7899)</label>
            <input class="form-control" type="tel" name="cellPhone" id="cellPhone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" v-model="form.cellPhone">

        </div>
        <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Add</button>
        </div>
    </form>
    </div>
</div>
</div>
</template>
<style scoped>
</style>