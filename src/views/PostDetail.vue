<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiClient from '@/api/axios';

const route = useRoute();
const router = useRouter();

const post = ref(null);
const isEditing = ref(false);
const updatedTitle = ref('');
const updatedContent = ref('');
const loading = ref(true);
const error = ref(null);

const fetchPost = async () => {
  try {
    const response = await apiClient.get(`/v1/posts/${route.params.postId}`);
    post.value = response.data;
    updatedTitle.value = post.value.title;
    updatedContent.value = post.value.content;
  } catch (err) {
    console.error('Error fetching post:', err);
    error.value = 'Failed to load post.';
  } finally {
    loading.value = false;
  }
};

const updatePost = async () => {
  try {
    await apiClient.put(`v1/posts/${post.value.id}`, {
      title: updatedTitle.value,
      content: updatedContent.value
    }, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    });

    isEditing.value = false;
    fetchPost();
  } catch (err) {
    console.error('Error updating post:', err);
    error.value = 'Failed to update post.';
  }
};

const deletePost = async () => {
  try {
    await apiClient.delete(`v1/posts/${post.value.id}`, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    });

    router.push('/posts');
  } catch (err) {
    console.error('Error deleting post:', err);
    error.value = 'Failed to delete post.';
  }
};

onMounted(fetchPost);
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
    <div v-if="loading" class="text-center text-gray-600">Loading post...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

    <div v-else>
      <h1 class="text-3xl font-bold text-gray-800">{{ post.title }}</h1>
      <p class="text-gray-600 mt-2">{{ post.content }}</p>

      <div class="mt-4 flex space-x-4">
        <button @click="isEditing = true" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Edit
        </button>
        <button @click="deletePost" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Delete
        </button>
      </div>

      <div v-if="isEditing" class="mt-6 p-4 border rounded-lg bg-gray-100">
        <h2 class="text-xl font-semibold text-gray-700">Edit Post</h2>
        <input v-model="updatedTitle" type="text" class="w-full p-2 border rounded mt-2" placeholder="Title"/>
        <textarea v-model="updatedContent" class="w-full p-2 border rounded mt-2" rows="4"
                  placeholder="Content"></textarea>

        <div class="mt-4 flex space-x-4">
          <button @click="updatePost" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Save
          </button>
          <button @click="isEditing = false" class="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
