<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logoutUser()
  router.push('/login')
}

</script>

<template>
  <nav v-if="auth.isAuthenticated" class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="#">Navbar</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/clients">Clients</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/users">Users</router-link>
          </li>
          <li class="nav-item dropdown">
            <router-link class="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Create
            </router-link>
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" to="/create/client">New Client</router-link></li>
              <li><router-link class="dropdown-item" to="#">New User</router-link></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><router-link class="dropdown-item" to="#">Something else here</router-link></li>
            </ul>
          </li>
          <li class="nav-item">
            <button @click="logout()" class="btn btn-primary" type="button">Logout</button>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>