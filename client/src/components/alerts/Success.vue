<script setup>
const props = defineProps({
  message: String
})

</script>

<template>
<div class="alert alert-info m-auto" role="alert">
  {{ message }}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
</template>

<style scoped>
.alert-info {
  width: fit-content;
}

</style>