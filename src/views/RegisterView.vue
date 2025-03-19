<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const username = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const register = async () => {
  errorMessage.value = '';
  try {
    const response = await axios.post('http://localhost:8000/api/auth/register', {
      username: username.value,
      email: email.value,
      password: password.value,
    });

      await router.push('/');

  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Registration failed!';
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
      <p class="text-center text-gray-500 mt-1">Sign up to continue</p>

      <form @submit.prevent="register" class="mt-6">
        <div class="mb-4">
          <label class="block text-gray-700">Username</label>
          <input
              v-model="username"
              type="text"
              required
              class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700">Email</label>
          <input
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700">Password</label>
          <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Create a password"
          />
        </div>

        <p v-if="errorMessage" class="text-red-500 text-sm text-center mb-4">
          {{ errorMessage }}
        </p>

        <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Register
        </button>
      </form>

      <p class="text-center text-gray-600 mt-4">
        Already have an account?
        <router-link to="/login" class="text-blue-600 hover:underline">Login here</router-link>
      </p>
    </div>
  </div>
</template>
