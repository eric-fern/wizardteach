<template>
  <div class="min-h-screen flex items-center justify-center p-4" style="background-color: var(--bg-secondary);">
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-4" style="color: var(--text-primary);">
          Generate Lesson Plans and Teaching Materials with AI
        </h1>
        <p class="text-lg" style="color: var(--text-secondary);">
          Create professional teaching materials in minutes
        </p>
      </div>

      <div class="rounded-lg shadow-md p-6" style="background-color: var(--bg-primary);">
        <div class="mb-6">
          <label for="subject" class="block text-sm font-medium mb-2" style="color: var(--text-primary);">
            What subject would you like to teach?
          </label>
          <input
            id="subject"
            v-model="subject"
            type="text"
            placeholder="e.g., Mathematics, History, Science"
            class="w-full p-3 rounded-lg transition-colors duration-200"
            :style="{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)',
              border: '1px solid var(--border-color)'
            }"
            @keyup.enter="startWizard"
          />
        </div>

        <button
          @click="startWizard"
          class="w-full py-3 rounded-lg font-medium transition-colors duration-200"
          :style="{
            backgroundColor: isValid ? 'var(--primary-500)' : 'var(--bg-secondary)',
            color: isValid ? '#ffffff' : 'var(--text-secondary)',
            cursor: isValid ? 'pointer' : 'not-allowed'
          }"
          :disabled="!isValid"
        >
          Create Curriculum
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../../stores/store';

const router = useRouter();
const store = useStore();
const subject = ref('');

const isValid = computed(() => {
  return subject.value.trim() !== '';
});

const startWizard = () => {
  if (!isValid.value) return;
  store.updateFormData('subject', subject.value.trim());
  router.push('/onboard/course-details');
};
</script>

<style scoped>
/* Theme-specific transitions */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style> 