<template>
  <BaseWizardStep :isValid="isValid">
    <div class="text-center mb-8">
      <h2 class="text-xl font-bold text-gray-900 mb-4">What subject would you like to teach?</h2>
      <p class="text-gray-600">
        This will help us create customized teaching materials for your class
      </p>
    </div>

    <div class="max-w-md mx-auto">
      <div class="mb-6">
        <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
          Subject
        </label>
        <input
          id="subject"
          :value="store.formData.subject"
          @input="store.updateFormData('subject', $event.target.value)"
          type="text"
          placeholder="e.g., Mathematics, History, Science"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  </BaseWizardStep>
</template>

<script setup>
import { computed } from 'vue';
import BaseWizardStep from './BaseWizardStep.vue';
import { useStore } from '../../stores/store';

const store = useStore();

const isValid = computed(() => {
  return store.formData.subject.trim() !== '';
});
</script> 