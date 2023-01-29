<script setup>
const props = defineProps({
    errorMessage: String,
    errorCause: String
})

</script>

<template>
    <div class="alert alert-danger d-flex align-items-center m-auto" role="alert">
        <i class="bi bi-exclamation-triangle-fill"></i>
        <div>
           ERROR: {{ errorMessage }}, CAUSE: {{ errorCause }}
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
</template>


<style scoped>
div {
    width: fit-content;
}
</style>