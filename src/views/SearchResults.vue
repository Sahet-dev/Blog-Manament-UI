<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import apiClient from "@/api/axios.js";

const route = useRoute();
const searchQuery = route.query.query;
const searchResults = ref([]);

// Fetch search results based on query
const fetchSearchResults = async () => {
  if (searchQuery) {
    try {
      const response = await apiClient.post('/v1/posts/search', {
        keyword: searchQuery,
        skip: 0, // Optional pagination, can be adjusted
        limit: 10 // Number of results to return
      });
      searchResults.value = response.data; // Assuming the response data is an array
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }
};

// Fetch results when component is mounted
onMounted(() => {
  fetchSearchResults();
});
</script>

<template>
  <div class="max-w-6xl mx-auto py-8 px-6">
    <h1 class="text-3xl font-bold mb-6">Search Results for: "{{ searchQuery }}"</h1>

    <div v-if="searchResults.length === 0" class="text-center text-gray-500">
      <p>No results found for your search.</p>
    </div>

    <div v-else>
      <div v-for="post in searchResults" :key="post.id" class="bg-white shadow-md rounded-lg mb-4 p-6">
        <h2 class="text-xl font-semibold text-gray-800">
          <router-link :to="`/post/${post.id}`" class="hover:text-blue-500">{{ post.title }}</router-link>
        </h2>
        <p class="text-gray-600 mt-2">{{ post.content.slice(0, 100) }}...</p>
        <div class="mt-4 flex justify-between items-center">
          <span class="text-sm text-gray-500">{{ post.category }}</span>
          <span class="text-sm text-gray-400">{{ new Date(post.created_at).toLocaleDateString() }}</span>
        </div>
        <div class="mt-2">
          <span class="text-sm text-gray-500">By: {{ post.author_username }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* You can add custom styles here if needed */
</style>
