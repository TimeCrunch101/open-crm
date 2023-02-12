<script setup>
import NewClientContactModal from './modals/NewClientContactModal.vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';
const auth = useAuthStore()
const route = useRoute()

</script>
<template>
<button type="button" class="btn btn-outline-success mt-3 mb-3" data-bs-toggle="modal" data-bs-target="#createClientModal">
  Create Contact
</button>
<NewClientContactModal :clientID="route.params.clientID" :token="auth.getToken"/>
</template>
<style scoped></style>