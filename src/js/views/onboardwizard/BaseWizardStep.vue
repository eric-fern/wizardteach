<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-3xl mx-auto">
      <!-- Selection Tags -->
      <BlueDottedOvalShowsCompletedFormFields />

      <!-- Main Form Content -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <!-- Header Section -->
        <div v-if="$slots.title || $slots.subtitle || title || subtitle" class="text-center animate-fade-in mb-8">
          <h3 
            class="heading-2 animate-slide-up" 
            :style="{ animationDelay: '100ms' }"
          >
            <slot name="title">{{ title }}</slot>
          </h3>
          <p 
            v-if="$slots.subtitle || subtitle"
            class="mt-3 text-lg text-gray-600 max-w-2xl mx-auto animate-slide-up" 
            :style="{ animationDelay: '200ms' }"
          >
            <slot name="subtitle">{{ subtitle }}</slot>
          </p>
        </div>

        <!-- Main Content -->
        <div 
          class="animate-fade-in space-y-6"
          :style="{ animationDelay: '300ms' }"
        >
          <slot></slot>
        </div>

        <!-- Footer/Actions -->
        <div 
          v-if="$slots.actions"
          class="mt-8 animate-fade-in"
          :style="{ animationDelay: '400ms' }"
        >
          <slot name="actions"></slot>
        </div>

        <!-- Info Section -->
        <div 
          v-if="$slots.info"
          class="mt-12 bg-gradient-subtle rounded-2xl p-8 animate-fade-in"
          :style="{ animationDelay: '500ms' }"
        >
          <slot name="info"></slot>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex justify-between mt-6">
        <button 
          v-if="store.currentStep > 0"
          @click="store.prevStep()"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Previous
        </button>
        <div class="flex-1"></div>
        <button 
          v-if="store.currentStep < store.steps.length - 1"
          @click="$emit('next')"
          :disabled="!isValid"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-lg',
            isValid 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '../../stores/store';
import BlueDottedOvalShowsCompletedFormFields from '../../components/shared/BlueDottedOvalShowsCompletedFormFields.vue';

const store = useStore();
const emit = defineEmits(['next']);

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  formData: {
    type: Object,
    default: () => ({})
  },
  isValid: {
    type: Boolean,
    default: false
  },
  hidePrevious: {
    type: Boolean,
    default: false
  }
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.animate-fade-in {
  animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style> 