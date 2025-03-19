<script setup>
import { ref } from 'vue';
import apiClient from '@/api/axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = ref(false);
const router = useRouter();

const login = async () => {
  try {
    loading.value = true;
    const formData = new URLSearchParams();
    formData.append('username', username.value);
    formData.append('password', password.value);

    const response = await apiClient.post('/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const token = response.data.access_token;
    localStorage.setItem('token', token); // Save token for future requests
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set token for future requests

    await router.push('/');
  } catch (error) {
    errorMessage.value = 'Login failed! Check credentials.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-800">Welcome Back</h2>
      <p class="text-center text-gray-500 mt-1">Login to continue</p>

      <form @submit.prevent="login" class="mt-6">
        <div class="mb-4">
          <label class="block text-gray-700">Username or Email</label>
          <input
              v-model="username"
              type="text"
              required
              class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username or email"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700">Password</label>
          <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
          />
        </div>

        <p v-if="errorMessage" class="text-red-500 text-sm text-center mb-4">
          {{ errorMessage }}
        </p>

        <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex justify-center items-center"
        >
          <svg
              v-if="loading"
              class="w-5 h-5 mr-2 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 12a8 8 0 018-8m0 0a8 8 0 018 8m-8-8v8"
            ></path>
          </svg>
          <span>{{ loading ? "Logging in..." : "Login" }}</span>
        </button>
      </form>

      <p class="text-center text-gray-600 mt-4">
        Don't have an account?
        <router-link to="/register" class="text-blue-600 hover:underline">Sign up here</router-link>
      </p>
    </div>
  </div>
</template>
