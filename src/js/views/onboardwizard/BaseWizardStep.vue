/**
 * BaseWizardStep
 * 
 * A reusable component that provides consistent navigation and layout for wizard steps.
 * Handles both next/previous navigation automatically while allowing step-specific logic
 * through event emissions.
 * 
 * Navigation Features:
 * - Previous step navigation is centralized here to ensure consistency
 * - Each step can be hidden/shown based on the hidePrevious prop
 * - Navigation emits events to allow parent components to perform cleanup
 * - Automatically syncs with router and store state
 */
<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-3xl mx-auto">
      <!-- Progress Indicator -->
      <BlueDottedOvalShowsCompletedFormFields />

      <!-- Main Form Content -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <!-- Dynamic Header with Animation -->
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

        <!-- Slot for Step-Specific Content -->
        <div 
          class="animate-fade-in space-y-6"
          :style="{ animationDelay: '300ms' }"
        >
          <slot></slot>
        </div>

        <!-- Optional Action Slots -->
        <div 
          v-if="$slots.actions"
          class="mt-8 animate-fade-in"
          :style="{ animationDelay: '400ms' }"
        >
          <slot name="actions"></slot>
        </div>

        <!-- Optional Info Section -->
        <div 
          v-if="$slots.info"
          class="mt-12 bg-gradient-subtle rounded-2xl p-8 animate-fade-in"
          :style="{ animationDelay: '500ms' }"
        >
          <slot name="info"></slot>
        </div>
      </div>

      <!-- Wizard Navigation -->
      <div class="flex justify-between mt-6">
        <!-- Previous Step Button -->
        <button 
          v-if="store.currentStep > 0 && !hidePrevious"
          @click="handlePrev"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Previous
        </button>
        <div class="flex-1"></div>
        <!-- Next Step Button -->
        <button 
          v-if="store.currentStep < store.steps.length - 1"
          @click="handleNext"
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
import { useRouter } from 'vue-router';
import BlueDottedOvalShowsCompletedFormFields from '../../components/shared/BlueDottedOvalShowsCompletedFormFields.vue';

const store = useStore();
const router = useRouter();
// Allow parent components to handle navigation events if needed
const emit = defineEmits(['next', 'prev']);

// Component props with defaults
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

/**
 * Handles navigation to the next step
 * 1. Emits 'next' event for parent components
 * 2. Routes to the appropriate next step based on current step
 */
const handleNext = () => {
  // First emit the event to allow parent components to handle any specific logic
  emit('next');
  
  // Then handle the navigation based on current step
  if (store.currentStep < store.steps.length - 1) {
    const nextStep = store.currentStep + 1;
    switch(nextStep) {
      case 1:
        router.push('/onboard/course-details');
        break;
      case 2:
        router.push('/onboard/standards');
        break;
      case 3:
        router.push('/create');
        break;
    }
  }
};

/**
 * Handles navigation to the previous step
 * 1. Emits 'prev' event for parent components to handle cleanup
 * 2. Routes to the appropriate previous step based on current step
 * 3. Updates store.currentStep through router navigation guard
 * 
 * Navigation Path:
 * Create -> Standards -> Course Details -> Entry
 */
const handlePrev = () => {
  // First emit the event to allow parent components to handle any specific logic
  emit('prev');
  
  // Then handle the navigation based on current step
  if (store.currentStep > 0) {
    const prevStep = store.currentStep - 1;
    switch(prevStep) {
      case 0:
        router.push('/');
        break;
      case 1:
        router.push('/onboard/course-details');
        break;
      case 2:
        router.push('/onboard/standards');
        break;
    }
  }
};

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