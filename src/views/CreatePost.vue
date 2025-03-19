<script setup>
import { ref } from 'vue';
import apiClient from '@/api/axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const title = ref('');
const content = ref('');
const category = ref('general');
const errorMessage = ref('');
const successMessage = ref('');
const loading = ref(false);

const createPost = async () => {
  try {
    loading.value = true;
    errorMessage.value = '';
    successMessage.value = '';

    const response = await apiClient.post('/v1/posts/', {
      title: title.value,
      content: content.value,
      category: category.value,
    });

    successMessage.value = '🎉 Post created successfully!';
    setTimeout(() => router.push('/'), 1500);
  } catch (error) {
    console.error("❌ Error response:", error.response);
    errorMessage.value = error.response?.data?.detail?.[0]?.msg || '⚠️ Failed to create post!';
  } finally {
    loading.value = false;
  }
};

</script>

<template>
  <div class="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
    <h2 class="text-2xl font-semibold text-center text-gray-800">Create Post</h2>

    <div class="mt-4">
      <input
          v-model="title"
          type="text"
          placeholder="Title"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="mt-4">
      <textarea
          v-model="content"
          placeholder="Write your post here..."
          rows="5"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
    </div>

    <!-- ✅ New Category Selection -->
    <div class="mt-4">
      <select
          v-model="category"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="general">General</option>
        <option value="tech">Tech</option>
        <option value="lifestyle">Lifestyle</option>
      </select>
    </div>

    <button
        @click="createPost"
        :disabled="loading"
        class="w-full mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
    >
      {{ loading ? 'Submitting...' : 'Submit' }}
    </button>

    <p v-if="errorMessage" class="mt-4 text-sm text-red-600">{{ errorMessage }}</p>
    <p v-if="successMessage" class="mt-4 text-sm text-green-600">{{ successMessage }}</p>
  </div>
</template>
