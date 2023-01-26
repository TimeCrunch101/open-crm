<script setup>
const props = defineProps({
    errorMessage: String
})

</script>

<template>
    <div class="alert alert-danger d-flex align-items-center mt-3" role="alert">
        <i class="bi bi-exclamation-triangle-fill"></i>
        <div>
            {{ errorMessage }}
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
</template>


<style scoped>
div {
    width: max-content;
    margin: auto;
}
</style>