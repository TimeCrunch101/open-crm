<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
</script>

<template>
  <NavBar/>
  <div class="container mt-3">
    <RouterView />
  </div>
</template>

<style scoped>

</style>
