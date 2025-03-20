<script setup>
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from "@/api/axios.js";

const router = useRouter();

const searchQuery = ref('');
const isAuthenticated = computed(() => !!localStorage.getItem('token'));

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};

const handleSearch = async () => {
  if (searchQuery.value.trim()) {
    try {
      const response = await apiClient.post('/v1/posts/search', {
        keyword: searchQuery.value,
        skip: 0, //  managing pagination
        limit: 10 // adjusting the number of results per page
      });

      // Redirect to the search results page with the search query as a query parameter
      router.push({ name: 'SearchResults', query: { query: searchQuery.value } });
    } catch (error) {
      console.error('Search error:', error);
    }
  }
};

watchEffect(() => {
  // Any additional effects can be watched here
});
</script>

<template>
  <nav class="bg-gray-900 text-white py-4 px-6 md:px-10 flex justify-between items-center shadow-md">
    <!-- Logo -->
    <div class="text-2xl font-semibold">
      <router-link to="/" class="text-white hover:text-gray-400 transition duration-300 ease-in-out">MyBlog</router-link>
    </div>

    <!-- Navigation Links -->
    <ul class="flex gap-6 items-center">
      <!-- Search Bar -->
      <li class="relative">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Search posts..."
            class="px-4 py-2 rounded-md border border-gray-600 bg-gray-800 text-white w-40 md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        />
        <button
            @click="handleSearch"
            class="absolute right-0 top-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300 ease-in-out"
        >
          Search
        </button>
      </li>

      <!-- Conditional Links -->
      <li v-if="isAuthenticated">
        <router-link to="/create-post" class="text-white hover:text-gray-400 transition duration-300 ease-in-out">Create Post</router-link>
      </li>
      <li v-if="!isAuthenticated">
        <router-link to="/login" class="text-white hover:text-gray-400 transition duration-300 ease-in-out">Login</router-link>
      </li>
      <li v-if="!isAuthenticated">
        <router-link to="/register" class="text-white hover:text-gray-400 transition duration-300 ease-in-out">Register</router-link>
      </li>
      <li v-if="isAuthenticated">
        <button @click="logout" class="text-white hover:text-gray-400 transition duration-300 ease-in-out">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
/* Add custom styles here if needed */
</style>
