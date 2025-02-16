<template>
  <BaseWizardStep>
    <div class="space-y-8">
      <div class="text-center">
        <h3 class="text-3xl font-extrabold text-gray-900">Ready to Generate Your Curriculum</h3>
        <p class="mt-3 text-lg text-gray-600">Click below to create your customized teaching materials</p>
      </div>

      <div class="flex justify-center mt-8">
        <button
          @click="handleGenerate"
          :disabled="isGenerating"
          :class="[
            'px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105',
            isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark',
            isSuccess ? 'bg-green-500' : '',
            'text-white shadow-lg'
          ]"
        >
          <span v-if="isGenerating">Generating...</span>
          <span v-else-if="isSuccess">Sent!</span>
          <span v-else>Generate Curriculum</span>
        </button>
      </div>
    </div>
  </BaseWizardStep>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from '@/stores/store';
import { apiService } from '../httpclient/apiService';
import BaseWizardStep from './BaseWizardStep.vue';

const store = useStore();
const isGenerating = ref(false);
const isSuccess = ref(false);
const error = ref(null);

const handleGenerate = async () => {
  if (isGenerating.value) return;
  
  isGenerating.value = true;
  error.value = null;
  
  try {
    const data = store.prepareCurriculumData();
    await apiService.generate(data);
    
    // Show success state for 3 seconds
    isSuccess.value = true;
    setTimeout(() => {
      isSuccess.value = false;
    }, 3000);
  } catch (err) {
    error.value = err.message;
    console.error('Generation failed:', err);
  } finally {
    isGenerating.value = false;
  }
};
</script> 