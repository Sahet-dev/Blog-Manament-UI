<template>
  <div class="max-w-4xl mx-auto py-10">
    <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Latest Posts</h2>

    <!-- Filter Form -->
    <form @submit.prevent="fetchPosts" class="mb-6">
      <div class="flex flex-wrap gap-4 mb-4">
        <!-- Author Username -->
        <div class="flex flex-col w-full sm:w-auto">
          <label for="author_username" class="text-sm font-semibold text-gray-700">Author Username</label>
          <input
              id="author_username"
              type="text"
              v-model="filters.author_username"
              placeholder="Author Username"
              class="border p-2 rounded w-full"
          />
        </div>

        <!-- Keyword -->
        <div class="flex flex-col w-full sm:w-auto">
          <label for="keyword" class="text-sm font-semibold text-gray-700">Search keyword</label>
          <input
              id="keyword"
              type="text"
              v-model="filters.keyword"
              placeholder="Search keyword"
              class="border p-2 rounded w-full"
          />
        </div>

        <!-- Category -->
        <div class="flex flex-col w-full sm:w-auto">
          <label for="category" class="text-sm font-semibold text-gray-700">Category</label>
          <select
              id="category"
              v-model="filters.category"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="general">General</option>
            <option value="tech">Tech</option>
            <option value="lifestyle">Lifestyle</option>
          </select>
        </div>

        <!-- Start Date -->
        <div class="flex flex-col w-full sm:w-auto">
          <label for="start_date" class="text-sm font-semibold text-gray-700">Start Date</label>
          <input
              id="start_date"
              type="date"
              v-model="filters.start_date"
              class="border p-2 rounded w-full"
              placeholder="Start date"
          />
        </div>

        <!-- End Date -->
        <div class="flex flex-col w-full sm:w-auto">
          <label for="end_date" class="text-sm font-semibold text-gray-700">End Date</label>
          <input
              id="end_date"
              type="date"
              v-model="filters.end_date"
              class="border p-2 rounded w-full"
              placeholder="End date"
          />
        </div>
      </div>

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Apply Filters
      </button>
    </form>

    <!-- Posts List -->
    <div v-if="posts.length" class="grid md:grid-cols-2 gap-6">
      <router-link
          v-for="post in posts"
          :key="post.id"
          :to="{ name: 'PostDetail', params: { postId: post.id } }"
          class="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
      >
        <div class="p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ post.title }}</h3>
          <p class="text-gray-600 text-sm mb-2">{{ post.category }}</p>
          <p class="text-gray-700 text-sm truncate">{{ post.content }}</p>
          <div class="mt-4 flex justify-between items-center text-sm text-gray-500">
            <span>By {{ post.author_username }}</span>
            <span>{{ formatDate(post.created_at) }}</span>
          </div>
        </div>
      </router-link>
    </div>
    <p v-else class="text-center text-gray-500">No posts available.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/api/axios';

// Store for posts
const posts = ref([]);

// Reactive filters with defaults
const filters = ref({
  skip: 0,
  limit: 10,
  category: '',
  keyword: '',
  author_username: '', // Matches backend query parameter
  start_date: '',
  end_date: ''
});

// Format date for display
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

// Fetch posts applying filters as query parameters
const fetchPosts = async () => {
  try {
    // Convert date filters to ISO format
    const params = {
      skip: filters.value.skip,
      limit: filters.value.limit
    };

    // Add filters only if they have values
    ['category', 'keyword', 'author_username', 'start_date', 'end_date'].forEach((key) => {
      if (filters.value[key]) {
        params[key] = key.includes('date') ? new Date(filters.value[key]).toISOString() : filters.value[key];
      }
    });

    const response = await apiClient.get('/v1/posts/', { params });
    posts.value = response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

// Fetch posts on component mount
onMounted(fetchPosts);
</script>

<style>
/* Custom styles if needed */
</style>
