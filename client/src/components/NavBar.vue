<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const auth = useAuthStore();
const router = useRouter();
const initials = ref(null);

if (auth.getUser) {
  const nameArray = auth.getUser.split(" ", [2]);
  const firstInitial = nameArray[0].charAt(0);
  const lastInitial = nameArray[1].charAt(0);
  initials.value = firstInitial + lastInitial;
};

const logout = () => {
  auth.logoutUser();
  router.push('/login');
};
</script>

<template>
  <nav v-if="auth.isAuthenticated" class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="#">OpenCRM</router-link>
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
          <li class="nav-item dropdown">
            <router-link class="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">Create</router-link>
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" to="/create/client">New Client</router-link></li>
              <li><router-link class="dropdown-item" to="#">New User</router-link></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><router-link class="dropdown-item" to="#">Something else here</router-link></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        <div class="btn-group dropstart">
          <div class="profile-picture" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="0,0">
            <span class="profile-initials">{{ initials }}</span>
          </div>
          <ul class="dropdown-menu dropdown-menu-start">
            <li><a class="dropdown-item" href="#">Account Settings</a></li>
            <li><router-link class="dropdown-item" to="/admin">CRM Admin</router-link></li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li class="dropdown-item">
              <router-link @click="logout()" class="nav-link" aria-current="page" to="/login">Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.profile-picture {
  margin-left: 1em;
  outline: 1px solid rgb(0, 0, 0);
  border-radius: 50%;
  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgb(3, 31, 48);
}

.profile-picture:hover {
  cursor: pointer;
}

.profile-initials {
  font-size: 1.2rem;
  vertical-align: center;
  margin-bottom: 4px;
}

.dropstart .dropdown-menu {
  top: 57px;
  right: 0px
}
</style>