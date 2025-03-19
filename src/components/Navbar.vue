<script setup>
import {computed, watchEffect} from 'vue';
import {useRouter} from 'vue-router';

const isAuthenticated = computed(() => !!localStorage.getItem('token'));

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};

watchEffect(() => {
});
</script>

<template>
  <nav class="navbar">
    <div class="logo">
      <router-link to="/">MyBlog</router-link>
    </div>
    <ul class="nav-links">


      <li v-if="isAuthenticated">
        <router-link to="/create-post">Create Post</router-link>
      </li>
      <li v-if="!isAuthenticated">
        <router-link to="/login">Login</router-link>
      </li>
      <li v-if="!isAuthenticated">
        <router-link to="/register">Register</router-link>
      </li>
      <li v-if="isAuthenticated">
        <button @click="logout">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 1rem 2rem;
  color: white;
}

.logo a {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1rem;
}

.nav-links a, .nav-links button {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  background: none;
  border: none;
  cursor: pointer;
}

.nav-links button:hover {
  text-decoration: underline;
}
</style>
