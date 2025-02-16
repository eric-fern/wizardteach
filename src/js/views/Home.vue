<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Generate Lesson Plans and Teaching Materials with AI
        </h1>
        <p class="text-lg text-gray-600">
          Create professional teaching materials in minutes
        </p>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="mb-6">
          <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
            What subject would you like to teach?
          </label>
          <input
            id="subject"
            v-model="subject"
            type="text"
            placeholder="e.g., Mathematics, History, Science"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            @keyup.enter="startWizard"
          />
        </div>

        <button
          @click="startWizard"
          class="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
          :disabled="!subject.trim()"
        >
          Create Curriculum
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const subject = ref('');

const startWizard = () => {
  if (!subject.value.trim()) return;
  router.push({
    path: '/create',
    query: { subject: subject.value.trim() }
  });
};
</script> 